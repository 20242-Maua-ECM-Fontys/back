import { describe, it, expect } from 'vitest'
import { Suitability } from '../../../../src/shared/domain/entities/suitability'
import { EntityError } from '../../../../src/shared/helpers/errors/domain_errors'

describe('Suitability Entity Tests', () => {
  it('Assert Suitability Entity is correct at all', () => {
    const subject = new Suitability({
      userId: 1,
      codeSubject: 'ECM256',
    })

    expect(subject).toBeInstanceOf(Suitability)
  })

  it('Assert Suitability Entity has an error when userId is invalid', () => {
    expect(() => {
      new Suitability({
        userId: -1,
        codeSubject: 'ECM256',
      })
    }).toThrowError(EntityError)
  })

  it('Assert Suitability Entity has an error when codeSubject is invalid', () => {
    expect(() => {
      new Suitability({
        userId: -1,
        codeSubject: 'ECMABC',
      })
    }).toThrowError(EntityError)
  })
})
