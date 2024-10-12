import { describe, it, expect } from 'vitest'
import { Subject } from '../../../../src/shared/domain/entities/subject'
import { SubjectRepositoryMock } from '../../../../src/shared/infra/repositories/subject_repository_mock'
import { PERIOD } from '../../../../src/shared/domain/enums/period_enum'

describe('Assert Subject Repository Mock is correct at all', () => {
  it('Should get length correctly', async () => {
    const repo = new SubjectRepositoryMock()
    const length = repo.getLength()

    expect(length).toEqual(2)
  })
  it('Should get subject correctly', async () => {
    const repo = new SubjectRepositoryMock()
    const subject = await repo.getSubject("ECM256")

    expect(subject?.code).toEqual("ECM256")
    expect(subject?.name).toEqual('Programming Languages II')
    expect(subject?.period).toEqual(PERIOD.MORNING)
  })
  it('Should get all subjects correctly', async () => {
    const repo = new SubjectRepositoryMock()
    const subjects = await repo.getAllSubjects()

    expect(subjects.length).toEqual(2)
  })
  it('Should create subject correctly', async () => {
    const subject = new Subject({
      code: 'EFB803',
      name: 'Statistics',
      period: PERIOD.AFTERNOON,
    })

    const repo = new SubjectRepositoryMock()
    const lastLength = repo.getLength()
    await repo.createSubject(subject)
    const newLength = repo.getLength()

    expect(newLength).toEqual(lastLength + 1)
  })
})