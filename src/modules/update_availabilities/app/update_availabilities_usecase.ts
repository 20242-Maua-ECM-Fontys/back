import { v4 as uuidv4 } from 'uuid'
import { ROLE } from '../../../shared/domain/enums/role_enum'
import { Availability } from '../../../shared/domain/entities/availability'
import { WEEK_DAY } from '../../../shared/domain/enums/week_day_enum'
import { IScheduleRepository } from '../../../shared/domain/repositories/schedule_repository_interface'
import { InvalidRole } from '../../../shared/helpers/errors/usecase_errors'
import { MAUA_START_TIME } from '../../../shared/domain/enums/maua_start_time_enum'
import { MAUA_END_TIME } from '../../../shared/domain/enums/maua_end_time_enum'

export type AvailabilitiesParam = {
  startTime: MAUA_START_TIME
  endTime: MAUA_END_TIME
  weekDay: WEEK_DAY
}

export class UpdateAvailabilitiesUsecase {
  constructor(private repo: IScheduleRepository) {}

  async execute(userId: number, availabilities: AvailabilitiesParam[]): Promise<boolean> {
    // check if user exists
    const user = await this.repo.getUser(userId)

    // check if user is a professor
    if (user.role !== ROLE.PROFESSOR && user.role !== ROLE.COORDINATOR) {
      throw new InvalidRole(`${ROLE.PROFESSOR} or ${ROLE.COORDINATOR}`, ROLE.STAFF)
    }

    // check availabilitiesParam
    const createdAvailabilities = availabilities.map(availability => {
      return new Availability({
        id: uuidv4(),
        userId: userId,
        startTime: availability.startTime,
        endTime: availability.endTime,
        isTaken: false,
        weekDay: availability.weekDay,
      })
    })
    
    // delete all availabilities for user
    const availabilitiesForUser = await this.repo.getAvailabilitiesByUserId(userId)
    for (const availability of availabilitiesForUser) {
      await this.repo.deleteAvailability(availability.availabilityId)
    }

    // create new availabilities
    for (const availability of createdAvailabilities) {
      await this.repo.createAvailability(availability)
    }

    return true

  }
}
