import { describe, it, expect } from 'vitest'

import { UploadCSVUsecase } from '../../../../src/modules/upload_csv/app/upload_csv_usecase'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'

describe('Assert Upload CSV usecase is correct at all', () => {
  it('Should activate usecase correctly', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UploadCSVUsecase(
      repo
    )

    const csvContent = `type,classId,name,classModality,classType,subjectCode,subjectPeriod,roomCode,professorEmail,professorRa,professorPassword
professor,,Dr. John Doe,,,,,,john.doe@example.com,12345,S!q3T@pG9z
subject,,Data Structures,,,CSE103,EVENING,,,,
class,123e4567-e89b-12d3-a456-426614174003,Class 101,HYBRID,THEORY,CSE104,,A01,,,
professor,,Dr. Jane Smith,,,,,,jane.smith@example.com,54321,Y@uP!zG6rX
subject,,Algorithms,,,CSE203,AFTERNOON,,,,
class,123e4567-e89b-12d3-a456-426614174007,Class 202,REMOTE,LAB,CSE204,,,,,`
    const csvBuffer: Buffer = Buffer.from(csvContent, 'utf-8')

    const lenghtUserBefore = repo.getUsersLength()
    const lenghtClassBefore = repo.getClassesLength()
    const lenghtSubjectBefore = repo.getSubjectsLength()

    await usecase.execute(csvBuffer)

    const lenghtUserAfter = repo.getUsersLength()
    const lenghtClassAfter = repo.getClassesLength()
    const lenghtSubjectAfter = repo.getSubjectsLength()

    expect(lenghtUserAfter).toEqual(lenghtUserBefore + 2)
    expect(lenghtClassAfter).toEqual(lenghtClassBefore + 2)
    expect(lenghtSubjectAfter).toEqual(lenghtSubjectBefore + 2)
  })

  it('Should raise error for invalid professor row', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UploadCSVUsecase(
      repo
    )
    const lenghtUserBefore = repo.getUsersLength()
    const lenghtClassBefore = repo.getClassesLength()
    const lenghtSubjectBefore = repo.getSubjectsLength()

    const csvContent = `type,classId,name,classModality,classType,subjectCode,subjectPeriod,roomCode,professorEmail,professorRa,professorPassword
professor,,Dr. John Doe,,,,,,john.doe_a_example.com,12345,S!q3T@pG9z
subject,,Data Structures,,,CSE103,EVENING,,,,
class,123e4567-e89b-12d3-a456-426614174003,Class 101,HYBRID,THEORY,CSE104,,A01,,,
professor,,Dr. Jane Smith,,,,,,jane.smith@example.com,54321,Y@uP!zG6rX
subject,,Algorithms,,,CSE203,AFTERNOON,,,,
class,123e4567-e89b-12d3-a456-426614174007,Class 202,REMOTE,LAB,CSE204,,,,,`

    const csvBuffer: Buffer = Buffer.from(csvContent, 'utf-8')
    await expect(usecase.execute(csvBuffer)).rejects.toThrowError(
      'CSV file with invalid format',
    )

    const lenghtUserAfter = repo.getUsersLength()
    const lenghtClassAfter = repo.getClassesLength()
    const lenghtSubjectAfter = repo.getSubjectsLength()

    expect(lenghtUserAfter).toEqual(lenghtUserBefore)
    expect(lenghtClassAfter).toEqual(lenghtClassBefore)
    expect(lenghtSubjectAfter).toEqual(lenghtSubjectBefore)
  })

  it('Should raise error for invalid class row', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UploadCSVUsecase(
      repo
    )

    const lenghtUserBefore = repo.getUsersLength()
    const lenghtClassBefore = repo.getClassesLength()
    const lenghtSubjectBefore = repo.getSubjectsLength()

    const csvContent = `type,classId,name,classModality,classType,subjectCode,subjectPeriod,roomCode,professorEmail,professorRa,professorPassword
professor,,Dr. John Doe,,,,,,john.doe@example.com,12345,S!q3T@pG9z
subject,,Data Structures,,,CSE103,EVENING,,,,
class,123e4567-e89b-12d3-a456-42661417003,Class 101,HYBRID,THEORY,CSE104,,A01,,,
professor,,Dr. Jane Smith,,,,,,jane.smith@example.com,54321,Y@uP!zG6rX
subject,,Algorithms,,,CSE203,AFTERNOON,,,,
class,123e4567-e89b-12d3-a456-426614174007,Class 202,REMOTE,LAB,CSE204,,,,,`

    const csvBuffer: Buffer = Buffer.from(csvContent, 'utf-8')
    await expect(usecase.execute(csvBuffer)).rejects.toThrowError(
      'CSV file with invalid format',
    )

    const lenghtUserAfter = repo.getUsersLength()
    const lenghtClassAfter = repo.getClassesLength()
    const lenghtSubjectAfter = repo.getSubjectsLength()

    expect(lenghtUserAfter).toEqual(lenghtUserBefore)
    expect(lenghtClassAfter).toEqual(lenghtClassBefore)
    expect(lenghtSubjectAfter).toEqual(lenghtSubjectBefore)
  })

  it('Should raise error for invalid subject row', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UploadCSVUsecase(
      repo
    )
    const lenghtUserBefore = repo.getUsersLength()
    const lenghtClassBefore = repo.getClassesLength()
    const lenghtSubjectBefore = repo.getSubjectsLength()

    const csvContent = `type,classId,name,classModality,classType,subjectCode,subjectPeriod,roomCode,professorEmail,professorRa,professorPassword
professor,,Dr. John Doe,,,,,,john.doe@example.com,12345,S!q3T@pG9z
subject,,Data Structures,,,CSE103,EVENING,,,,
class,123e4567-e89b-12d3-a456-426614174003,Class 101,HYBRID,THEORY,CSE104,,A01,,,
professor,,Dr. Jane Smith,,,,,,jane.smith@example.com,54321,Y@uP!zG6rX
subject,,Algorithms,,,CSEABC,AFTERNOON,,,,
class,123e4567-e89b-12d3-a456-426614174007,Class 202,REMOTE,LAB,CSE204,,,,,`

    const csvBuffer: Buffer = Buffer.from(csvContent, 'utf-8')
    await expect(usecase.execute(csvBuffer)).rejects.toThrowError(
      'CSV file with invalid format',
    )

    const lenghtUserAfter = repo.getUsersLength()
    const lenghtClassAfter = repo.getClassesLength()
    const lenghtSubjectAfter = repo.getSubjectsLength()

    expect(lenghtUserAfter).toEqual(lenghtUserBefore)
    expect(lenghtClassAfter).toEqual(lenghtClassBefore)
    expect(lenghtSubjectAfter).toEqual(lenghtSubjectBefore)
  })

  it('Should raise error for invalid row type', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UploadCSVUsecase(
      repo
    )

    const lenghtUserBefore = repo.getUsersLength()
    const lenghtClassBefore = repo.getClassesLength()
    const lenghtSubjectBefore = repo.getSubjectsLength() // Eh o Brancas

    const csvContent = `type,classId,name,classModality,classType,subjectCode,subjectPeriod,roomCode,professorEmail,professorRa,professorPassword
professor,,Dr. John Doe,,,,,,john.doe@example.com,12345,S!q3T@pG9z
subject,,Data Structures,,,CSE103,EVENING,,,,
class,123e4567-e89b-12d3-a456-426614174003,Class 101,HYBRID,THEORY,CSE104,,A01,,,
professor,,Dr. Jane Smith,,,,,,jane.smith@example.com,54321,Y@uP!zG6rX
subject,,Algorithms,,,CSE203,AFTERNOON,,,,
room,123e4567-e89b-12d3-a456-426614174007,Class 202,REMOTE,LAB,CSE204,,,,,`

    const csvBuffer: Buffer = Buffer.from(csvContent, 'utf-8')
    await expect(usecase.execute(csvBuffer)).rejects.toThrowError(
      'CSV file with invalid row type: room at row 5',
    )

    const lenghtUserAfter = repo.getUsersLength()
    const lenghtClassAfter = repo.getClassesLength()
    const lenghtSubjectAfter = repo.getSubjectsLength()

    expect(lenghtUserAfter).toEqual(lenghtUserBefore)
    expect(lenghtClassAfter).toEqual(lenghtClassBefore)
    expect(lenghtSubjectAfter).toEqual(lenghtSubjectBefore)
  })
})
