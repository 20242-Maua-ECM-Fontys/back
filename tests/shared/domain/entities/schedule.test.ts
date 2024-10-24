import { describe, it, expect } from 'vitest'
import { Schedule } from '../../../../src/shared/domain/entities/schedule'
import { EntityError } from '../../../../src/shared/helpers/errors/domain_errors'
import { ACADEMIC_PERIOD } from '../../../../src/shared/domain/enums/academic_period_enum'

describe('Schedule Entity Tests', () => {
  it('Assert Schedule Entity is correct at all', () => {
    const schedule = new Schedule({
      scheduleId: '2S-4CM-D5@2024(SCS)',
      courseName: 'Compute Engineering',
      groupNumber: 1,
      userId: 2,
      academicPeriod: ACADEMIC_PERIOD.ANNUAL,
      courseGrade: 4,
    })

    expect(schedule).toBeInstanceOf(Schedule)
    expect(schedule.scheduleId).toBe('2S-4CM-D5@2024(SCS)')
    expect(schedule.courseName).toBe('Compute Engineering')
  })
  it('Assert Schedule Entity is correct at all for "Noturno"', () => {
    const schedule = new Schedule({
      scheduleId: '2S-4CM-N5@2024(SCS)',
      courseName: 'Compute Engineering',
      groupNumber: 1,
      userId: 2,
      academicPeriod: ACADEMIC_PERIOD.ANNUAL,
      courseGrade: 4,
    })

    expect(schedule).toBeInstanceOf(Schedule)
    expect(schedule.scheduleId).toBe('2S-4CM-N5@2024(SCS)')
    expect(schedule.courseName).toBe('Compute Engineering')
  })

  it('Assert Schedule Entity wrong with invalid scheduleId', () => {
    expect(() => {
      new Schedule({
        scheduleId: '2-4CM-D5@2024(SCS)',
        courseName: 'Compute Engineering',
        groupNumber: 1,
        userId: 2,
        academicPeriod: ACADEMIC_PERIOD.ANNUAL,
      courseGrade: 4,
      })
    }).toThrowError(EntityError)
    expect(() => {
      new Schedule({
        scheduleId: 'S-4CM-D5@2024(SCS)',
        courseName: 'Compute Engineering',
        groupNumber: 1,
        userId: 2,
        academicPeriod: ACADEMIC_PERIOD.ANNUAL,
        courseGrade: 4,
      })
    }).toThrowError(EntityError)
    expect(() => {
      new Schedule({
        scheduleId: '2S--D5@2024(SCS)',
        courseName: 'Compute Engineering',
        groupNumber: 1,
        userId: 2,
        academicPeriod: ACADEMIC_PERIOD.ANNUAL,
        courseGrade: 4,
      })
    }).toThrowError(EntityError)
    expect(() => {
      new Schedule({
        scheduleId: '2S-4CM-A5@2024(SCS)',
        courseName: 'Compute Engineering',
        groupNumber: 1,
        userId: 2,
        academicPeriod: ACADEMIC_PERIOD.ANNUAL,
        courseGrade: 4,
      })
    }).toThrowError(EntityError)
    expect(() => {
      new Schedule({
        scheduleId: '2S-4CM-D1@2024(SCS)',
        courseName: 'Compute Engineering',
        groupNumber: 1,
        userId: 2,
        academicPeriod: ACADEMIC_PERIOD.ANNUAL,
        courseGrade: 4,
      })
    }).toThrowError(EntityError)
    expect(() => {
      new Schedule({
        scheduleId: '2S-4CM-D7@2024(SCS)',
        courseName: 'Compute Engineering',
        groupNumber: 1,
        userId: 2,
        academicPeriod: ACADEMIC_PERIOD.ANNUAL,
        courseGrade: 4,
      })
    }).toThrowError(EntityError)
    expect(() => {
      new Schedule({
        scheduleId: '2S-4CM-D52024(SCS)',
        courseName: 'Compute Engineering',
        groupNumber: 1,
        userId: 2,
        academicPeriod: ACADEMIC_PERIOD.ANNUAL,
        courseGrade: 4,
      })
    }).toThrowError(EntityError)
    expect(() => {
      new Schedule({
        scheduleId: '2S-4CM-D5@999(SCS)',
        courseName: 'Compute Engineering',
        groupNumber: 1,
        userId: 2,
        academicPeriod: ACADEMIC_PERIOD.ANNUAL,
        courseGrade: 4,
      })
    }).toThrowError(EntityError)
    expect(() => {
      new Schedule({
        scheduleId: '2S-4CM-D5@2024(RJ)',
        courseName: 'Compute Engineering',
        groupNumber: 1,
        userId: 2,
        academicPeriod: ACADEMIC_PERIOD.ANNUAL,
        courseGrade: 4,
      })
    }).toThrowError(EntityError)
  })

  it('Assert Schedule Entity wrong with invalid courseName', () => {
    expect(() => {
      new Schedule({
        scheduleId: '2S-4CM-D5@2024(SCS)',
        courseName: '',
        groupNumber: 1,
        userId: 2,
        academicPeriod: ACADEMIC_PERIOD.ANNUAL,
        courseGrade: 4,
      })
    }).toThrowError(EntityError)
  })

  it('Assert Schedule Entity wrong with invalid groupNumber', () => {
    expect(() => {
      new Schedule({
        scheduleId: '2S-4CM-N5@2024(SCS)',
        courseName: 'Compute Engineering',
        groupNumber: -1,
        userId: 2,
        academicPeriod: ACADEMIC_PERIOD.ANNUAL,
        courseGrade: 4,
      })
    }).toThrowError(EntityError)
    expect(() => {
      new Schedule({
        scheduleId: '2S-4CM-N5@2024(SCS)',
        courseName: 'Compute Engineering',
        groupNumber: 0,
        userId: 2,
        academicPeriod: ACADEMIC_PERIOD.ANNUAL,
        courseGrade: 4,
      })
    }).toThrowError(EntityError)
  })

  it('Assert Schedule Entity wrong with invalid userId', () => {
    expect(() => {
      new Schedule({
        scheduleId: '2S-4CM-D5@2024(SCS)',
        courseName: 'Compute Engineering',
        groupNumber: 1,
        userId: -1,
        academicPeriod: ACADEMIC_PERIOD.ANNUAL,
        courseGrade: 4,
      })
    }).toThrowError(EntityError)
  })

  it('Assert Schedule Entity wrong with invalid academicPeriod', () => {
    expect(() => {
      new Schedule({
        scheduleId: '2S-4CM-D5@2024(SCS)',
        courseName: 'Compute Engineering',
        groupNumber: 1,
        userId: -1,
        academicPeriod: 'FIRST SEMESTER' as ACADEMIC_PERIOD,
        courseGrade: 4,
      })
    }).toThrowError(EntityError)
  })

  it('Assert Schedule Entity wrong with invalid userId', () => {
    expect(() => {
      new Schedule({
        scheduleId: '2S-4CM-D5@2024(SCS)',
        courseName: 'Compute Engineering',
        groupNumber: 1,
        userId: -1,
        academicPeriod: ACADEMIC_PERIOD.ANNUAL,
        courseGrade: 0,
      })
    }).toThrowError(EntityError)
    expect(() => {
      new Schedule({
        scheduleId: '2S-4CM-D5@2024(SCS)',
        courseName: 'Compute Engineering',
        groupNumber: 1,
        userId: -1,
        academicPeriod: ACADEMIC_PERIOD.ANNUAL,
        courseGrade: 7,
      })
    }).toThrowError(EntityError)
  })
  it('Assert Schedule Entity wrong with scheduleId refeering to different courseId', () => {
    expect(() => {
      new Schedule({
        scheduleId: '2S-4CM-D5@2024(SCS)',
        courseName: 'Compute Engineering',
        groupNumber: 1,
        userId: -1,
        academicPeriod: ACADEMIC_PERIOD.ANNUAL,
        courseGrade: 1,
      })
    }).toThrowError(EntityError)
    expect(() => {
      new Schedule({
        scheduleId: '2S-2CIC-D5@2024(SCS)',
        courseName: 'Compute Engineering',
        groupNumber: 1,
        userId: -1,
        academicPeriod: ACADEMIC_PERIOD.ANNUAL,
        courseGrade: 3,
      })
    }).toThrowError(EntityError)
    expect(() => {
      new Schedule({
        scheduleId: '2S-6SI-D5@2024(SCS)',
        courseName: 'Compute Engineering',
        groupNumber: 1,
        userId: -1,
        academicPeriod: ACADEMIC_PERIOD.ANNUAL,
        courseGrade: 2,
      })
    }).toThrowError(EntityError)
  })

})
