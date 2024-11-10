import { describe, it, expect } from 'vitest'

import { CreatePossibilitiesUsecase } from '../../../../src/modules/create_possibilities/app/create_possibilities_usecase'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'
import { MAUA_START_TIME } from '../../../../src/shared/domain/enums/maua_start_time_enum'
import { WEEK_DAY } from '../../../../src/shared/domain/enums/week_day_enum'
import { MAUA_END_TIME } from '../../../../src/shared/domain/enums/maua_end_time_enum'

describe('Assert CreatePossibilities is correct at all', () => {
  it('Should activate usecase correctly', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new CreatePossibilitiesUsecase(repo)
    const scheduleId = "1S-2CIC-D4@2024(SCS)"
    const dates = {
      "MON": {
        notEarlier: MAUA_START_TIME.H07_40_09_20,
        notLater: MAUA_END_TIME.H07_40_09_20
      },
      "TUE": {
        notEarlier: MAUA_START_TIME.H07_40_09_20,
        notLater: MAUA_END_TIME.H09_30_11_10
      },
      "WED": {
        notEarlier: MAUA_START_TIME.H07_40_09_20,
        notLater: MAUA_END_TIME.H11_20_13_00
      },
      "THU": {
        notEarlier: MAUA_START_TIME.H07_40_09_20,
        notLater: MAUA_END_TIME.H20_50_22_30
      },
      "FRI": {
        notEarlier: MAUA_START_TIME.H20_50_22_30,
        notLater: MAUA_END_TIME.H20_50_22_30
      },
      "SAT": {
        notEarlier: MAUA_START_TIME.H11_20_13_00,
        notLater: MAUA_END_TIME.H19_00_20_40
      },
    }
    const possibilitiesLengthBefore = await repo.getPossibilitiesLength()
    await usecase.execute(scheduleId, dates)
    const possibilitiesLengthAfter = await repo.getPossibilitiesLength()

    expect(possibilitiesLengthAfter).toEqual(possibilitiesLengthBefore + 20)
  })
  it('Should activate usecase correctly with optional params', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new CreatePossibilitiesUsecase(repo)
    const scheduleId = "1S-2CIC-D4@2024(SCS)"
    const dates = {
      "MON": {
        notEarlier: MAUA_START_TIME.H09_30_11_10,
        notLater: MAUA_END_TIME.H09_30_11_10
      },
      "WED": {
        notEarlier: MAUA_START_TIME.H19_00_20_40,
        notLater: MAUA_END_TIME.H20_50_22_30
      },
    }
    const possibilitiesLengthBefore = await repo.getPossibilitiesLength()
    await usecase.execute(scheduleId, dates)
    const possibilitiesLengthAfter = await repo.getPossibilitiesLength()

    expect(possibilitiesLengthAfter).toEqual(possibilitiesLengthBefore + 3)
  })
  it('Should activate usecase correctly without dates', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new CreatePossibilitiesUsecase(repo)
    const scheduleId = "1S-2CIC-D4@2024(SCS)"
    const dates = {
    }
    const possibilitiesLengthBefore = await repo.getPossibilitiesLength()
    await usecase.execute(scheduleId, dates)
    const possibilitiesLengthAfter = await repo.getPossibilitiesLength()

    expect(possibilitiesLengthAfter).toEqual(possibilitiesLengthBefore)
  })
  it('Should raise error on usecase with scheduleId not found', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new CreatePossibilitiesUsecase(repo)
    const scheduleId = "1S-5CIC-D6@2024(SCS)"
    const dates = {
      "MON": {
        notEarlier: MAUA_START_TIME.H07_40_09_20,
        notLater: MAUA_END_TIME.H07_40_09_20
      },
      "TUE": {
        notEarlier: MAUA_START_TIME.H07_40_09_20,
        notLater: MAUA_END_TIME.H09_30_11_10
      },
      "WED": {
        notEarlier: MAUA_START_TIME.H07_40_09_20,
        notLater: MAUA_END_TIME.H11_20_13_00
      },
      "THU": {
        notEarlier: MAUA_START_TIME.H07_40_09_20,
        notLater: MAUA_END_TIME.H20_50_22_30
      },
      "FRI": {
        notEarlier: MAUA_START_TIME.H20_50_22_30,
        notLater: MAUA_END_TIME.H20_50_22_30
      },
      "SAT": {
        notEarlier: MAUA_START_TIME.H11_20_13_00,
        notLater: MAUA_END_TIME.H19_00_20_40
      },
    }
    const possibilitiesLengthBefore = await repo.getPossibilitiesLength()
    await expect(usecase.execute(scheduleId, dates)).rejects.toThrowError(
      'No items found for scheduleId',
    )
    const possibilitiesLengthAfter = await repo.getPossibilitiesLength()

    expect(possibilitiesLengthAfter).toEqual(possibilitiesLengthBefore)
  })
  it('Should raise error on usecase with notEarlier bigger than notLater', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new CreatePossibilitiesUsecase(repo)
    const scheduleId = "1S-2CIC-D4@2024(SCS)"
    const dates = {
      "MON": {
        notEarlier: MAUA_START_TIME.H07_40_09_20,
        notLater: MAUA_END_TIME.H07_40_09_20
      },
      "TUE": {
        notEarlier: MAUA_START_TIME.H07_40_09_20,
        notLater: MAUA_END_TIME.H09_30_11_10
      },
      "WED": {
        notEarlier: MAUA_START_TIME.H07_40_09_20,
        notLater: MAUA_END_TIME.H11_20_13_00
      },
      "THU": {
        notEarlier: MAUA_START_TIME.H07_40_09_20,
        notLater: MAUA_END_TIME.H20_50_22_30
      },
      "FRI": {
        notEarlier: MAUA_START_TIME.H20_50_22_30,
        notLater: MAUA_END_TIME.H19_00_20_40
      },
      "SAT": {
        notEarlier: MAUA_START_TIME.H11_20_13_00,
        notLater: MAUA_END_TIME.H19_00_20_40
      },
    }
    const possibilitiesLengthBefore = await repo.getPossibilitiesLength()
    await expect(usecase.execute(scheduleId, dates)).rejects.toThrowError(
      'Invalid time: notEarlier "1250" must be earlier than notLater "1240"',
    )
    const possibilitiesLengthAfter = await repo.getPossibilitiesLength()

    expect(possibilitiesLengthAfter).toEqual(possibilitiesLengthBefore)
  })
  
  
})
