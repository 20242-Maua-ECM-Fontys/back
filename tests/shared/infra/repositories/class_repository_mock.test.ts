import { describe, it, expect } from 'vitest'
import { Class } from '../../../../src/shared/domain/entities/class'
import { ClassRepositoryMock } from '../../../../src/shared/infra/repositories/class_repository_mock'
import { MODALITY } from '../../../../src/shared/domain/enums/modality_enum'
import { CLASSTYPE } from '../../../../src/shared/domain/enums/class_type_enum'

describe('Assert Class Repository Mock is correct at all', () => {
  it('Should get length correctly', async () => {
    const repo = new ClassRepositoryMock()
    const length = repo.getLength()

    expect(length).toEqual(4)
  })
  it('Should get class correctly', async () => {
    const repo = new ClassRepositoryMock()
    const selectedClass = await repo.getClass("0a8c5357-1f07-5b24-9845-9318c47ac922")

    expect(selectedClass.id).toBe('0a8c5357-1f07-5b24-9845-9318c47ac922')
    expect(selectedClass.name).toBe('Physics I')
    expect(selectedClass.modality).toBe(MODALITY.REMOTE)
    expect(selectedClass.classType).toBe(CLASSTYPE.THEORY)
    expect(selectedClass.subjectCode).toBe('EFB207')
  })
  it('Should get all classes correctly', async () => {
    const repo = new ClassRepositoryMock()
    const classes = await repo.getAllClasss()

    expect(classes.length).toEqual(4)
  })
  it('Should create class correctly', async () => {
    const classEntity = new Class({
      id: '0a8c5357-1f07-5b24-9845-9318c47ab929',
      name: 'Programming Language II',
      modality: MODALITY.REMOTE,
      classType: CLASSTYPE.THEORY,
      subjectCode: 'ECM256',
    })

    const repo = new ClassRepositoryMock()
    const lastLength = repo.getLength()
    await repo.createClass(classEntity)
    const newLength = repo.getLength()

    expect(newLength).toEqual(lastLength + 1)
  })
})