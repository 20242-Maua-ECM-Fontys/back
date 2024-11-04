import { v4 as uuidv4 } from 'uuid'
import { ROLE } from '../../../shared/domain/enums/role_enum'
import { Possibility } from '../../../shared/domain/entities/possibility'
import { WEEK_DAY } from '../../../shared/domain/enums/week_day_enum'
import { IScheduleRepository } from '../../../shared/domain/repositories/schedule_repository_interface'
import { InvalidRole } from '../../../shared/helpers/errors/usecase_errors'
import { MAUA_START_TIME } from '../../../shared/domain/enums/maua_start_time_enum'
import { MAUA_END_TIME } from '../../../shared/domain/enums/maua_end_time_enum'

export type PossibilityParam = {
    startTime: MAUA_START_TIME
    endTime: MAUA_END_TIME
    weekDay: WEEK_DAY
}

export class CreatePossibilitiesUsecase {
    constructor(private repo: IScheduleRepository) {}
  
    async execute(userId: number, possibilities: PossibilityParam[]): Promise<boolean> {
      // check if user exists
      const user = await this.repo.getUser(userId)
  
      // check if user is a professor
      if (user.role !== ROLE.PROFESSOR && user.role !== ROLE.COORDINATOR) {
        throw new InvalidRole(`${ROLE.PROFESSOR} or ${ROLE.COORDINATOR}`, ROLE.STAFF)
      }
  
      // check possibilitiesParam
      const createdPossibility = possibilities.map(possibility => {
        return new Possibility({
          id: uuidv4(),
          userId: userId,
          startTime: possibility.startTime,
          endTime: possibility.endTime,
          isTaken: false,
          weekDay: possibility.weekDay,
        })
      })
      
      // delete all possibilities for user
      const possibilitiesForUser = await this.repo.getPossibilitiesByUserId(userId)
      for (const possibility of possibilitiesForUser) {
        await this.repo.deletePossibility(possibility.id)
      }
  
      // create new possibilities
      for (const possibility of createdPossibility) {
        await this.repo.CreatePossibility(possibility)
      }
  
      return true
  
    }
  }