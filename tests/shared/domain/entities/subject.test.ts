import { describe, it, expect } from 'vitest'
import { Subject } from '../../../../src/shared/domain/entities/subject'
import { PERIOD } from '../../../../src/shared/domain/enums/period_enum'
import { EntityError } from '../../../../src/shared/helpers/errors/domain_errors'

describe('Subject Entity Tests', () => {
  it('Assert Subject Entity is correct at all', () => {
    const subject = new Subject({
      code: 'ECM256',
      name: 'Linguagens de Programacao II',
      period: PERIOD.MORNING,
    })

    expect(subject).toBeInstanceOf(Subject)
  })

  it('Assert Subject Entity has an error when code is invalid', () => {
    expect(() => {
      new Subject({
        code: 'ECM',
        name: 'Linguagens de Programacao II',
        period: PERIOD.AFTERNOON,
      })
    }).toThrowError(EntityError)
  })

  it('Assert Subject Entity has an error when name is invalid', () => {
    expect(() => {
      new Subject({
        code: 'ECM256',
        name: '',
        period: PERIOD.MORNING,
      })
    }).toThrowError(EntityError)
  })
})
