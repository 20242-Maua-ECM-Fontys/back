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
import { Possibility } from '../../../../src/shared/domain/entities/possibility'
import { WEEK_DAY } from '../../../../src/shared/domain/enums/week_day_enum'
import { MAUA_START_TIME } from '../../../../src/shared/domain/enums/maua_start_time_enum'
import { MAUA_END_TIME } from '../../../../src/shared/domain/enums/maua_end_time_enum'
import { Availability } from '../../../../src/shared/domain/entities/availability'
import { AvFullfilled } from '../../../../src/shared/domain/entities/avFullfilled'
import { ACADEMIC_PERIOD } from '../../../../src/shared/domain/enums/academic_period_enum'

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
    await expect(repo.getUser(repo.getUsersLength() + 1)).rejects.toThrowError(
      'No items found for userId',
    )
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
  it('Should not create user: user already exists', async () => {
    const user = new User({
      id: 1,
      name: 'user1',
      email: 'ini@vifod.nc',
      role: ROLE.STAFF,
      RA: '21.00000-1',
      password: 'Password1@',
    })
    const repo = new ScheduleRepositoryMock()
    expect(repo.createUser(user)).rejects.toThrowError('userId already exists')
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
    const subject = await repo.getSubject('ECM256')

    expect(subject?.code).toEqual('ECM256')
    expect(subject?.name).toEqual('Programming Languages II')
    expect(subject?.period).toEqual(PERIOD.MORNING)
  })
  it('Should get subject wrongly: codeSubject does not exists', async () => {
    const repo = new ScheduleRepositoryMock()

    await expect(repo.getSubject('ECM25678')).rejects.toThrowError(
      'No items found for codeSubject',
    )
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
  it('Should not create subject: subject already exists', async () => {
    const subject = new Subject({
      code: 'ECM256',
      name: 'Programming Languages II',
      period: PERIOD.MORNING,
    })

    const repo = new ScheduleRepositoryMock()
    const lastLength = repo.getSubjectsLength()
    await expect(repo.createSubject(subject)).rejects.toThrowError(
      'Subject already exists',
    )
    const newLength = repo.getSubjectsLength()

    expect(newLength).toEqual(lastLength)
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
    const selectedClass = await repo.getClass(
      '0a8c5357-1f07-5b24-9845-9318c47ac924',
    )

    expect(selectedClass.id).toBe('0a8c5357-1f07-5b24-9845-9318c47ac924')
    expect(selectedClass.name).toBe('Linguagens de Programacao II')
    expect(selectedClass.modality).toBe(MODALITY.IN_PERSON)
    expect(selectedClass.classType).toBe(CLASSTYPE.THEORY)
    expect(selectedClass.subjectCode).toBe('ECM256')
  })
  it('Should get class wrongly: no classId found', async () => {
    const repo = new ScheduleRepositoryMock()

    await expect(repo.getClass('uuid')).rejects.toThrowError(
      'No items found for classId',
    )
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
      isTaken: false,
    })

    const repo = new ScheduleRepositoryMock()
    const lastLength = repo.getClassesLength()
    await repo.createClass(classEntity)
    const newLength = repo.getClassesLength()

    expect(newLength).toEqual(lastLength + 1)
  })
  it('Should not create class: class already exists', async () => {
    const classEntity = new Class({
      id: '0a8c5357-1f07-5b24-9845-9318c47ac925',
      name: 'Physics I',
      modality: MODALITY.REMOTE,
      classType: CLASSTYPE.THEORY,
      subjectCode: 'EFB207',
      scheduleId: '2S-4CM-D5@2024(SCS)',
    })

    const repo = new ScheduleRepositoryMock()
    const lastLength = repo.getClassesLength()
    await expect(repo.createClass(classEntity)).rejects.toThrowError(
      'Class already exists',
    )
    const newLength = repo.getClassesLength()

    expect(newLength).toEqual(lastLength)
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
    const userId = 5
    const codeSubject = 'ECM256'

    const repo = new ScheduleRepositoryMock()
    const lastLength = repo.getSuitabilitiesLength()
    await repo.createSuitability(new Suitability({ userId, codeSubject }))
    const newLength = repo.getSuitabilitiesLength()

    expect(newLength).toEqual(lastLength + 1)
  })
  it('Should create suitability wrongly: suitability already exists', async () => {
    const userId = 4
    const codeSubject = 'ECM256'

    const repo = new ScheduleRepositoryMock()
    const lastLength = repo.getSuitabilitiesLength()

    await expect(
      repo.createSuitability(new Suitability({ userId, codeSubject })),
    ).rejects.toThrowError('Suitability already exists')
    const newLength = repo.getSuitabilitiesLength()

    expect(newLength).toEqual(lastLength)
  })
  it('Should create suitability wrongly: user does not exists', async () => {
    const repo = new ScheduleRepositoryMock()

    const userId = repo.getUsersLength() + 1
    const codeSubject = 'ECM256'

    const lastLength = repo.getSuitabilitiesLength()

    await expect(
      repo.createSuitability(new Suitability({ userId, codeSubject })),
    ).rejects.toThrowError('No items found for userId')
    const newLength = repo.getSuitabilitiesLength()

    expect(newLength).toEqual(lastLength)
  })
  it('Should create suitability wrongly: user is not a professor', async () => {
    const repo = new ScheduleRepositoryMock()

    const userId = 1
    const codeSubject = 'ECM256'

    const lastLength = repo.getSuitabilitiesLength()

    await expect(
      repo.createSuitability(new Suitability({ userId, codeSubject })),
    ).rejects.toThrowError(
      'The data rule "user must be a professor" was violated',
    )
    const newLength = repo.getSuitabilitiesLength()

    expect(newLength).toEqual(lastLength)
  })
  it('Should create suitability wrongly: codeSubject does not exists', async () => {
    const repo = new ScheduleRepositoryMock()

    const userId = 3
    const codeSubject = 'EDP123'

    const lastLength = repo.getSuitabilitiesLength()

    await expect(
      repo.createSuitability(new Suitability({ userId, codeSubject })),
    ).rejects.toThrowError('No items found for codeSubject')
    const newLength = repo.getSuitabilitiesLength()

    expect(newLength).toEqual(lastLength)
  })
  it('Should get suitabilities by userId correctly', async () => {
    const repo = new ScheduleRepositoryMock()
    const suitabilities = await repo.getSuitabilitiesByUserId(4)

    expect(suitabilities.length).toEqual(2)
  })
  it('Should get suitabilities by userId correctly: empty list', async () => {
    const repo = new ScheduleRepositoryMock()
    const suitabilities = await repo.getSuitabilitiesByUserId(5)

    expect(suitabilities.length).toEqual(0)
  })
})

// Schedule methods
describe('Assert Schedule Repository Mock is correct at all for Schedule methods', () => {
  it('Should get length correctly', async () => {
    const repo = new ScheduleRepositoryMock()
    const length = repo.getSchedulesLength()

    expect(length).toEqual(4)
  })

  it('Should get schedule correctly', async () => {
    const repo = new ScheduleRepositoryMock()
    const schedule = await repo.getSchedule('2S-4CM-D5@2024(SCS)', 1)

    expect(schedule.scheduleId).toEqual('2S-4CM-D5@2024(SCS)')
    expect(schedule.groupNumber).toEqual(1)
  })
  it('Should get schedule correctly with different groupNumber', async () => {
    const repo = new ScheduleRepositoryMock()
    const schedule = await repo.getSchedule("2S-4CM-D5@2024(SCS)", 1)

    expect(schedule.scheduleId).toEqual("2S-4CM-D5@2024(SCS)")
    expect(schedule.groupNumber).toEqual(1)
  })
  it('Should get schedule wrongly: no scheduleId found', async () => {
    const repo = new ScheduleRepositoryMock()

    await expect(
      repo.getSchedule('2S-4CM-D5@2024(SCS)123', 1),
    ).rejects.toThrowError('No items found for scheduleId')
  })
  it('Should get all schedules correctly', async () => {
    const repo = new ScheduleRepositoryMock()
    const users = await repo.getAllSchedules()

    expect(users.length).toEqual(4)
  })
  it('Should create schedule correctly', async () => {
    const schedule = new Schedule({
      scheduleId: '2S-1CM-D5@2024(SCS)',
      courseName: 'Compute Engineering',
      groupNumber: 1,
      userId: 2,
      academicPeriod: ACADEMIC_PERIOD.ANNUAL,
      courseGrade: 1,
    })

    const repo = new ScheduleRepositoryMock()
    const lastLength = repo.getSchedulesLength()
    await repo.createSchedule(schedule)
    const newLength = repo.getSchedulesLength()

    expect(newLength).toEqual(lastLength + 1)
  })
  it('Should create schedule wrongly: already exists', async () => {
    const schedule = new Schedule({
      scheduleId: '2S-4CM-D5@2024(SCS)',
      courseName: 'Compute Engineering',
      groupNumber: 1,
      userId: 2,
      academicPeriod: ACADEMIC_PERIOD.ANNUAL,
      courseGrade: 4,
    })

    const repo = new ScheduleRepositoryMock()
    const lastLength = repo.getSchedulesLength()
    await expect(repo.createSchedule(schedule)).rejects.toThrowError(
      'Schedule already exists',
    )
    const newLength = repo.getSchedulesLength()

    expect(newLength).toEqual(lastLength)
  })
  it('Should create schedule wrongly: user does not exists', async () => {
    const repo = new ScheduleRepositoryMock()
    const schedule = new Schedule({
      scheduleId: '2S-1CM-D5@2024(SCS)',
      courseName: 'Compute Engineering',
      groupNumber: 1,
      userId: repo.getUsersLength() + 1,
      academicPeriod: ACADEMIC_PERIOD.ANNUAL,
      courseGrade: 1,
    })

    const lastLength = repo.getSchedulesLength()
    await expect(repo.createSchedule(schedule)).rejects.toThrowError(
      'No items found for userId',
    )
    const newLength = repo.getSchedulesLength()

    expect(newLength).toEqual(lastLength)
  })
  it('Should create schedule wrongly: user is not a coordinator', async () => {
    const repo = new ScheduleRepositoryMock()
    const schedule = new Schedule({
      scheduleId: '2S-1CM-D5@2024(SCS)',
      courseName: 'Compute Engineering',
      groupNumber: 1,
      userId: 1,
      academicPeriod: ACADEMIC_PERIOD.ANNUAL,
      courseGrade: 1,
    })

    const lastLength = repo.getSchedulesLength()
    await expect(repo.createSchedule(schedule)).rejects.toThrowError(
      'The data rule "user must be a coordinator" was violated',
    )
    const newLength = repo.getSchedulesLength()

    expect(newLength).toEqual(lastLength)
  })
})

// Possibility methods
describe('Assert Schedule Repository Mock is correct at all for Possibility methods', () => {
  it('Should get length correctly', async () => {
    const repo = new ScheduleRepositoryMock()
    const length = repo.getPossibilitiesLength()

    expect(length).toEqual(33)
  })
  it('Should get possibility correctly', async () => {
    const repo = new ScheduleRepositoryMock()
    const possibility = await repo.getPossibility(
      'a13e4567-e89b-12d3-a456-426614174000',
    )

    expect(possibility.id).toEqual('a13e4567-e89b-12d3-a456-426614174000')
  })
  it('Should get possibility wrongly: no possibilityId found', async () => {
    const repo = new ScheduleRepositoryMock()

    await expect(
      repo.getPossibility('123e4567-e892d3-a456-426614174000'),
    ).rejects.toThrowError('No items found for possibilityId')
  })
  it('Should get all possibilities correctly', async () => {
    const repo = new ScheduleRepositoryMock()
    const possibilities = await repo.getAllPossibilities()

    expect(possibilities.length).toEqual(33)
  })
  it('Should create possibility correctly', async () => {
    const possibility = new Possibility({
      id: '1afe4137-dd2f-5719-a780-e6d53e68960e',
      weekDay: WEEK_DAY.MON,
      startTime: MAUA_START_TIME.H07_40_09_20,
      endTime: MAUA_END_TIME.H07_40_09_20,
      scheduleId: '2S-4CM-D5@2024(SCS)',
      groupNumber: 1,
    })

    const repo = new ScheduleRepositoryMock()
    const lastLength = repo.getPossibilitiesLength()
    await repo.createPossibility(possibility)
    const newLength = repo.getPossibilitiesLength()

    expect(newLength).toEqual(lastLength + 1)
  })
  it('Should not create possibility: exists', async () => {
    const possibility = new Possibility({
      id: 'a13e4567-e89b-12d3-a456-426614174000',
      weekDay: WEEK_DAY.MON,
      startTime: MAUA_START_TIME.H07_40_09_20,
      endTime: MAUA_END_TIME.H07_40_09_20,
      scheduleId: '2S-3CM-D5@2024(SCS)',
      groupNumber: 1,
    })
    const repo = new ScheduleRepositoryMock()
    const lastLength = repo.getPossibilitiesLength()
    await expect(repo.createPossibility(possibility)).rejects.toThrowError(
      'id already exists',
    )
    const newLength = repo.getPossibilitiesLength()

    expect(newLength).toEqual(lastLength)
  })
  it('Should create possibility wrongly: schedule does not exists', async () => {
    const repo = new ScheduleRepositoryMock()
    const possibility = new Possibility({
      id: '698b0f2c-3235-5afd-9b4b-97e916240cf0',
      weekDay: WEEK_DAY.MON,
      startTime: MAUA_START_TIME.H07_40_09_20,
      endTime: MAUA_END_TIME.H07_40_09_20,
      scheduleId: '2S-4CV-D5@2024(SCS)',
      groupNumber: 1,
    })
    const lastLength = repo.getPossibilitiesLength()
    await expect(repo.createPossibility(possibility)).rejects.toThrowError(
      'No items found for scheduleId',
    )
    const newLength = repo.getPossibilitiesLength()

    expect(newLength).toEqual(lastLength)
  })
})

// Availability methods
describe('Assert Schedule Repository Mock is correct at all for Availability methods', () => {
  it('Should get length correctly', async () => {
    const repo = new ScheduleRepositoryMock()
    const length = repo.getAvailabilitiesLength()

    expect(length).toEqual(18)
  })
  it('Should get availability correctly', async () => {
    const repo = new ScheduleRepositoryMock()
    const availability = await repo.getAvailability(
      '0a8c5357-1f07-5b24-9845-9318c4000003',
    )

    expect(availability.availabilityId).toEqual(
      '0a8c5357-1f07-5b24-9845-9318c4000003',
    )
  })
  it('Should get availability wrongly: no availabilityId found', async () => {
    const repo = new ScheduleRepositoryMock()

    await expect(
      repo.getAvailability('0a8c5357-0007-5b24-9845-9318c4000003'),
    ).rejects.toThrowError('No items found for availabilityId')
  })
  it('Should get all availabilities correctly', async () => {
    const repo = new ScheduleRepositoryMock()
    const availabilities = await repo.getAllAvailabilities()

    expect(availabilities.length).toEqual(18)
  })
  it('Should create availability correctly', async () => {
    const availability = new Availability({
      id: '123e4567-0000-12d3-a456-426614174000',
      userId: 5,
      startTime: MAUA_START_TIME.H07_40_09_20,
      endTime: MAUA_END_TIME.H07_40_09_20,
      isTaken: false,
      weekDay: WEEK_DAY.MON,
    })

    const repo = new ScheduleRepositoryMock()
    const lastLength = repo.getAvailabilitiesLength()
    await repo.createAvailability(availability)
    const newLength = repo.getAvailabilitiesLength()

    expect(newLength).toEqual(lastLength + 1)
  })
  it('Should not create availability: duplicated availabilityId', async () => {
    const availability = new Availability({
      id: '0a8c5357-1f07-5b24-9845-9318c4000011',
      userId: 5,
      startTime: MAUA_START_TIME.H07_40_09_20,
      endTime: MAUA_END_TIME.H07_40_09_20,
      isTaken: false,
      weekDay: WEEK_DAY.MON,
    })
    const repo = new ScheduleRepositoryMock()
    const lastLength = repo.getAvailabilitiesLength()
    await expect(repo.createAvailability(availability)).rejects.toThrowError(
      'availabilityId already exists',
    )
    const newLength = repo.getAvailabilitiesLength()

    expect(newLength).toEqual(lastLength)
  })
  it('Should not create availability: user does not exists', async () => {
    const repo = new ScheduleRepositoryMock()
    const availability = new Availability({
      id: '123e4567-0000-12d3-a456-426614174000',
      userId: repo.getUsersLength() + 1,
      startTime: MAUA_START_TIME.H07_40_09_20,
      endTime: MAUA_END_TIME.H07_40_09_20,
      isTaken: false,
      weekDay: WEEK_DAY.MON,
    })
    const lastLength = repo.getAvailabilitiesLength()
    await expect(repo.createAvailability(availability)).rejects.toThrowError(
      'No items found for userId',
    )
    const newLength = repo.getAvailabilitiesLength()

    expect(newLength).toEqual(lastLength)
  })
  it('Should not create availability: user is not a professor', async () => {
    const availability = new Availability({
      id: '123e4567-0000-12d3-a456-426614174000',
      userId: 1,
      startTime: MAUA_START_TIME.H07_40_09_20,
      endTime: MAUA_END_TIME.H07_40_09_20,
      isTaken: false,
      weekDay: WEEK_DAY.MON,
    })
    const repo = new ScheduleRepositoryMock()
    const lastLength = repo.getAvailabilitiesLength()
    await expect(repo.createAvailability(availability)).rejects.toThrowError(
      'The data rule "user must be a professor" was violated',
    )
    const newLength = repo.getAvailabilitiesLength()

    expect(newLength).toEqual(lastLength)
  })
  it('Should get availabilities by userId correctly', async () => {
    const repo = new ScheduleRepositoryMock()
    const availabilities = await repo.getAvailabilitiesByUserId(4)

    expect(availabilities.length).toEqual(8)
  })
  it('Should get availabilities by userId correctly: empty list', async () => {
    const repo = new ScheduleRepositoryMock()
    const availabilities = await repo.getAvailabilitiesByUserId(5)

    expect(availabilities.length).toEqual(0)
  })
})

// AvFullfilled methods
describe('Assert Schedule Repository Mock is correct at all for AvFullfilled methods', () => {
  it('Should get length correctly', async () => {
    const repo = new ScheduleRepositoryMock()
    const length = repo.getAvsFullfilledLength()

    expect(length).toEqual(2)
  })
  it('Should get all AvFullfilled correctly', async () => {
    const repo = new ScheduleRepositoryMock()
    const avFullfilled = await repo.getAllAvsFullfilled()

    expect(avFullfilled.length).toEqual(2)
  })
  it('Should create AvFullfilled correctly', async () => {
    /*
      userId = 3
      startTime = MAUA_START_TIME.H09_30_11_10
      weekDay = WEEK_DAY.FRI
      className = Physics I
      subjectCode = EFB207
      scheduleId = 2S-4CM-D5@2024(SCS)
    */
    const avFullfilled = new AvFullfilled({
      availabilityId: '0a8c5357-1f07-5b24-9845-9318c4000008',
      possibilityId: '124e4567-e89b-12d3-a456-426614174000',
      classId: '0a8c5357-1f07-5b24-9845-9318c47ac926',
    })

    const repo = new ScheduleRepositoryMock()
    const lastLength = repo.getAvsFullfilledLength()
    const availabilityBefore = await repo.getAvailability(
      '0a8c5357-1f07-5b24-9845-9318c4000008',
    )
    expect(availabilityBefore.isTaken).toEqual(false)

    await repo.createAvFullfilled(avFullfilled)

    const newLength = repo.getAvsFullfilledLength()
    expect(newLength).toEqual(lastLength + 1)

    const availabilityAfter = await repo.getAvailability(
      '0a8c5357-1f07-5b24-9845-9318c4000008',
    )
    expect(availabilityAfter.isTaken).toEqual(true)
  })
  it('Should not create AvFullfilled: availability does not exists', async () => {
    const avFullfilled = new AvFullfilled({
      availabilityId: '0a8c0000-1f07-5b24-9845-9318c4000008',
      possibilityId: '124e4567-e89b-12d3-a456-426614174000',
      classId: '0a8c5357-1f07-5b24-9845-9318c47ac926',
    })
    const repo = new ScheduleRepositoryMock()
    const lastLength = repo.getAvsFullfilledLength()
    await expect(repo.createAvFullfilled(avFullfilled)).rejects.toThrowError(
      'No items found for availabilityId',
    )
    const newLength = repo.getAvsFullfilledLength()

    expect(newLength).toEqual(lastLength)
  })
  it('Should not create AvFullfilled: possibility does not exists', async () => {
    const avFullfilled = new AvFullfilled({
      availabilityId: '0a8c5357-1f07-5b24-9845-9318c4000008',
      possibilityId: '124e4567-e89b-0000-a456-426614174000',
      classId: '0a8c5357-1f07-5b24-9845-9318c47ac926',
    })
    const repo = new ScheduleRepositoryMock()
    const lastLength = repo.getAvsFullfilledLength()
    const availabilityBefore = await repo.getAvailability(
      '0a8c5357-1f07-5b24-9845-9318c4000008',
    )
    expect(availabilityBefore.isTaken).toEqual(false)
    await expect(repo.createAvFullfilled(avFullfilled)).rejects.toThrowError(
      'No items found for possibilityId',
    )
    const newLength = repo.getAvsFullfilledLength()
    expect(newLength).toEqual(lastLength)
    const availabilityAfter = await repo.getAvailability(
      '0a8c5357-1f07-5b24-9845-9318c4000008',
    )
    expect(availabilityAfter.isTaken).toEqual(false)
  })
  it('Should not create AvFullfilled: class does not exists', async () => {
    const avFullfilled = new AvFullfilled({
      availabilityId: '0a8c5357-1f07-5b24-9845-9318c4000008',
      possibilityId: '124e4567-e89b-12d3-a456-426614174000',
      classId: '12004567-e89b-12d3-a456-426614174000',
    })
    const repo = new ScheduleRepositoryMock()
    const lastLength = repo.getAvsFullfilledLength()
    const availabilityBefore = await repo.getAvailability(
      '0a8c5357-1f07-5b24-9845-9318c4000008',
    )
    expect(availabilityBefore.isTaken).toEqual(false)
    await expect(repo.createAvFullfilled(avFullfilled)).rejects.toThrowError(
      'No items found for classId',
    )
    const newLength = repo.getAvsFullfilledLength()
    expect(newLength).toEqual(lastLength)
    const availabilityAfter = await repo.getAvailability(
      '0a8c5357-1f07-5b24-9845-9318c4000008',
    )
    expect(availabilityAfter.isTaken).toEqual(false)
  })
  it('Should not create AvFullfilled: Availability is already taken', async () => {
    const avFullfilled = new AvFullfilled({
      availabilityId: '0a8c5357-1f07-5b24-9845-9318c4000009',
      possibilityId: '124e4567-e89b-12d3-a456-426614174000',
      classId: '0a8c5357-1f07-5b24-9845-9318c47ac926',
    })
    const repo = new ScheduleRepositoryMock()
    const lastLength = repo.getAvsFullfilledLength()
    const availabilityBefore = await repo.getAvailability(
      '0a8c5357-1f07-5b24-9845-9318c4000009',
    )
    expect(availabilityBefore.isTaken).toEqual(true)
    await expect(repo.createAvFullfilled(avFullfilled)).rejects.toThrowError(
      'The data rule "Availability is already taken" was violated',
    )
    const newLength = repo.getAvsFullfilledLength()
    expect(newLength).toEqual(lastLength)
    const availabilityAfter = await repo.getAvailability(
      '0a8c5357-1f07-5b24-9845-9318c4000009',
    )
    expect(availabilityAfter.isTaken).toEqual(true)
  })
  it('Should not create AvFullfilled: Possibility and Class must have the same scheduleId', async () => {
    const avFullfilled = new AvFullfilled({
      availabilityId: '0a8c5357-1f07-5b24-9845-9318c4000008',
      possibilityId: '124e4567-e89b-12d3-a456-426614174000',
      classId: '0a8c5357-1f07-5b24-9845-9318c47ac925',
    })
    const repo = new ScheduleRepositoryMock()
    const lastLength = repo.getAvsFullfilledLength()
    const availabilityBefore = await repo.getAvailability(
      '0a8c5357-1f07-5b24-9845-9318c4000008',
    )
    expect(availabilityBefore.isTaken).toEqual(false)
    await expect(repo.createAvFullfilled(avFullfilled)).rejects.toThrowError(
      'The data rule "Possibility and Class must have the same scheduleId" was violated',
    )
    const newLength = repo.getAvsFullfilledLength()
    expect(newLength).toEqual(lastLength)
    const availabilityAfter = await repo.getAvailability(
      '0a8c5357-1f07-5b24-9845-9318c4000008',
    )
    expect(availabilityAfter.isTaken).toEqual(false)
  })
  it('Should not create AvFullfilled: Possibility and Availability must have the same startTime and endTime', async () => {
    const avFullfilled = new AvFullfilled({
      availabilityId: '0a8c5357-1f07-5b24-9845-9318c4000008',
      possibilityId: '125e4567-e89b-12d3-a456-426614174001',
      classId: '0a8c5357-1f07-5b24-9845-9318c47ac926',
    })
    const repo = new ScheduleRepositoryMock()
    const lastLength = repo.getAvsFullfilledLength()
    const availabilityBefore = await repo.getAvailability(
      '0a8c5357-1f07-5b24-9845-9318c4000008',
    )
    expect(availabilityBefore.isTaken).toEqual(false)
    await expect(repo.createAvFullfilled(avFullfilled)).rejects.toThrowError(
      'The data rule "Possibility and Availability must have the same startTime and endTime" was violated',
    )
    const newLength = repo.getAvsFullfilledLength()
    expect(newLength).toEqual(lastLength)
    const availabilityAfter = await repo.getAvailability(
      '0a8c5357-1f07-5b24-9845-9318c4000008',
    )
    expect(availabilityAfter.isTaken).toEqual(false)
  })
  it('Should not create AvFullfilled: Possibility and Availability must have the same startTime and endTime', async () => {
    const avFullfilled = new AvFullfilled({
      availabilityId: '0a8c5357-1f07-5b24-9845-9318c4000008',
      possibilityId: '103e4567-e89b-12d3-a456-426614174000',
      classId: '0a8c5357-1f07-5b24-9845-9318c47ac926',
    })
    const repo = new ScheduleRepositoryMock()
    const lastLength = repo.getAvsFullfilledLength()
    const availabilityBefore = await repo.getAvailability(
      '0a8c5357-1f07-5b24-9845-9318c4000008',
    )
    expect(availabilityBefore.isTaken).toEqual(false)
    await expect(repo.createAvFullfilled(avFullfilled)).rejects.toThrowError(
      'The data rule "Possibility and Availability must have the same weekDay" was violated',
    )
    const newLength = repo.getAvsFullfilledLength()
    expect(newLength).toEqual(lastLength)
    const availabilityAfter = await repo.getAvailability(
      '0a8c5357-1f07-5b24-9845-9318c4000008',
    )
    expect(availabilityAfter.isTaken).toEqual(false)
  })
})
