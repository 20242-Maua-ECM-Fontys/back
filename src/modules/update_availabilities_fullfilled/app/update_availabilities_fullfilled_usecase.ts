import { DuplicatedId, InvalidReferenceToScheduleId, ProfessorAlreadyAssignToOtherSchedule, ProfessorCannotTeachClass, ProfessorDoesntHaveAvailability } from '../../../shared/helpers/errors/usecase_errors'
import { IScheduleRepository } from '../../../shared/domain/repositories/schedule_repository_interface'
import { AvFullfilled } from '../../../shared/domain/entities/avFullfilled'

export type AvailabilitiesFullfilledParam = {
  userId: number
  classId: string
  possibilityId: string
}

export class UpdateAvailabilitiesFullfilledUsecase {
  constructor(private repo: IScheduleRepository) {}

  async execute(scheduleId: string, availabilitiesFullfilled: AvailabilitiesFullfilledParam[]): Promise<boolean> {
    // check if schedule exists
    await this.repo.getSchedule(scheduleId, 1)

    // check if all classesId are unique
    const classIdList = availabilitiesFullfilled.map((item) => item.classId)
    if (new Set(classIdList).size !== classIdList.length) {
      throw new DuplicatedId('class')
    }
    
    // get a list of classes on repo (check if those classId exists)
    const classes = await this.repo.getClassesByIds(classIdList)

    // get a list of users on repo (check if those userId exists), with its availabilities and suitabilities
    const userIdList = availabilitiesFullfilled.map((item) => item.userId)
    const userIdListUnique = Array.from(new Set(userIdList))
    const usersWithAvailabilitiesAndSuitabilities = await this.repo.getUsersWithAvailabilitiesAndSuitabilities(userIdListUnique)

    // check if all possibilityId are unique
    const possibilityIdList = availabilitiesFullfilled.map((item) => item.possibilityId)
    if (new Set(possibilityIdList).size !== possibilityIdList.length) {
      throw new DuplicatedId('possibility')
    }
    
    // get a list of possibilities on repo (check if those possibilityId exists)
    const possibilities = await this.repo.getPossibilitiesByIds(possibilityIdList)

    // create a list of all avFullfilled created
    const newAvFullfilledList: AvFullfilled[] = []
    
    // validations for each availabilityFullfilled
    for (const avFullfilled of availabilitiesFullfilled) {

      // check if possibility and class refeers to the specified scheduleId
      if (possibilities[avFullfilled.possibilityId].scheduleId !== scheduleId) {
        throw new InvalidReferenceToScheduleId('possibility', avFullfilled.possibilityId, scheduleId, 1)
      }
      if (classes[avFullfilled.classId].scheduleId !== scheduleId) {
        throw new InvalidReferenceToScheduleId('class', avFullfilled.classId, scheduleId, 1)
      }

      // check if user can teach the class
      const avFullfilledClass = classes[avFullfilled.classId]
      if (!usersWithAvailabilitiesAndSuitabilities[avFullfilled.userId].suitabilities.some((suitability) => suitability.codeSubject === avFullfilledClass.subjectCode)) {
        throw new ProfessorCannotTeachClass(avFullfilled.userId, avFullfilled.classId)
      }

      // check if user has free time on the specified possibility
      const avFullfilledPossibility = possibilities[avFullfilled.possibilityId]
      const userAvailabiltiy = usersWithAvailabilitiesAndSuitabilities[avFullfilled.userId].availabilities.find((availability) => availability.data.startTime === avFullfilledPossibility.startTime && availability.data.endTime === avFullfilledPossibility.endTime && avFullfilledPossibility.weekDay === availability.data.weekDay)
      if (!userAvailabiltiy) {
        throw new ProfessorDoesntHaveAvailability(avFullfilled.userId, avFullfilledPossibility.startTime, avFullfilledPossibility.endTime)
      }

      // check if user has already fullfilled the availability into other schedule
      if (userAvailabiltiy.scheduleFullfilled && userAvailabiltiy.scheduleFullfilled !== scheduleId) {
        throw new ProfessorAlreadyAssignToOtherSchedule(avFullfilled.userId, userAvailabiltiy.scheduleFullfilled)
      }

      // create avFullfilled
      const newAvFullfilled = new AvFullfilled({
        availabilityId: userAvailabiltiy.data.availabilityId,
        possibilityId: avFullfilled.possibilityId,
        classId: avFullfilled.classId
      })
      newAvFullfilledList.push(newAvFullfilled)
    }

    // remove all avFullfilled from specified schedule from repo
    await this.repo.deleteAvsFullfilledByScheduleId(scheduleId)

    // create all avFullfilled into repo
    await this.repo.createAvsFullfilled(newAvFullfilledList)

    return true
  }
}
