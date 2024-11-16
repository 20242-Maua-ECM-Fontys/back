import { IScheduleRepository } from '../../../shared/domain/repositories/schedule_repository_interface'

export type AvailabilitiesFullfilledParam = {
  userId: number
  classId: string
  possibilityId: string
}

export class UpdateAvailabilitiesFullfilledUsecase {
  constructor(private repo: IScheduleRepository) {}

  async execute(scheduleId: string, availabilitiesFullfilled: AvailabilitiesFullfilledParam[]): Promise<boolean> {
    // check if schedule exists
    const schedule = await this.repo.getSchedule(scheduleId, 1)

    // get a list of classes on repo (check if those classId exists)
    const classIdList = availabilitiesFullfilled.map((item) => item.classId)
    const classes = await this.repo.getClassesByIds(classIdList)

    // get a list of users on repo (check if those userId exists), with its availabilities and suitabilities
    const userIdList = availabilitiesFullfilled.map((item) => item.userId)
    const usersWithAvailabilitiesAndSuitabilities = await this.repo.getUsersWithAvailabilitiesAndSuitabilities(userIdList)

    // get a list of possibilities on repo (check if those possibilityId exists)
    const possibilityIdList = availabilitiesFullfilled.map((item) => item.possibilityId)
    const possibilities = await this.repo.getPossibilitiesByIds(possibilityIdList)
    
    // validate 
    for (const element of object) {
      
    }

    return true
  }
}
