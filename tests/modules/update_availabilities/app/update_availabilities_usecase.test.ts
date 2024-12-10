import { describe, it, expect } from 'vitest'

import { AvailabilitiesParam, UpdateAvailabilitiesUsecase } from '../../../../src/modules/update_availabilities/app/update_availabilities_usecase'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'
import { MAUA_START_TIME } from '../../../../src/shared/domain/enums/maua_start_time_enum'
import { WEEK_DAY } from '../../../../src/shared/domain/enums/week_day_enum'
import { MAUA_END_TIME } from '../../../../src/shared/domain/enums/maua_end_time_enum'

describe('Assert UpdateAvailabilityUsecase is correct at all', () => {
  it('Should activate usecase correctly', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesUsecase(repo)
    const userId = 3
    const availabilities : AvailabilitiesParam[] = [
      {
        startTime: MAUA_START_TIME.H07_40_09_20,
        endTime: MAUA_END_TIME.H07_40_09_20,
        weekDay: WEEK_DAY.FRI
      },
      {
        startTime: MAUA_START_TIME.H07_40_09_20,
        endTime: MAUA_END_TIME.H07_40_09_20,
        weekDay: WEEK_DAY.SAT
      },
      {
        startTime: MAUA_START_TIME.H09_30_11_10,
        endTime: MAUA_END_TIME.H09_30_11_10,
        weekDay: WEEK_DAY.FRI
      }
    ]

    await usecase.execute(userId, availabilities)

    const availabilitiesForUser = await repo.getAvailabilitiesByUserId(userId)

    expect(availabilitiesForUser.length).toEqual(3)
    
    expect(availabilitiesForUser[0].startTime).toEqual(MAUA_START_TIME.H07_40_09_20)
    expect(availabilitiesForUser[0].endTime).toEqual(MAUA_END_TIME.H07_40_09_20)
    expect(availabilitiesForUser[0].weekDay).toEqual(WEEK_DAY.FRI)
    expect(availabilitiesForUser[0].userId).toEqual(userId)
    expect(availabilitiesForUser[0].isTaken).toEqual(false)
    
    
    expect(availabilitiesForUser[1].startTime).toEqual(MAUA_START_TIME.H07_40_09_20)
    expect(availabilitiesForUser[1].endTime).toEqual(MAUA_END_TIME.H07_40_09_20) 
    expect(availabilitiesForUser[1].weekDay).toEqual(WEEK_DAY.SAT)
    expect(availabilitiesForUser[1].userId).toEqual(userId)
    expect(availabilitiesForUser[1].isTaken).toEqual(false)
    
    expect(availabilitiesForUser[2].startTime).toEqual(MAUA_START_TIME.H09_30_11_10)
    expect(availabilitiesForUser[2].endTime).toEqual(MAUA_END_TIME.H09_30_11_10)
    expect(availabilitiesForUser[2].weekDay).toEqual(WEEK_DAY.FRI)
    expect(availabilitiesForUser[2].userId).toEqual(userId)
    expect(availabilitiesForUser[2].isTaken).toEqual(false)
  })

  it('Should activate usecase correctly for user without availabilities', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesUsecase(repo)
    const userId = 5
    const availabilities : AvailabilitiesParam[] = [
      {
        startTime: MAUA_START_TIME.H07_40_09_20,
        endTime: MAUA_END_TIME.H07_40_09_20,
        weekDay: WEEK_DAY.FRI
      },
      {
        startTime: MAUA_START_TIME.H07_40_09_20,
        endTime: MAUA_END_TIME.H07_40_09_20,
        weekDay: WEEK_DAY.SAT
      },
      {
        startTime: MAUA_START_TIME.H09_30_11_10,
        endTime: MAUA_END_TIME.H09_30_11_10,
        weekDay: WEEK_DAY.FRI
      }
    ]

    await usecase.execute(userId, availabilities)

    const availabilitiesForUser = await repo.getAvailabilitiesByUserId(userId)

    expect(availabilitiesForUser.length).toEqual(3)
    
    expect(availabilitiesForUser[0].startTime).toEqual(MAUA_START_TIME.H07_40_09_20)
    expect(availabilitiesForUser[0].endTime).toEqual(MAUA_END_TIME.H07_40_09_20)
    expect(availabilitiesForUser[0].weekDay).toEqual(WEEK_DAY.FRI)
    expect(availabilitiesForUser[0].userId).toEqual(userId)
    expect(availabilitiesForUser[0].isTaken).toEqual(false)
    
    
    expect(availabilitiesForUser[1].startTime).toEqual(MAUA_START_TIME.H07_40_09_20)
    expect(availabilitiesForUser[1].endTime).toEqual(MAUA_END_TIME.H07_40_09_20) 
    expect(availabilitiesForUser[1].weekDay).toEqual(WEEK_DAY.SAT)
    expect(availabilitiesForUser[1].userId).toEqual(userId)
    expect(availabilitiesForUser[1].isTaken).toEqual(false)
    
    expect(availabilitiesForUser[2].startTime).toEqual(MAUA_START_TIME.H09_30_11_10)
    expect(availabilitiesForUser[2].endTime).toEqual(MAUA_END_TIME.H09_30_11_10)
    expect(availabilitiesForUser[2].weekDay).toEqual(WEEK_DAY.FRI)
    expect(availabilitiesForUser[2].userId).toEqual(userId)
    expect(availabilitiesForUser[2].isTaken).toEqual(false)
  })

  it('Should activate usecase correctly for empty availabilities param', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesUsecase(repo)
    const userId = 3
    const availabilities : AvailabilitiesParam[] = [
      
    ]

    await usecase.execute(userId, availabilities)

    const availabilitiesForUser = await repo.getAvailabilitiesByUserId(userId)

    expect(availabilitiesForUser.length).toEqual(0)
  })

  it('Should activate usecase correctly for a availability with availabilityFullfilled assign', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesUsecase(repo)
    const userId = 4
    const availabilities : AvailabilitiesParam[] = [
      
    ]

    const avFullfilledBefore = await repo.getAllAvsFullfilled()

    await usecase.execute(userId, availabilities)

    const availabilitiesForUser = await repo.getAvailabilitiesByUserId(userId)
    const avFullfilledAfter = await repo.getAllAvsFullfilled()

    expect(availabilitiesForUser.length).toEqual(0)
    expect(avFullfilledBefore.length).toEqual(avFullfilledAfter.length + 1)


  })
  
  it('Should activate usecase correctly for empty availabilities param to a ADMIN user', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesUsecase(repo)
    const userId = 4
    const availabilities : AvailabilitiesParam[] = [
      
    ]

    await usecase.execute(userId, availabilities)

    const availabilitiesForUser = await repo.getAvailabilitiesByUserId(userId)

    expect(availabilitiesForUser.length).toEqual(0)
  })

  it('Should raise error: user does not exists', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesUsecase(repo)
    const userId = await repo.getUsersLength() + 1
    const availabilities : AvailabilitiesParam[] = [
    ]

    const lengthUserAvailabilitiesBefore = await repo.getAvailabilitiesLength() 

    await expect(usecase.execute(userId, availabilities)).rejects.toThrowError(
      'No items found for userId',
    )

    const lengthUserAvailabilitiesAfter = await repo.getAvailabilitiesLength()

    expect(lengthUserAvailabilitiesBefore).toEqual(lengthUserAvailabilitiesAfter)
  })

  it('Should raise error: user is not a professor', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesUsecase(repo)
    const userIdStaff = 1
    const userIdCoord = 2
    const availabilities : AvailabilitiesParam[] = [
    ]

    const lengthUserAvailabilitiesBefore = await repo.getAvailabilitiesLength() 

    await expect(usecase.execute(userIdStaff, availabilities)).rejects.toThrowError(
      'Invalid role. Expected PROFESSOR or COORDINATOR but received STAFF',
    )
    
    const lengthUserAvailabilitiesAfterStaff = await repo.getAvailabilitiesLength()
    expect(lengthUserAvailabilitiesBefore).toEqual(lengthUserAvailabilitiesAfterStaff)

  })

  it('Should raise error: invalid availability on param', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesUsecase(repo)
    const userId = 3
    const availabilities : AvailabilitiesParam[] = [
      {
        startTime: MAUA_START_TIME.H07_40_09_20,
        endTime: MAUA_END_TIME.H07_40_09_20,
        weekDay: WEEK_DAY.FRI
      },
      {
        startTime: MAUA_START_TIME.H07_40_09_20,
        endTime: MAUA_END_TIME.H09_30_11_10,
        weekDay: WEEK_DAY.SAT
      },
      {
        startTime: MAUA_START_TIME.H09_30_11_10,
        endTime: MAUA_END_TIME.H09_30_11_10,
        weekDay: WEEK_DAY.FRI
      }
    ]

    const lengthUserAvailabilitiesBefore = await repo.getAvailabilitiesLength() 

    await expect(usecase.execute(userId, availabilities)).rejects.toThrowError(
      'startTime and endTime are not equal',
    )

    const lengthUserAvailabilitiesAfter = await repo.getAvailabilitiesLength()

    expect(lengthUserAvailabilitiesBefore).toEqual(lengthUserAvailabilitiesAfter)
  })
})
