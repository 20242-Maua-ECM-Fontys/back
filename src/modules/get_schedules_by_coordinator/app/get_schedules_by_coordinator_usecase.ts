import {
  Schedule,
  ScheduleProps,
} from '../../../shared/domain/entities/schedule'
import { EntityError } from '../../../shared/helpers/errors/domain_errors'
import { IScheduleRepository } from '../../../shared/domain/repositories/schedule_repository_interface'
import { User } from '../../../shared/domain/entities/user'
import { Class, ClassProps } from '../../../shared/domain/entities/class'
import {
  Possibility,
  PossibilityProps,
} from '../../../shared/domain/entities/possibility'
import { ROLE } from '../../../shared/domain/enums/role_enum'
import { InvalidRole } from '../../../shared/helpers/errors/usecase_errors'

type SchedulePlain = Omit<Schedule, 'props' | 'toJSON'> & ScheduleProps
type ClassPlain = Omit<Class, 'props' | 'toJSON'> & ClassProps
type PossibilityPlain = Omit<Possibility, 'props' | 'toJSON'> & PossibilityProps

export type completeSchedule = {
  schedule: SchedulePlain
  classes: (ClassPlain & {
    fullfilledData?: { professorId: number; possibilityId: string }
  })[]
  possibilities: PossibilityPlain[]
}

export class GetSchedulesByCoordinatorUsecase {
  constructor(private repo: IScheduleRepository) {}

  async execute(coordinatorId: number): Promise<completeSchedule[]> {
    if (!User.validateId(coordinatorId)) {
      throw new EntityError('coordinatorId')
    }

    // Check if user exists and if it's a coordinator
    const user = await this.repo.getUser(coordinatorId)
    if (user.role !== ROLE.COORDINATOR) {
      throw new InvalidRole('COORDINATOR', user.role)
    }

    const schedules = await this.repo.getSchedulesByUserId(coordinatorId)
    const completeSchedules: completeSchedule[] = []

    // For each schedule, get the classes, possibilities, and add fullfilledData to each class if available
    for (let i = 0; i < schedules.length; i++) {
      const classes = await this.repo.getClassesByScheduleId(
        schedules[i].scheduleId,
      )
      const possibilities = await this.repo.getPossibilitiesByScheduleId(
        schedules[i].scheduleId,
      )

      // Map classes and construct a response object that includes fullfilledData when available
      const classesWithFullfilledData = await Promise.all(
        classes.map(async (class_) => {
          const fullfilledData = await this.repo.getFullfilledDataByClassId(
            class_.id,
          )
          return {
            ...class_.props, // Spread properties from Class instance
            ...(fullfilledData ? { fullfilledData } : {}), // Add fullfilledData if it exists
          }
        }),
      )

      completeSchedules[i] = {
        schedule: schedules[i].props, // Convert Schedule instance to plain object
        classes: classesWithFullfilledData,
        possibilities: possibilities.map((possibility) => possibility.props), // Convert each Possibility instance
      }
    }

    return completeSchedules
  }
}
