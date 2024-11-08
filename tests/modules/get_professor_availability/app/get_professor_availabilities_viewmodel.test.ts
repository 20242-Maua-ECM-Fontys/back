import { describe, it, expect } from 'vitest'
import { Suitability } from '../../../../src/shared/domain/entities/suitability'
import { GetProfessorAvailabilitiesViewmodel } from '../../../../src/modules/get_all_professor_availabilities/app/get_professor_availabilities_viewmodel';
import { Availability } from '../../../../src/shared/domain/entities/availability';
import { WEEK_DAY } from '../../../../src/shared/domain/enums/week_day_enum';
import { MAUA_START_TIME } from '../../../../src/shared/domain/enums/maua_start_time_enum';
import { MAUA_END_TIME } from '../../../../src/shared/domain/enums/maua_end_time_enum';

describe('Tests for GetProfessorAvailabilitiesViewmodel', () => {
  it('should have a message', () => {
    const availabilities: Availability[] = [
        new Availability({
            id: '0a8c5357-1f07-5b24-9845-9318c4000000',
            userId: 3,
            startTime: MAUA_START_TIME.H07_40_09_20,
            endTime: MAUA_END_TIME.H07_40_09_20,
            isTaken: false,
            weekDay: WEEK_DAY.MON,
        }),
        new Availability({
            id: '0a8c5357-1f07-5b24-9845-9318c4000001',
            userId: 3,
            startTime: MAUA_START_TIME.H09_30_11_10,
            endTime: MAUA_END_TIME.H09_30_11_10,
            isTaken: false,
            weekDay: WEEK_DAY.MON,
          })
    ]

    const viewModel = new GetProfessorAvailabilitiesViewmodel(availabilities)
    expect(viewModel.toJSON()).toEqual({
      message: 'availabilities by professor returned',
      availabilities: [
        { id: '0a8c5357-1f07-5b24-9845-9318c4000000',
            userId: 3,
            startTime: MAUA_START_TIME.H07_40_09_20,
            endTime: MAUA_END_TIME.H07_40_09_20,
            isTaken: false,
            weekDay: WEEK_DAY.MON },
        { id: '0a8c5357-1f07-5b24-9845-9318c4000001',
            userId: 3,
            startTime: MAUA_START_TIME.H09_30_11_10,
            endTime: MAUA_END_TIME.H09_30_11_10,
            isTaken: false,
            weekDay: WEEK_DAY.MON, },
      ],
    })
  })

  it('should have a message with empty list', () => {
    const availabilities: Availability[] = []
    const viewModel = new GetProfessorAvailabilitiesViewmodel(availabilities)
    expect(viewModel.toJSON()).toEqual({
        message: 'availabilities by professor returned',
        availabilities: [],
    })
  })
  
})