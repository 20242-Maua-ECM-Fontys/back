import { describe, it, expect } from 'vitest'
import { AvFullfilled } from '../../../../src/shared/domain/entities/avFullfilled'
import { Availability } from '../../../../src/shared/domain/entities/availability'
import { Possibility } from '../../../../src/shared/domain/entities/possibility'
import { Class } from '../../../../src/shared/domain/entities/class'
import { EntityError } from '../../../../src/shared/helpers/errors/domain_errors'

describe('AvFullfilled entity', () => {
  it('should create an AvFullfilled entity', () => {
    const avFullfilled = new AvFullfilled({
      availabilityId: '0a8c5357-1f07-5b24-9845-9318c4000000',
      possibilityId: '0a8c5357-1f07-5b24-9845-9318c4000001',
      classId: '0a8c5357-1f07-5b24-9845-9318c4000002',
    })

    expect(avFullfilled).toBeDefined()
    expect(avFullfilled.props.availabilityId).toBe('0a8c5357-1f07-5b24-9845-9318c4000000')
    expect(avFullfilled.props.possibilityId).toBe('0a8c5357-1f07-5b24-9845-9318c4000001')
    expect(avFullfilled.props.classId).toBe('0a8c5357-1f07-5b24-9845-9318c4000002')
  })

  it('should throw an error if availabilityId is invalid', () => {
    expect(() => {
      new AvFullfilled({
        availabilityId: 'invalid-uuid',
        possibilityId: '0a8c5357-1f07-5b24-9845-9318c4000001',
        classId: '0a8c5357-1f07-5b24-9845-9318c4000002',
      })
    }).toThrowError(EntityError)
  })

  it('should throw an error if possibilityId is invalid', () => {
    expect(() => {
      new AvFullfilled({
        availabilityId: '0a8c5357-1f07-5b24-9845-9318c4000000',
        possibilityId: 'invalid-uuid',
        classId: '0a8c5357-1f07-5b24-9845-9318c4000002',
      })
    }).toThrowError(EntityError)
  })

  it('should throw an error if classId is invalid', () => {
    expect(() => {
      new AvFullfilled({
        availabilityId: '0a8c5357-1f07-5b24-9845-9318c4000000',
        possibilityId: '0a8c5357-1f07-5b24-9845-9318c4000001',
        classId: 'invalid-uuid',
      })
    }).toThrowError(EntityError)
  })
})
