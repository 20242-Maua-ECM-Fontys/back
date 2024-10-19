import { describe, it, expect } from 'vitest'
import { Availability } from '../../../../src/shared/domain/entities/availability'
import { WEEK_DAY } from '../../../../src/shared/domain/enums/week_day_enum'
import { MAUA_START_TIME } from '../../../../src/shared/domain/enums/maua_start_time_enum'
import { MAUA_END_TIME } from '../../../../src/shared/domain/enums/maua_end_time_enum'
import { EntityError } from '../../../../src/shared/helpers/errors/domain_errors'

describe('Availability entity', () => {
  it('should create a availability entity', () => {
    const availability = new Availability({
      id: '123e4567-e89b-12d3-a456-426614174000',
      userId: 2,
      startTime: MAUA_START_TIME.H07_40_09_20,
      endTime: MAUA_END_TIME.H07_40_09_20,
      isTaken: false,
      weekDay: WEEK_DAY.FRI,
    })

    expect(availability).toBeDefined()
    expect(availability.props.id).toBe('123e4567-e89b-12d3-a456-426614174000')
    expect(availability.props.userId).toBe(2)
    expect(availability.props.startTime).toBe(MAUA_START_TIME.H07_40_09_20)
    expect(availability.props.endTime).toBe(MAUA_END_TIME.H07_40_09_20)
    expect(availability.props.isTaken).toBe(false)
    expect(availability.props.weekDay).toBe(WEEK_DAY.FRI)
  })
  it('should throw an error if id is invalid', () => {
    expect(() => {
      new Availability({
        id: '123e47-e892d3-a456-426614174000',
        userId: 2,
        startTime: MAUA_START_TIME.H07_40_09_20,
        endTime: MAUA_END_TIME.H07_40_09_20,
        isTaken: false,
        weekDay: WEEK_DAY.FRI,

      })
    }).toThrowError(EntityError)
  })
  it('should throw an error if userId is invalid', () => {
    expect(() => {
      new Availability({
        id: '123e4567-e89b-d3-a456-426614174000',
        userId: -2,
        startTime: MAUA_START_TIME.H07_40_09_20,
        endTime: MAUA_END_TIME.H07_40_09_20,
        isTaken: false,
        weekDay: WEEK_DAY.FRI,

      })
    }).toThrowError(EntityError)
  })
  it('should throw an error if startTime is invalid', () => {
    expect(() => {
      new Availability({
        id: '123e4567-e89b-12d3-a456-426614174000',
        userId: 2,
        startTime: 2 as MAUA_START_TIME,
        endTime: MAUA_END_TIME.H07_40_09_20,
        isTaken: false,
        weekDay: WEEK_DAY.FRI,

      })
    }).toThrowError(EntityError)
  })
  it('should throw an error if endTime is invalid', () => {
    expect(() => {
      new Availability({
        id: '123e4567-e89b-12d3-a456-426614174000',
        userId: 2,
        startTime: MAUA_START_TIME.H07_40_09_20,
        endTime: 2 as MAUA_END_TIME,
        isTaken: false,
        weekDay: WEEK_DAY.FRI,

      })
    }).toThrowError(EntityError)
  })
  it('should throw an error if startTime != endTime is invalid', () => {
    expect(() => {
      new Availability({
        id: '123e4567-e89b-12d3-a456-426614174000',
        userId: 2,
        startTime: MAUA_START_TIME.H09_30_11_10,
        endTime: MAUA_END_TIME.H07_40_09_20,
        isTaken: false,
        weekDay: WEEK_DAY.FRI,

      })
    }).toThrowError(EntityError)
    expect(() => {
      new Availability({
        id: '123e4567-e89b-12d3-a456-426614174000',
        userId: 2,
        startTime: MAUA_START_TIME.H07_40_09_20,
        endTime: MAUA_END_TIME.H09_30_11_10,
        isTaken: false,
        weekDay: WEEK_DAY.FRI,

      })
    }).toThrowError(EntityError)
  })
  it('should throw an error weekDay id is invalid', () => {
    expect(() => {
      new Availability({
        id: '123e4567-e89b-12d3-a456-426614174000',
        userId: 2,
        startTime: MAUA_START_TIME.H07_40_09_20,
        endTime: MAUA_END_TIME.H07_40_09_20,
        isTaken: false,
        weekDay: 'fri' as WEEK_DAY,

      })
    }).toThrowError(EntityError)
  })

})
