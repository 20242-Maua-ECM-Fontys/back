import { describe, it, expect } from 'vitest'

import { UploadCSVUsecase } from '../../../../src/modules/upload_csv/app/upload_csv_usecase'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'

describe('Assert Upload CSV usecase is correct at all', () => {
  it('Should activate usecase correctly', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UploadCSVUsecase(repo)

    const csvContent = `type,name,classModality,classType,subjectCode,subjectPeriod,roomCode,professorEmail,professorRa,roomCode,scheduleId,courseName,coordEmail,academicPeriod
schedule,,,,,,,,,,2S-4CM-D5@2023(SCS),Computer Science,udibon@tisim.sy,ANNUAL
professor,Dr. John Doe,,,,,,john.doe@example.com,12345,,,,,
subject,Data Structures,,,CSE103,EVENING,,,,,,,,
class,Class 101,HYBRID,THEORY,CSE104,,A01,,,,2S-4CM-D5@2024(SCS),,,
subject,Algorithms,,,CSE203,AFTERNOON,,,,,,,,
class,Class 202,REMOTE,LAB,CSE204,,A02,,,,2S-4CM-D5@2024(SCS),,,
coordinator,Dr. Jane Smith,,,,,,jane.smith@example.com,54321,,,,,`
    const csvBuffer: Buffer = Buffer.from(csvContent, 'utf-8')

    const lenghtUserBefore = repo.getUsersLength()
    const lenghtClassBefore = repo.getClassesLength()
    const lenghtSubjectBefore = repo.getSubjectsLength()
    const lenghtScheduleBefore = repo.getSchedulesLength()

    await usecase.execute(csvBuffer)

    const lenghtUserAfter = repo.getUsersLength()
    const lenghtClassAfter = repo.getClassesLength()
    const lenghtSubjectAfter = repo.getSubjectsLength()
    const lenghtScheduleAfter = repo.getSchedulesLength()

    expect(lenghtUserAfter).toEqual(lenghtUserBefore + 2)
    expect(lenghtClassAfter).toEqual(lenghtClassBefore + 2)
    expect(lenghtSubjectAfter).toEqual(lenghtSubjectBefore + 2)
    expect(lenghtScheduleAfter).toEqual(lenghtScheduleBefore + 1)
  })

  it('Should activate usecase correctly: create a coordinator and assign it on a schedule in the same csv', async () => {
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

    const lenghtUserBefore = repo.getUsersLength()
    const lenghtClassBefore = repo.getClassesLength()
    const lenghtSubjectBefore = repo.getSubjectsLength()
    const lenghtScheduleBefore = repo.getSchedulesLength()

    await usecase.execute(csvBuffer)

    const lenghtUserAfter = repo.getUsersLength()
    const lenghtClassAfter = repo.getClassesLength()
    const lenghtSubjectAfter = repo.getSubjectsLength()
    const lenghtScheduleAfter = repo.getSchedulesLength()

    expect(lenghtUserAfter).toEqual(lenghtUserBefore + 2)
    expect(lenghtClassAfter).toEqual(lenghtClassBefore + 2)
    expect(lenghtSubjectAfter).toEqual(lenghtSubjectBefore + 2)
    expect(lenghtScheduleAfter).toEqual(lenghtScheduleBefore + 1)

    // check if the coordinator created is assigned to the schedule
    const schedule = await repo.getSchedule('2S-4CM-D5@2023(SCS)', 1)
    const coordinatorId = schedule.userId
    const coordinator = await repo.getUser(coordinatorId)
    expect(coordinator.role).toEqual('COORDINATOR')
    expect(coordinator.email).toEqual('jane.smith@example.com')

  })

  it('Should raise error for invalid professor row', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UploadCSVUsecase(repo)
    const lenghtUserBefore = repo.getUsersLength()
    const lenghtClassBefore = repo.getClassesLength()
    const lenghtSubjectBefore = repo.getSubjectsLength()

    const csvContent = `type,name,classModality,classType,subjectCode,subjectPeriod,roomCode,professorEmail,professorRa,roomCode,scheduleId,courseName,coordEmail,academicPeriod
schedule,,,,,,,,,,2S-4CM-D5@2023(SCS),Computer Science,udibon@tisim.sy,ANNUAL
professor,Dr. John Doe,,,,,,john.doe.example.com,12345,,,,,
subject,Data Structures,,,CSE103,EVENING,,,,,,,,
class,Class 101,HYBRID,THEORY,CSE104,,A01,,,,2S-4CM-D5@2024(SCS),,,
subject,Algorithms,,,CSE203,AFTERNOON,,,,,,,,
class,Class 202,REMOTE,LAB,CSE204,,A02,,,,2S-4CM-D5@2024(SCS),,,
coordinator,Dr. Jane Smith,,,,,,jane.smith@example.com,54321,,,,,`

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
    const usecase = new UploadCSVUsecase(repo)

    const lenghtUserBefore = repo.getUsersLength()
    const lenghtClassBefore = repo.getClassesLength()
    const lenghtSubjectBefore = repo.getSubjectsLength()

    const csvContent = `type,name,classModality,classType,subjectCode,subjectPeriod,roomCode,professorEmail,professorRa,roomCode,scheduleId,courseName,coordEmail,academicPeriod
schedule,,,,,,,,,,2S-4CM-D5@2023(SCS),Computer Science,udibon@tisim.sy,ANNUAL
professor,Dr. John Doe,,,,,,john.doe@example.com,12345,,,,,
subject,Data Structures,,,CSE103,EVENING,,,,,,,,
class,Class 101,HYBRID,THEORY,C,,A01,,,,2S-4CM-D5@2024(SCS),,,
subject,Algorithms,,,CSE203,AFTERNOON,,,,,,,,
class,Class 202,REMOTE,LAB,CSE204,,A02,,,,2S-4CM-D5@2024(SCS),,,
coordinator,Dr. Jane Smith,,,,,,jane.smith@example.com,54321,,,,,`

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
    const usecase = new UploadCSVUsecase(repo)
    const lenghtUserBefore = repo.getUsersLength()
    const lenghtClassBefore = repo.getClassesLength()
    const lenghtSubjectBefore = repo.getSubjectsLength()

    const csvContent = `type,name,classModality,classType,subjectCode,subjectPeriod,roomCode,professorEmail,professorRa,roomCode,scheduleId,courseName,coordEmail,academicPeriod
schedule,,,,,,,,,,2S-4CM-D5@2023(SCS),Computer Science,udibon@tisim.sy,ANNUAL
professor,Dr. John Doe,,,,,,john.doe@example.com,12345,,,,,
subject,Data Structures,,,CSE103,AUSTING,,,,,,,,
class,Class 101,HYBRID,THEORY,CSE104,,A01,,,,2S-4CM-D5@2024(SCS),,,
subject,Algorithms,,,CSE203,AFTERNOON,,,,,,,,
class,Class 202,REMOTE,LAB,CSE204,,A02,,,,2S-4CM-D5@2024(SCS),,,
coordinator,Dr. Jane Smith,,,,,,jane.smith@example.com,54321,,,,,`

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
    const usecase = new UploadCSVUsecase(repo)

    const lenghtUserBefore = repo.getUsersLength()
    const lenghtClassBefore = repo.getClassesLength()
    const lenghtSubjectBefore = repo.getSubjectsLength() // Eh o Brancas

    const csvContent = `type,name,classModality,classType,subjectCode,subjectPeriod,roomCode,professorEmail,professorRa,roomCode,scheduleId,courseName,coordEmail,academicPeriod
schedule,,,,,,,,,,2S-4CM-D5@2023(SCS),Computer Science,udibon@tisim.sy,ANNUAL
professor,Dr. John Doe,,,,,,john.doe@example.com,12345,,,,,
subject,Data Structures,,,CSE103,EVENING,,,,,,,,
class,Class 101,HYBRID,THEORY,CSE104,,A01,,,,2S-4CM-D5@2024(SCS),,,
subject,Algorithms,,,CSE203,AFTERNOON,,,,,,,,
class,Class 202,REMOTE,LAB,CSE204,,A02,,,,2S-4CM-D5@2024(SCS),,,
room,Dr. Jane Smith,,,,,,jane.smith@example.com,54321,,,,,`

    const csvBuffer: Buffer = Buffer.from(csvContent, 'utf-8')
    await expect(usecase.execute(csvBuffer)).rejects.toThrowError(
      'CSV file with invalid row type: room at row 6',
    )

    const lenghtUserAfter = repo.getUsersLength()
    const lenghtClassAfter = repo.getClassesLength()
    const lenghtSubjectAfter = repo.getSubjectsLength()

    expect(lenghtUserAfter).toEqual(lenghtUserBefore)
    expect(lenghtClassAfter).toEqual(lenghtClassBefore)
    expect(lenghtSubjectAfter).toEqual(lenghtSubjectBefore)
  })

  it('Should raise error for invalid user role on schedule', async () => {
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

    await expect(usecase.execute(csvBuffer)).rejects.toThrowError(
      'user must be a coordinator',
    )
  })

  it('Should raise error for invalid scheduleId', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UploadCSVUsecase(repo)

    const csvContent =`type,name,classModality,classType,subjectCode,subjectPeriod,roomCode,professorEmail,professorRa,roomCode,scheduleId,courseName,coordEmail,academicPeriod
schedule,,,,,,,,,,2S-CS),Computer Science,john.doe@example.com,ANNUAL
professor,Dr. John Doe,,,,,,john.doe@example.com,12345,,,,,
subject,Data Structures,,,CSE103,EVENING,,,,,,,,
class,Class 101,HYBRID,THEORY,CSE104,,A01,,,,2S-4CM-D5@2024(SCS),,,
subject,Algorithms,,,CSE203,AFTERNOON,,,,,,,,
class,Class 202,REMOTE,LAB,CSE204,,A02,,,,2S-4CM-D5@2024(SCS),,,
coordinator,Dr. Jane Smith,,,,,,jane.smith@example.com,54321,,,,,`
    const csvBuffer: Buffer = Buffer.from(csvContent, 'utf-8')

    await expect(usecase.execute(csvBuffer)).rejects.toThrowError(
      'Field scheduleId is not valid',
    )
  })
})
