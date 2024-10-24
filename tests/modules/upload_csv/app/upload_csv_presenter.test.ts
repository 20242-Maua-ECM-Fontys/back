import { describe, it, expect } from 'vitest'
import { UploadCSVPresenter } from '../../../../src/modules/upload_csv/app/upload_csv_presenter'
import { HttpRequest } from '../../../../src/shared/helpers/external_interfaces/http_models'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'

describe('Tests for Upload CSV Presenter', () => {
  it('Should call presenter and return status 200', async () => {
    const repo = new ScheduleRepositoryMock()
    const csvContent = `type,name,classModality,classType,subjectCode,subjectPeriod,roomCode,professorEmail,professorRa,professorPassword,roomCode,scheduleId,courseName,coordEmail,academicPeriod
schedule,,,,,,,,,,,2S-4CM-D5@2023(SCS),Computer Science,user2@gmail.com,ANNUAL
professor,Dr. John Doe,,,,,,john.doe@example.com,12345,S!q3T@pG9z,,
subject,Data Structures,,,CSE103,EVENING,,,,,,
class,Class 101,HYBRID,THEORY,CSE104,,A01,,,,,2S-4CM-D5@2024(SCS)
professor,Dr. Jane Smith,,,,,,jane.smith@example.com,54321,Y@uP!zG6rX,,
subject,Algorithms,,,CSE203,AFTERNOON,,,,,,
class,Class 202,REMOTE,LAB,CSE204,,A02,,,,,2S-4CM-D5@2024(SCS)`

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

    const response = await UploadCSVPresenter(event, repo)

    expect(response?.statusCode).toEqual(200)
  })
})
