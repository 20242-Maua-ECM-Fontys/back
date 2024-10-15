import { describe, it, expect } from 'vitest'
import { Possibility } from '../../../../src/shared/domain/entities/possibility'
import { WEEK_DAY } from '../../../../src/shared/domain/enums/week_day_enum'
import { MAUA_START_TIME } from '../../../../src/shared/domain/enums/maua_start_time_enum'
import { MAUA_END_TIME } from '../../../../src/shared/domain/enums/maua_end_time_enum'
import { EntityError } from '../../../../src/shared/helpers/errors/domain_errors'

describe('Possibility entity', () => {
  it('should create a possibility entity', () => {
    const possibility = new Possibility({
      id: '123e4567-e89b-12d3-a456-426614174000',
      weekDay: WEEK_DAY.FRI,
      startTime: MAUA_START_TIME.H07_40_09_20,
      endTime: MAUA_END_TIME.H07_40_09_20,
      scheduleId: '2S-4CM-D5@2024(SCS)',
    })

    expect(possibility).toBeDefined()
  })

  it('should throw an error if id is invalid', () => {
    expect(() => {
      new Possibility({
        id: '5',
        weekDay: WEEK_DAY.FRI,
        startTime: MAUA_START_TIME.H07_40_09_20,
        endTime: MAUA_END_TIME.H07_40_09_20,
        scheduleId: '2S-4CM-D5@2024(SCS)',
      })
    }).toThrowError(EntityError)
  })

  it('should throw an error if weekDay is invalid', () => {
    expect(() => {
      new Possibility({
        id: '123e4567-e89b-12d3-a456-426614174000',
        weekDay: 'MONDAY' as WEEK_DAY,
        startTime: MAUA_START_TIME.H07_40_09_20,
        endTime: MAUA_END_TIME.H07_40_09_20,
        scheduleId: '2S-4CM-D5@2024(SCS)',
      })
    }).toThrowError(EntityError)
  })

  it('should throw an error if startTime is invalid', () => {
    expect(() => {
      new Possibility({
        id: '123e4567-e89b-12d3-a456-426614174000',
        weekDay: WEEK_DAY.FRI,
        startTime: 1 as MAUA_START_TIME,
        endTime: MAUA_END_TIME.H07_40_09_20,
        scheduleId: '2S-4CM-D5@2024(SCS)',
      })
    }).toThrowError(EntityError)
  })

  it('should throw an error if endTime is invalid', () => {
    expect(() => {
      new Possibility({
        id: '123e4567-e89b-12d3-a456-426614174000',
        weekDay: WEEK_DAY.FRI,
        startTime: MAUA_START_TIME.H07_40_09_20,
        endTime: 1 as MAUA_END_TIME,
        scheduleId: '2S-4CM-D5@2024(SCS)',
      })
    }).toThrowError(EntityError)
  })

  it('should throw an error if startTime != endTime', () => {
    expect(() => {
      new Possibility({
        id: '123e4567-e89b-12d3-a456-426614174000',
        weekDay: WEEK_DAY.FRI,
        startTime: MAUA_START_TIME.H07_40_09_20,
        endTime: MAUA_END_TIME.H09_30_11_10,
        scheduleId: '2S-4CM-D5@2024(SCS)',
      })
    }).toThrowError(EntityError)
    expect(() => {
      new Possibility({
        id: '123e4567-e89b-12d3-a456-426614174000',
        weekDay: WEEK_DAY.FRI,
        startTime: MAUA_START_TIME.H09_30_11_10,
        endTime: MAUA_END_TIME.H07_40_09_20,
        scheduleId: '2S-4CM-D5@2024(SCS)',
      })
    }).toThrowError(EntityError)
  })

  it('should throw an error if scheduleId is invalid', () => {
    expect(() => {
      new Possibility({
        id: '123e4567-e89b-12d3-a456-426614174000',
        weekDay: WEEK_DAY.FRI,
        startTime: 1 as MAUA_START_TIME,
        endTime: MAUA_END_TIME.H07_40_09_20,
        scheduleId: '2S-4CM-D5@2024(SCS)',
      })
    }).toThrowError(EntityError)
  })
})
