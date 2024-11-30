import { describe, it, expect } from 'vitest'
import { GetPossibilitiesByScheduleViewmodel } from '../../../../src/modules/get_possibilities_by_schedule/app/get_possibilities_by_schedule_viewmodel'
import { Possibility } from '../../../../src/shared/domain/entities/possibility'
import { MAUA_START_TIME } from '../../../../src/shared/domain/enums/maua_start_time_enum'
import { MAUA_END_TIME } from '../../../../src/shared/domain/enums/maua_end_time_enum'
import { WEEK_DAY } from '../../../../src/shared/domain/enums/week_day_enum'

describe('GetPossibilitiesByScheduleViewmodel', () => {
  it('should have a message', () => {
    const possibilities: Possibility[] = [
      new Possibility({
        id: '113e4567-e89b-12d3-a456-426614174000',
        weekDay: WEEK_DAY.MON,
        startTime: MAUA_START_TIME.H07_40_09_20,
        endTime: MAUA_END_TIME.H07_40_09_20,
        scheduleId: '2S-4CM-D5@2024(SCS)',
      }),
      new Possibility({
        id: '123e4567-e89b-12d3-a456-426614174001',
        weekDay: WEEK_DAY.MON,
        startTime: MAUA_START_TIME.H09_30_11_10,
        endTime: MAUA_END_TIME.H09_30_11_10,
        scheduleId: '2S-4CM-D5@2024(SCS)',
      }),
    ]
    const viewModel = new GetPossibilitiesByScheduleViewmodel(possibilities)
    console.log(viewModel.toJSON())

    expect(viewModel.toJSON()).toEqual({
      message: 'possibilities by schedule returned',
      possibilities: [
        {
          id: '113e4567-e89b-12d3-a456-426614174000',
          weekDay: 'MON',
          startTime: 460,
          endTime: 560,
          scheduleId: '2S-4CM-D5@2024(SCS)',
        },
        {
          id: '123e4567-e89b-12d3-a456-426614174001',
          weekDay: 'MON',
          startTime: 570,
          endTime: 670,
          scheduleId: '2S-4CM-D5@2024(SCS)',
        },
      ],
    })
  })

  it('should have a message with empty possibilities', () => {
    const possibilities: Possibility[] = []
    const viewModel = new GetPossibilitiesByScheduleViewmodel(possibilities)
    expect(viewModel.toJSON()).toEqual({
      message: 'possibilities by schedule returned',
      possibilities: [],
    })
  })
})
