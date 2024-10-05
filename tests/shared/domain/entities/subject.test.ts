import { describe, it, expect } from 'vitest'
import { Subject } from '../../../../src/shared/domain/entities/subject'
import { PERIOD } from '../../../../src/shared/domain/enums/period_enum'
import { EntityError } from '../../../../src/shared/helpers/errors/domain_errors'

describe('Subject Entity Tests', () => {
  it('Assert Subject Entity is correct at all', () => {
    const subject = new Subject({
      code: 'MAT123',
      name: 'Matemática',
      period: PERIOD.MORNING,
    })

    expect(subject).toBeInstanceOf(Subject)
  })

  it('Assert Subject Entity has an error when code is invalid', () => {
    expect(() => {
      new Subject({
        code: 'MAT',
        name: 'Matemática',
        period: PERIOD.AFTERNOON,
      })
    }).toThrowError(EntityError)
    expect(() => {
      new Subject({
        code: 'MAT',
        name: 'Matemática',
        period: PERIOD.AFTERNOON,
      })
    }).toThrowError('Field props.code is not valid')
  })

  it('Assert Subject Entity has an error when name is invalid', () => {
    expect(() => {
      new Subject({
        code: 'MAT123',
        name: '',
        period: PERIOD.MORNING,
      })
    }).toThrowError(EntityError)
    expect(() => {
      new Subject({
        code: 'MAT123',
        name: '',
        period: PERIOD.MORNING,
      })
    }).toThrowError('Field props.name is not valid')
  })

  it('Assert Subject Entity has an error when period is invalid', () => {
    expect(() => {
      new Subject({
        code: 'MAT123',
        name: 'Matemática',
      })
    }).toThrowError(EntityError)
  })
})
