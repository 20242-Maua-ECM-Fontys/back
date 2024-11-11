import { Schedule } from '../../../shared/domain/entities/schedule'
import { EntityError } from '../../../shared/helpers/errors/domain_errors'
import { IScheduleRepository } from '../../../shared/domain/repositories/schedule_repository_interface'
import { User } from '../../../shared/domain/entities/user'
import { Class } from '../../../shared/domain/entities/class'
import { Possibility } from '../../../shared/domain/entities/possibility'
import { ROLE } from '../../../shared/domain/enums/role_enum'
import { InvalidRole } from '../../../shared/helpers/errors/usecase_errors'

export type completeSchedule = {
  schedule: Schedule
  classes: Class[]
  possibilities: Possibility[]
}

export class GetSchedulesByCoordinatorUsecase {
  constructor(private repo: IScheduleRepository) {}

  async execute(coordinatorId: number): Promise<completeSchedule[]> {
    if (!User.validateId(coordinatorId)) {
      throw new EntityError('coordinatorId')
    }

    // check if user exists and if it's a coordinator
    const user = await this.repo.getUser(coordinatorId)
    if (user.role !== ROLE.COORDINATOR) {
      throw new InvalidRole('COORDINATOR', user.role)
    }

    const schedules = await this.repo.getSchedulesByCoordinator(coordinatorId)
    const completeSchedules: completeSchedule[] = []

    //for each schedule, should get the classes and possibilities and create a completeSchedule object
    for (let i = 0; i < schedules.length; i++) {
      const classes = await this.repo.getClassesByScheduleId(
        schedules[i].scheduleId,
      )
      const possibilities = await this.repo.getPossibilitiesByScheduleId(
        schedules[i].scheduleId,
      )
      completeSchedules[i] = { schedule: schedules[i], classes, possibilities }
    }
    return completeSchedules
  }
}
