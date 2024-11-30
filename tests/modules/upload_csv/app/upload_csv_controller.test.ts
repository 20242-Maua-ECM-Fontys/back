import { describe, it, expect } from 'vitest'
import { UploadCSVController } from '../../../../src/modules/upload_csv/app/upload_csv_controller'
import { UploadCSVUsecase } from '../../../../src/modules/upload_csv/app/upload_csv_usecase'
import { HttpRequest } from '../../../../src/shared/helpers/external_interfaces/http_models'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'

describe('Assert Upload CSV controller is correct at all', () => {
  it('Should activate usecase correctly', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UploadCSVUsecase(repo)

    const csvContent = `type,name,classModality,classType,subjectCode,subjectPeriod,roomCode,professorEmail,professorRa,roomCode,scheduleId,courseName,coordEmail,academicPeriod
schedule,,,,,,,,,,2S-4CM-D5@2023(SCS),Computer Science,jane.smith@example.com,ANNUAL
professor,Dr. John Doe,,,,,,john.doe@example.com,12345,,,,,
subject,Data Structures,,,CSE103,EVENING,,,,,,,,
class,Class 101,HYBRID,THEORY,CSE104,,A01,,,,2S-4CM-D5@2024(SCS),,,
subject,Algorithms,,,CSE203,AFTERNOON,,,,,,,,
class,Class 202,REMOTE,LAB,CSE204,,A02,,,,2S-4CM-D5@2024(SCS),,,
coordinator,Dr. Jane Smith,,,,,,jane.smith@example.com,54321,,,,,`

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

  it('Should activate usecase wrongly: data is missing', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UploadCSVUsecase(repo)
    const controller = new UploadCSVController(usecase)
    const httpRequest = new HttpRequest(
      undefined,
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual('Field data is missing')
  })
  it('Should activate usecase wrongly: wrong type of data', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UploadCSVUsecase(repo)


    const controller = new UploadCSVController(usecase)
    const httpRequest = new HttpRequest(
      undefined,
      undefined,
      {},
      123 as File,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual("Field data isn't in the right type.\n Received: number.\n Expected to be a csv.")
  })
  it('Should activate usecase wrongly: invalid row type', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UploadCSVUsecase(repo)

    const csvContent = `type,name,classModality,classType,subjectCode,subjectPeriod,roomCode,professorEmail,professorRa,roomCode,scheduleId,courseName,coordEmail,academicPeriod
schedule,,,,,,,,,,2S-4CM-D5@2023(SCS),Computer Science,udibon@tisim.sy,ANNUAL
professor,Dr. John Doe,,,,,,john.doe@example.com,12345,,,,,
subject,Data Structures,,,CSE103,EVENING,,,,,,,,
class,Class 101,HYBRID,THEORY,CSE104,,A01,,,,2S-4CM-D5@2024(SCS),,,
subject,Algorithms,,,CSE203,AFTERNOON,,,,,,,,
class,Class 202,REMOTE,LAB,CSE204,,A02,,,,2S-4CM-D5@2024(SCS),,,
room,Dr. Jane Smith,,,,,,jane.smith@example.com,54321,,,,,`

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
    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual('CSV file with invalid row type: room at row 6')
  })
  it('Should activate usecase wrongly: invalid scheduleId', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UploadCSVUsecase(repo)

    const csvContent = `type,name,classModality,classType,subjectCode,subjectPeriod,roomCode,professorEmail,professorRa,roomCode,scheduleId,courseName,coordEmail,academicPeriod
schedule,,,,,,,,,,2S-CS),Computer Science,john.doe@example.com,ANNUAL
professor,Dr. John Doe,,,,,,john.doe@example.com,12345,,,,,
subject,Data Structures,,,CSE103,EVENING,,,,,,,,
class,Class 101,HYBRID,THEORY,CSE104,,A01,,,,2S-4CM-D5@2024(SCS),,,
subject,Algorithms,,,CSE203,AFTERNOON,,,,,,,,
class,Class 202,REMOTE,LAB,CSE204,,A02,,,,2S-4CM-D5@2024(SCS),,,
coordinator,Dr. Jane Smith,,,,,,jane.smith@example.com,54321,,,,,`

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
    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual('Field scheduleId is not valid')
  })
  it('Should activate usecase wrongly: assign non coordinator into schedule', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UploadCSVUsecase(repo)

    const csvContent = `type,name,classModality,classType,subjectCode,subjectPeriod,roomCode,professorEmail,professorRa,roomCode,scheduleId,courseName,coordEmail,academicPeriod
schedule,,,,,,,,,,2S-4CM-D5@2023(SCS),Computer Science,john.doe@example.com,ANNUAL
professor,Dr. John Doe,,,,,,john.doe@example.com,12345,,,,,
subject,Data Structures,,,CSE103,EVENING,,,,,,,,
class,Class 101,HYBRID,THEORY,CSE104,,A01,,,,2S-4CM-D5@2024(SCS),,,
subject,Algorithms,,,CSE203,AFTERNOON,,,,,,,,
class,Class 202,REMOTE,LAB,CSE204,,A02,,,,2S-4CM-D5@2024(SCS),,,
coordinator,Dr. Jane Smith,,,,,,jane.smith@example.com,54321,,,,,`

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
    expect(response?.statusCode).toEqual(403)
    expect(response?.body).toEqual('The data rule "user must be a coordinator" was violated')
  })
  it('Should activate usecase wrongly: invalid class row', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UploadCSVUsecase(repo)

    const csvContent = `type,name,classModality,classType,subjectCode,subjectPeriod,roomCode,professorEmail,professorRa,roomCode,scheduleId,courseName,coordEmail,academicPeriod
schedule,,,,,,,,,,2S-4CM-D5@2023(SCS),Computer Science,udibon@tisim.sy,ANNUAL
professor,Dr. John Doe,,,,,,john.doe@example.com,12345,,,,,
subject,Data Structures,,,CSE103,EVENING,,,,,,,,
class,Class 101,HYBRID,THEORY,C,,A01,,,,2S-4CM-D5@2024(SCS),,,
subject,Algorithms,,,CSE203,AFTERNOON,,,,,,,,
class,Class 202,REMOTE,LAB,CSE204,,A02,,,,2S-4CM-D5@2024(SCS),,,
coordinator,Dr. Jane Smith,,,,,,jane.smith@example.com,54321,,,,,`

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
    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual('CSV file with invalid format: Field props.subjectCode is not valid')
  })
  it('Should activate usecase wrongly: not found coordinator email', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UploadCSVUsecase(repo)

    const csvContent = `type,name,classModality,classType,subjectCode,subjectPeriod,roomCode,professorEmail,professorRa,roomCode,scheduleId,courseName,coordEmail,academicPeriod
schedule,,,,,,,,,,2S-CS),Computer Science,john.doe@e.com,ANNUAL
professor,Dr. John Doe,,,,,,john.doe@example.com,12345,,,,,
subject,Data Structures,,,CSE103,EVENING,,,,,,,,
class,Class 101,HYBRID,THEORY,CSE104,,A01,,,,2S-4CM-D5@2024(SCS),,,
subject,Algorithms,,,CSE203,AFTERNOON,,,,,,,,
class,Class 202,REMOTE,LAB,CSE204,,A02,,,,2S-4CM-D5@2024(SCS),,,
coordinator,Dr. Jane Smith,,,,,,jane.smith@example.com,54321,,,,,`

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
    expect(response?.statusCode).toEqual(404)
    expect(response?.body).toEqual('No items found for email')
  })
  
})
