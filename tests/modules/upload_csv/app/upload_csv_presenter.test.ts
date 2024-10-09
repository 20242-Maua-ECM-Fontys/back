import { describe, it, expect } from 'vitest'
import { UploadCSVPresenter } from '../../../../src/modules/upload_csv/app/upload_csv_presenter'
import { HttpRequest } from '../../../../src/shared/helpers/external_interfaces/http_models'

describe('Tests for Upload CSV Presenter', () => {
  it('Should call presenter and return status 200', async () => {
    const csvContent = `type,classId,name,classModality,classType,subjectCode,subjectPeriod,roomBlock,roomNumber,roomCapacity,professorEmail,professorRa,professorPassword
professor,123e4567-e89b-12d3-a456-426614174000,Dr. John Doe,IN_PERSON,THEORY,CSE101,MORNING,A,101,30,john.doe@example.com,12345,S!q3T@pG9z
room,123e4567-e89b-12d3-a456-426614174001,Room A101,IN_PERSON,LAB,CSE102,AFTERNOON,B,102,40,placeholder@example.com,00000,PlaceholderPass123!
subject,123e4567-e89b-12d3-a456-426614174002,Data Structures,REMOTE,PRACTICE,CSE103,EVENING,C,103,35,placeholder@example.com,00000,PlaceholderPass123!
class,123e4567-e89b-12d3-a456-426614174003,Class 101,HYBRID,THEORY,CSE104,MORNING,D,104,25,placeholder@example.com,00000,PlaceholderPass123!
professor,123e4567-e89b-12d3-a456-426614174004,Dr. Jane Smith,REMOTE,LAB,CSE201,AFTERNOON,E,105,20,jane.smith@example.com,54321,Y@uP!zG6rX
room,123e4567-e89b-12d3-a456-426614174005,Room B202,HYBRID,PRACTICE,CSE202,MORNING,F,106,50,placeholder@example.com,00000,PlaceholderPass123!
subject,123e4567-e89b-12d3-a456-426614174006,Algorithms,IN_PERSON,THEORY,CSE203,AFTERNOON,G,107,45,placeholder@example.com,00000,PlaceholderPass123!
class,123e4567-e89b-12d3-a456-426614174007,Class 202,REMOTE,LAB,CSE204,EVENING,H,108,15,placeholder@example.com,00000,PlaceholderPass123!`

    const csvBuffer: Buffer = Buffer.from(csvContent, 'utf-8')

    const csvFile = {
      buffer: csvBuffer,
    }

    const event = new HttpRequest(
      undefined,
      undefined,
      {},
      csvFile as unknown as Express.Multer.File,
    )

    const response = await UploadCSVPresenter(event)

    console.log(response.body)

    expect(response?.statusCode).toEqual(200)
  })
})
