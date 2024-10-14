import { describe, it, expect } from 'vitest'
import { UserRepositoryMock } from '../../../../src/shared/infra/repositories/user_repository_mock'
import { RoomRepositoryMock } from '../../../../src/shared/infra/repositories/room_repository_mock'
import { SubjectRepositoryMock } from '../../../../src/shared/infra/repositories/subject_repository_mock'
import { ClassRepositoryMock } from '../../../../src/shared/infra/repositories/class_repository_mock'
import { UploadCSVController } from '../../../../src/modules/upload_csv/app/upload_csv_controller'
import { UploadCSVUsecase } from '../../../../src/modules/upload_csv/app/upload_csv_usecase'
import { Express } from 'express'
import { HttpRequest } from '../../../../src/shared/helpers/external_interfaces/http_models'

describe('Assert Upload CSV controller is correct at all', () => {
  it('Should activate usecase correctly', async () => {
    const userRepo = new UserRepositoryMock()
    const roomRepo = new RoomRepositoryMock()
    const classRepo = new ClassRepositoryMock()
    const subjectRepo = new SubjectRepositoryMock()
    const usecase = new UploadCSVUsecase(
      userRepo,
      roomRepo,
      subjectRepo,
      classRepo,
    )

    const csvContent = `type,classId,name,classModality,classType,subjectCode,subjectPeriod,roomBlock,roomNumber,roomCapacity,professorEmail,professorRa,professorPassword
professor,,Dr. John Doe,,,,,,,,john.doe@example.com,12345,S!q3T@pG9z
room,,,,,,,B,102,40,,,
subject,,Data Structures,,,CSE103,EVENING,,,,,,
class,123e4567-e89b-12d3-a456-426614174003,Class 101,HYBRID,THEORY,CSE104,,,,,,,
professor,,Dr. Jane Smith,,,,,,,,jane.smith@example.com,54321,Y@uP!zG6rX
room,,,,,,,F,106,50,,,
subject,,Algorithms,,,CSE203,AFTERNOON,,,,,,
class,123e4567-e89b-12d3-a456-426614174007,Class 202,REMOTE,LAB,CSE204,,,,,,,`

    const csvBuffer: Buffer = Buffer.from(csvContent, 'utf-8')

    const csvFile = {
      buffer: csvBuffer,
    }

    const controller = new UploadCSVController(usecase)
    const httpRequest = new HttpRequest(
      undefined,
      undefined,
      {},
      csvFile as unknown as Express.Multer.File,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(200)
    expect(response?.body.message).toEqual('the csv was uploaded successfully')
  })
})
