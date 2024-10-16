import { describe, it, expect } from 'vitest'
import { Class } from '../../../../src/shared/domain/entities/class'
import { EntityError } from '../../../../src/shared/helpers/errors/domain_errors'
import { MODALITY } from '../../../../src/shared/domain/enums/modality_enum'
import { CLASSTYPE } from '../../../../src/shared/domain/enums/class_type_enum'

describe('Class Entity Tests', () => {
  it('Assert Class Entity is correct at all', () => {
    const classEntity = new Class({
      id: '0a8c5357-1f07-5b24-9845-9318c47ab923',
      name: 'Programming Language II',
      modality: MODALITY.IN_PERSON,
      classType: CLASSTYPE.THEORY,
      subjectCode: 'ECM256',
      scheduleId: '2S-4CM-D5@2024(SCS)',
    })
    
    expect(classEntity).toBeInstanceOf(Class)
    expect(classEntity.id).toBe('0a8c5357-1f07-5b24-9845-9318c47ab923')
    expect(classEntity.name).toBe('Programming Language II')
    expect(classEntity.modality).toBe(MODALITY.IN_PERSON)
    expect(classEntity.classType).toBe(CLASSTYPE.THEORY)
    expect(classEntity.subjectCode).toBe('ECM256')
    expect(classEntity.roomCode).toBeUndefined()
  })
  
  it('Assert Class Entity is correct at all with roomCode', () => {
    const classEntity = new Class({
      id: '0a8c5357-1f07-5b24-9845-9318c47ab923',
      name: 'Programming Language II',
      modality: MODALITY.IN_PERSON,
      classType: CLASSTYPE.THEORY,
      subjectCode: 'ECM256',
      roomCode: 'A01',
      scheduleId: '2S-4CM-D5@2024(SCS)',
    })
    
    expect(classEntity).toBeInstanceOf(Class)
    expect(classEntity.id).toBe('0a8c5357-1f07-5b24-9845-9318c47ab923')
    expect(classEntity.name).toBe('Programming Language II')
    expect(classEntity.modality).toBe(MODALITY.IN_PERSON)
    expect(classEntity.classType).toBe(CLASSTYPE.THEORY)
    expect(classEntity.subjectCode).toBe('ECM256')
    expect(classEntity.roomCode).toBe('A01')
  })

  it('id must be UUID', () => {
    expect(() => {
      new Class({
        id: 'EE4',
        name: 'Programming Language II',
        modality: MODALITY.IN_PERSON,
        classType: CLASSTYPE.THEORY,
        subjectCode: 'ECM256',
        scheduleId: '2S-4CM-D5@2024(SCS)',
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
        subjectCode: 'ECM256',
        scheduleId: '2S-4CM-D5@2024(SCS)',
      })
    }).toThrowError(EntityError)
  })

  it('Assert Class Entity has an error when modality is invalid', () => {
    expect(() => {
      new Class({
        id: '0a8c5357-1f07-5b24-9845-9318c47ab923',
        name: 'Programming Language II',
        modality: 'PRESENCIAL',
        classType: CLASSTYPE.THEORY,
        subjectCode: 'ECM256',
        scheduleId: '2S-4CM-D5@2024(SCS)',
      })
    }).toThrowError(EntityError)
  })

  it('Assert Class Entity has an error when classType is invalid', () => {
    expect(() => {
      new Class({
        id: 'E4',
        name: 'Programming Language II',
        modality: MODALITY.IN_PERSON,
        classType: 'TEORIA',
        subjectCode: 'ECM256',
        scheduleId: '2S-4CM-D5@2024(SCS)',
      })
    }).toThrowError(EntityError)
  })

  it('Assert Class Entity has an error when subjectCode is invalid', () => {
    expect(() => {
      new Class({
        id: 'E4',
        name: 'Programming Language II',
        modality: MODALITY.IN_PERSON,
        classType: CLASSTYPE.THEORY,
        subjectCode: 'ECM',
        scheduleId: '2S-4CM-D5@2024(SCS)',
      })
    }).toThrowError(EntityError)
  })

  it('Assert Class Entity has an error when scheduleId is invalid', () => {
    expect(() => {
      new Class({
        id: 'E4',
        name: 'Programming Language II',
        modality: MODALITY.IN_PERSON,
        classType: CLASSTYPE.THEORY,
        subjectCode: 'ECM',
        scheduleId: '52',
      })
    }).toThrowError(EntityError)
  })
})
