import { describe, it, expect } from 'vitest'
import { UserRepositoryMock } from '../../../../src/shared/infra/repositories/user_repository_mock'
import { RoomRepositoryMock } from '../../../../src/shared/infra/repositories/room_repository_mock'
import { SubjectRepositoryMock } from '../../../../src/shared/infra/repositories/subject_repository_mock'
import { ClassRepositoryMock } from '../../../../src/shared/infra/repositories/class_repository_mock'
import { UploadCSVUsecase } from '../../../../src/modules/upload_csv/app/upload_csv_usecase'

describe('Assert Upload CSV usecase is correct at all', () => {
  it('Should activate usecase correctly', async () => {
    const userRepo = new UserRepositoryMock()
    const roomRepo = new RoomRepositoryMock()
    const classRepo = new ClassRepositoryMock()
    const subjectRepo = new SubjectRepositoryMock()
    const usecase = new UploadCSVUsecase(userRepo, roomRepo, subjectRepo, classRepo)

    const csvBuffer: Buffer = Buffer.from(`
    type,classId,name,classModality,classType,subjectCode,subjectPeriod,roomBlock,roomNumber,roomCapacity,professorEmail,professorRa,professorPassword
    professor,123e4567-e89b-12d3-a456-426614174000,Dr. John Doe,IN_PERSON,THEORY,CSE101,MORNING,A,101,30,john.doe@example.com,12345,S!q3T@pG9z
    room,123e4567-e89b-12d3-a456-426614174001,Room A101,IN_PERSON,LAB,CSE102,AFTERNOON,B,102,40,placeholder@example.com,00000,PlaceholderPass123!
    subject,123e4567-e89b-12d3-a456-426614174002,Data Structures,REMOTE,PRACTICE,CSE103,EVENING,C,103,35,placeholder@example.com,00000,PlaceholderPass123!
    class,123e4567-e89b-12d3-a456-426614174003,Class 101,HYBRID,THEORY,CSE104,MORNING,D,104,25,placeholder@example.com,00000,PlaceholderPass123!
    professor,123e4567-e89b-12d3-a456-426614174004,Dr. Jane Smith,REMOTE,LAB,CSE201,AFTERNOON,E,105,20,jane.smith@example.com,54321,Y@uP!zG6rX
    room,123e4567-e89b-12d3-a456-426614174005,Room B202,HYBRID,PRACTICE,CSE202,MORNING,F,106,50,placeholder@example.com,00000,PlaceholderPass123!
    subject,123e4567-e89b-12d3-a456-426614174006,Algorithms,IN_PERSON,THEORY,CSE203,AFTERNOON,G,107,45,placeholder@example.com,00000,PlaceholderPass123!
    class,123e4567-e89b-12d3-a456-426614174007,Class 202,REMOTE,LAB,CSE204,EVENING,H,108,15,placeholder@example.com,00000,PlaceholderPass123!
    `);

    const lenghtUserBefore = userRepo.getLength()
    const lenghtRoomBefore = roomRepo.getLength()
    const lenghtClassBefore = classRepo.getLength()
    const lenghtSubjectBefore = subjectRepo.getLength()

    await usecase.execute(csvBuffer)

    const lenghtUserAfter = userRepo.getLength()
    const lenghtRoomAfter = roomRepo.getLength()
    const lenghtClassAfter = classRepo.getLength()
    const lenghtSubjectAfter = subjectRepo.getLength()

    expect(lenghtUserAfter).toEqual(lenghtUserBefore + 2)
    expect(lenghtRoomAfter).toEqual(lenghtRoomBefore + 2)
    expect(lenghtClassAfter).toEqual(lenghtClassBefore + 2)
    expect(lenghtSubjectAfter).toEqual(lenghtSubjectBefore + 2)
  })
})