import { describe, it, expect } from 'vitest'
import { Class } from '../../../../src/shared/domain/entities/class'
import { EntityError } from '../../../../src/shared/helpers/errors/domain_errors'
import { MODALITY } from '../../../../src/shared/domain/enums/modality_enum'
import { CLASSTYPE } from '../../../../src/shared/domain/enums/class_type_enum'

describe('Class Entity Tests', () => {
  it('Assert Class Entity is correct at all', () => {
    const classEntity = new Class({
      id: '0a8c5357-1f07-5b24-9845-9318c47ab923',
      name: 'Linguagens de Programacao II',
      modality: MODALITY.IN_PERSON,
      classType: CLASSTYPE.THEORY,
    })

    expect(classEntity).toBeInstanceOf(Class)
    expect(classEntity.id).toBe('0a8c5357-1f07-5b24-9845-9318c47ab923')
    expect(classEntity.name).toBe('Linguagens de Programacao II')
    expect(classEntity.modality).toBe(MODALITY.IN_PERSON)
    expect(classEntity.classType).toBe(CLASSTYPE.THEORY)
  })

  it('id must be UUID', () => {
    expect(() => {
      new Class({
        id: 'EE4',
        name: 'Linguagens de Programacao II',
        modality: MODALITY.IN_PERSON,
        classType: CLASSTYPE.THEORY,
      })
    }).toThrowError(EntityError)
  })

  it('Assert Class Entity has an error when name is invalid', () => {
    expect(() => {
      new Class({
        id: '0a8c5357-1f07-5b24-9845-9318c47ab923',
        name: '',
        modality: MODALITY.IN_PERSON,
        classType: CLASSTYPE.THEORY,
      })
    }).toThrowError(EntityError)
  })

  it('Assert Class Entity has an error when modality is invalid', () => {
    expect(() => {
      new Class({
        id: '0a8c5357-1f07-5b24-9845-9318c47ab923',
        name: 'Linguagens de Programacao II',
        modality: 'PRESENCIAL',
        classType: CLASSTYPE.THEORY,
      })
    }).toThrowError(EntityError)
  })

  it('Assert Class Entity has an error when classType is invalid', () => {
    expect(() => {
      new Class({
        id: 'E4',
        name: 'Linguagens de Programacao II',
        modality: MODALITY.IN_PERSON,
        classType: 'TEORIA',
      })
    }).toThrowError(EntityError)
  })
})
