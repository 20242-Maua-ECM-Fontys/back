import { describe, it, expect } from 'vitest'
import { Class } from '../../../../src/shared/domain/entities/class'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'
import { MODALITY } from '../../../../src/shared/domain/enums/modality_enum'
import { CLASSTYPE } from '../../../../src/shared/domain/enums/class_type_enum'
import { ROLE } from '../../../../src/shared/domain/enums/role_enum'
import { User } from '../../../../src/shared/domain/entities/user'
import { PERIOD } from '../../../../src/shared/domain/enums/period_enum'
import { Subject } from '../../../../src/shared/domain/entities/subject'
import { Suitability } from '../../../../src/shared/domain/entities/suitability'
import { Schedule } from '../../../../src/shared/domain/entities/schedule'

// User methods
describe('Assert Schedule Repository Mock is correct at all for User methods', () => {
  it('Should get length correctly', async () => {
    const repo = new ScheduleRepositoryMock()
    const length = repo.getUsersLength()

    expect(length).toEqual(5)
  })
  it('Should get user correctly', async () => {
    const repo = new ScheduleRepositoryMock()
    const user = await repo.getUser(1)

    expect(user?.id).toEqual(1)
    expect(user?.name).toEqual('user1')
    expect(user?.email).toEqual('user1@gmail.com')
    expect(user?.role).toEqual(ROLE.STAFF)
    expect(user?.RA).toEqual('21.00000-1')
    expect(user?.password).toEqual('Password1@')
  })
  it('Should get user wrongly: userId does not exists', async () => {
    const repo = new ScheduleRepositoryMock()
    await expect(repo.getUser(repo.getUsersLength() + 1)).rejects.toThrowError('No items found for userId')

  })
  it('Should get all users correctly', async () => {
    const repo = new ScheduleRepositoryMock()
    const users = await repo.getAllUsers()

    expect(users.length).toEqual(5)
  })
  it('Should create user correctly', async () => {
    const user = new User({
      id: 10,
      name: 'usuario10',
      email: 'usuario10@gmail.com',
      role: ROLE.PROFESSOR,
      RA: '10.00000-1',
      password: 'Password10@',
    })

    const repo = new ScheduleRepositoryMock()
    const lastLength = repo.getUsersLength()
    await repo.createUser(user)
    const newLength = repo.getUsersLength()

    expect(newLength).toEqual(lastLength + 1)
  })
})

// Subject methods
describe('Assert Schedule Repository Mock is correct at all for Subject methods', () => {
  it('Should get length correctly', async () => {
    const repo = new ScheduleRepositoryMock()
    const length = repo.getSubjectsLength()

    expect(length).toEqual(2)
  })
  it('Should get subject correctly', async () => {
    const repo = new ScheduleRepositoryMock()
    const subject = await repo.getSubject("ECM256")

    expect(subject?.code).toEqual("ECM256")
    expect(subject?.name).toEqual('Programming Languages II')
    expect(subject?.period).toEqual(PERIOD.MORNING)
  })
  it('Should get subject wrongly: codeSubject does not exists', async () => {
    const repo = new ScheduleRepositoryMock()

    await expect(repo.getSubject("ECM25678")).rejects.toThrowError('No items found for codeSubject')

  })
  it('Should get all subjects correctly', async () => {
    const repo = new ScheduleRepositoryMock()
    const subjects = await repo.getAllSubjects()

    expect(subjects.length).toEqual(2)
  })
  it('Should create subject correctly', async () => {
    const subject = new Subject({
      code: 'EFB803',
      name: 'Statistics',
      period: PERIOD.AFTERNOON,
    })

    const repo = new ScheduleRepositoryMock()
    const lastLength = repo.getSubjectsLength()
    await repo.createSubject(subject)
    const newLength = repo.getSubjectsLength()

    expect(newLength).toEqual(lastLength + 1)
  })
})

// Class methods
describe('Assert Schedule Repository Mock is correct at all for Class methods', () => {
  it('Should get length correctly', async () => {
    const repo = new ScheduleRepositoryMock()
    const length = repo.getClassesLength()

    expect(length).toEqual(4)
  })
  it('Should get class correctly', async () => {
    const repo = new ScheduleRepositoryMock()
    const selectedClass = await repo.getClass("0a8c5357-1f07-5b24-9845-9318c47ac922")

    expect(selectedClass.id).toBe('0a8c5357-1f07-5b24-9845-9318c47ac922')
    expect(selectedClass.name).toBe('Physics I')
    expect(selectedClass.modality).toBe(MODALITY.REMOTE)
    expect(selectedClass.classType).toBe(CLASSTYPE.THEORY)
    expect(selectedClass.subjectCode).toBe('EFB207')
  })
  it('Should get all classes correctly', async () => {
    const repo = new ScheduleRepositoryMock()
    const classes = await repo.getAllClasss()

    expect(classes.length).toEqual(4)
  })
  it('Should create class correctly', async () => {
    const classEntity = new Class({
      id: '0a8c5357-1f07-5b24-9845-9318c47ab929',
      name: 'Programming Language II',
      modality: MODALITY.REMOTE,
      classType: CLASSTYPE.THEORY,
      subjectCode: 'ECM256',
      scheduleId: '2S-4CM-D5@2024(SCS)',
    })

    const repo = new ScheduleRepositoryMock()
    const lastLength = repo.getClassesLength()
    await repo.createClass(classEntity)
    const newLength = repo.getClassesLength()

    expect(newLength).toEqual(lastLength + 1)
  })
})

// Suitability methods
describe('Assert Schedule Repository Mock is correct at all for Suitability methods', () => {
  it('Should get length correctly', async () => {
    const repo = new ScheduleRepositoryMock()
    const length = repo.getSuitabilitiesLength()

    expect(length).toEqual(3)
  })
  it('Should get all suitabilities correctly', async () => {
    const repo = new ScheduleRepositoryMock()
    const users = await repo.getAllSuitabilities()

    expect(users.length).toEqual(3)
  })
  it('Should create suitability correctly', async () => {
    const userId = 3
    const codeSubject = 'ECM256'

    const repo = new ScheduleRepositoryMock()
    const lastLength = repo.getSuitabilitiesLength()
    await repo.createSuitability(new Suitability({userId, codeSubject}))
    const newLength = repo.getSuitabilitiesLength()

    expect(newLength).toEqual(lastLength + 1)
  })
  it('Should create suitability wrongly: suitability already exists', async () => {
    const userId = 4
    const codeSubject = 'ECM256'

    const repo = new ScheduleRepositoryMock()
    const lastLength = repo.getSuitabilitiesLength()

    await expect(repo.createSuitability(new Suitability({userId, codeSubject}))).rejects.toThrowError('Suitability already exists')
    const newLength = repo.getSuitabilitiesLength()

    expect(newLength).toEqual(lastLength)
  })
  it('Should create suitability wrongly: user does not exists', async () => {
    const repo = new ScheduleRepositoryMock()

    const userId = repo.getUsersLength() + 1
    const codeSubject = 'ECM256'

    const lastLength = repo.getSuitabilitiesLength()

    await expect(repo.createSuitability(new Suitability({userId, codeSubject}))).rejects.toThrowError('No items found for userId')
    const newLength = repo.getSuitabilitiesLength()

    expect(newLength).toEqual(lastLength)
  })
  it('Should create suitability wrongly: user is not a professor', async () => {
    const repo = new ScheduleRepositoryMock()

    const userId = 1
    const codeSubject = 'ECM256'

    const lastLength = repo.getSuitabilitiesLength()

    await expect(repo.createSuitability(new Suitability({userId, codeSubject}))).rejects.toThrowError('The data rule "user must be a professor" was violated')
    const newLength = repo.getSuitabilitiesLength()

    expect(newLength).toEqual(lastLength)
  })
  it('Should create suitability wrongly: codeSubject does not exists', async () => {
    const repo = new ScheduleRepositoryMock()

    const userId = 3
    const codeSubject = 'EDP123'

    const lastLength = repo.getSuitabilitiesLength()

    await expect(repo.createSuitability(new Suitability({userId, codeSubject}))).rejects.toThrowError('No items found for codeSubject')
    const newLength = repo.getSuitabilitiesLength()

    expect(newLength).toEqual(lastLength)
  })


})

// Schedule methods
describe('Assert Schedule Repository Mock is correct at all for Schedule methods', () => {
  it('Should get length correctly', async () => {
    const repo = new ScheduleRepositoryMock()
    const length = repo.getSchedulesLength()

    expect(length).toEqual(4)
  })
  it('Should get all schedules correctly', async () => {
    const repo = new ScheduleRepositoryMock()
    const users = await repo.getAllSchedules()

    expect(users.length).toEqual(4)
  })
  it('Should create schedule correctly', async () => {
    const schedule = new Schedule({
      scheduleId: '2S-2CM-D5@2024(SCS)',
      courseName: 'Compute Engineering',
      groupNumber: 1,
      userId: 2,
    })

    const repo = new ScheduleRepositoryMock()
    const lastLength = repo.getSchedulesLength()
    await repo.createSchedule(schedule)
    const newLength = repo.getSchedulesLength()

    expect(newLength).toEqual(lastLength + 1)
  })
  it('Should create schedule wrongly: sxists', async () => {
    const schedule = new Schedule({
      scheduleId: '2S-4CM-D5@2024(SCS)',
      courseName: 'Compute Engineering',
      groupNumber: 1,
      userId: 2,
    })

    const repo = new ScheduleRepositoryMock()
    const lastLength = repo.getSchedulesLength()
    await expect(repo.createSchedule(schedule)).rejects.toThrowError('Schedule already exists')
    const newLength = repo.getSchedulesLength()

    expect(newLength).toEqual(lastLength)
  })
  it('Should create schedule wrongly: user does not exists', async () => {
    const repo = new ScheduleRepositoryMock()
    const schedule = new Schedule({
      scheduleId: '2S-2CM-D5@2024(SCS)',
      courseName: 'Compute Engineering',
      groupNumber: 1,
      userId: repo.getUsersLength() + 1,
    })

    const lastLength = repo.getSchedulesLength()
    await expect(repo.createSchedule(schedule)).rejects.toThrowError('No items found for userId')
    const newLength = repo.getSchedulesLength()

    expect(newLength).toEqual(lastLength)
  })
  it('Should create schedule wrongly: user is not a coordinator', async () => {
    const repo = new ScheduleRepositoryMock()
    const schedule = new Schedule({
      scheduleId: '2S-2CM-D5@2024(SCS)',
      courseName: 'Compute Engineering',
      groupNumber: 1,
      userId: 1,
    })

    const lastLength = repo.getSchedulesLength()
    await expect(repo.createSchedule(schedule)).rejects.toThrowError('The data rule "user must be a coordinator" was violated')
    const newLength = repo.getSchedulesLength()

    expect(newLength).toEqual(lastLength)
  })
})

