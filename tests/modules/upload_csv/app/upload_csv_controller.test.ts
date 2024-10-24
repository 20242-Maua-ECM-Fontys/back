import { describe, it, expect } from 'vitest'
import { UploadCSVController } from '../../../../src/modules/upload_csv/app/upload_csv_controller'
import { UploadCSVUsecase } from '../../../../src/modules/upload_csv/app/upload_csv_usecase'
import { HttpRequest } from '../../../../src/shared/helpers/external_interfaces/http_models'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'

describe('Assert Upload CSV controller is correct at all', () => {
  it('Should activate usecase correctly', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UploadCSVUsecase(repo)

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
