import { describe, it, expect } from 'vitest'
import { UploadCSVPresenter } from '../../../../src/modules/upload_csv/app/upload_csv_presenter'
import { HttpRequest } from '../../../../src/shared/helpers/external_interfaces/http_models'

describe('Tests for Upload CSV Presenter', () => {
  it('Should call presenter and return status 200', async () => {
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
