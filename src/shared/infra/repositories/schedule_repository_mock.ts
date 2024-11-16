import { IScheduleRepository } from '../../../shared/domain/repositories/schedule_repository_interface'
import { User } from '../../domain/entities/user'
import { ROLE } from '../../domain/enums/role_enum'
import { Class } from '../../../shared/domain/entities/class'
import { MODALITY } from '../../../shared/domain/enums/modality_enum'
import { CLASSTYPE } from '../../../shared/domain/enums/class_type_enum'
import { Subject } from '../../../shared/domain/entities/subject'
import { PERIOD } from '../../../shared/domain/enums/period_enum'
import { Suitability } from '../../../shared/domain/entities/suitability'
import { Possibility } from '../../../shared/domain/entities/possibility'
import { WEEK_DAY } from '../../../shared/domain/enums/week_day_enum'
import { MAUA_START_TIME } from '../../../shared/domain/enums/maua_start_time_enum'
import { MAUA_END_TIME } from '../../../shared/domain/enums/maua_end_time_enum'
import {
  ViolateDataRule,
  DuplicatedItem,
  NoItemsFound,
} from '../../../shared/helpers/errors/repo_error'
import { Schedule } from '../../../shared/domain/entities/schedule'
import { Availability } from '../../../shared/domain/entities/availability'
import { AvFullfilled } from '../../../shared/domain/entities/avFullfilled'
import { ACADEMIC_PERIOD } from '../../../shared/domain/enums/academic_period_enum'

export class ScheduleRepositoryMock implements IScheduleRepository {
  // Mock Data
  // #region Users
  private users: User[] = [
    new User({
      id: 1,
      name: 'user1',
      email: 'user1@gmail.com',
      role: ROLE.STAFF,
      RA: '21.00000-1',
      password: 'Password1@',
    }),
    new User({
      id: 2,
      name: 'Pedro Henrique de Sousa Matumoto',
      email: 'pedromatumoto@gmail.com',
      role: ROLE.COORDINATOR,
      RA: '21.00784-5',
      password: 'Password2@',
    }),
    new User({
      // professor with 0 suitability
      id: 3,
      name: 'user3',
      email: 'user3@gmail.com',
      role: ROLE.PROFESSOR,
      RA: '33.00000-3',
      password: 'Password3@',
    }),
    new User({
      // professor with 1 suitability
      id: 4,
      name: 'user4',
      email: 'user4@gmail.com',
      role: ROLE.PROFESSOR,
      RA: '44.00000-4',
      password: 'Password4@',
    }),
    new User({
      // professor with 2 suitability
      id: 5,
      name: 'user5',
      email: 'user5@gmail.com',
      role: ROLE.PROFESSOR,
      RA: '55.00000-5',
      password: 'Password5@',
    }),
    new User({
      id: 6,
      name: 'PEDRO HENRIQUE DE SOUSA MATUMOTO',
      email: '21.00784-5@maua.br',
      role: ROLE.STAFF,
      RA: '21.00784-5',
      password: 'Password6@',
    }),
    new User({
      id: 7,
      name: 'JOAO VITOR CHOUERI BRANCO',
      email: '21.01075-7@maua.br',
      role: ROLE.PROFESSOR,
      RA: '21.01075-7',
      password: 'Password7@',
    })
  ]
  // #region classes
  private classes: Class[] = [
    new Class({
      id: '0a8c5357-1f07-5b24-9845-9318c47ab923',
      name: 'Linguagens de Programacao II',
      modality: MODALITY.IN_PERSON,
      classType: CLASSTYPE.THEORY,
      subjectCode: 'ECM256',
      scheduleId: '1S-2CIC-D4@2024(SCS)',
    }),
    new Class({
      id: '0a8c5357-1f07-5b24-9845-9318c47ab9aa',
      name: 'Linguagens de Programacao III',
      modality: MODALITY.IN_PERSON,
      classType: CLASSTYPE.THEORY,
      subjectCode: 'ECM111',
      scheduleId: '1S-2CIC-D4@2024(SCS)',
    }),
    new Class({
      id: '0a8c5357-1f07-5b24-9845-9318c47ac924',
      name: 'Linguagens de Programacao II',
      modality: MODALITY.IN_PERSON,
      classType: CLASSTYPE.THEORY,
      subjectCode: 'ECM256',
      scheduleId: '2S-4CM-D5@2024(SCS)',
    }),
    new Class({
      id: '0a8c5357-1f07-5b24-9845-9318c47ac925',
      name: 'Physics I',
      modality: MODALITY.REMOTE,
      classType: CLASSTYPE.THEORY,
      subjectCode: 'EFB207',
      scheduleId: '2S-3CM-D5@2024(SCS)',
    }),
    new Class({
      id: '0a8c5357-1f07-5b24-9845-9318c47ac926',
      name: 'Physics I',
      modality: MODALITY.IN_PERSON,
      classType: CLASSTYPE.LAB,
      subjectCode: 'EFB207',
      scheduleId: '2S-4CM-D5@2024(SCS)',
    }),
    new Class({
      id: '0a8c5357-1f07-5b24-9845-9318c47ac927',
      name: 'Linguagens de Programacao II',
      modality: MODALITY.HYBRID,
      classType: CLASSTYPE.THEORY,
      subjectCode: 'ECM256',
      scheduleId: '2S-4CM-D5@2024(SCS)',
    }),
  ]
  // #region subjects
  private subjects: Subject[] = [
    new Subject({
      code: 'ECM256',
      name: 'Programming Languages II',
      period: PERIOD.MORNING,
    }),
    new Subject({
      code: 'EFB207',
      name: 'Physics I',
      period: PERIOD.AFTERNOON,
    }),
  ]
  // #region suitabilities
  private suitabilities: Suitability[] = [
    new Suitability({
      userId: 4,
      codeSubject: 'ECM256',
    }),
    new Suitability({
      userId: 3,
      codeSubject: 'EFB207',
    }),
    new Suitability({
      userId: 3,
      codeSubject: 'ECM256',
    }),
  ]
  // #region schedules
  private schedules: Schedule[] = [
    new Schedule({
      scheduleId: '2S-4CM-D5@2024(SCS)',
      courseName: 'Compute Engineering',
      groupNumber: 1,
      userId: 2,
      academicPeriod: ACADEMIC_PERIOD.ANNUAL,
      courseGrade: 4,
    }),
    new Schedule({
      scheduleId: '2S-2CM-D5@2024(SCS)',
      courseName: 'Compute Engineering',
      groupNumber: 1,
      userId: 2,
      academicPeriod: ACADEMIC_PERIOD.ANNUAL,
      courseGrade: 2,
    }),
    new Schedule({
      scheduleId: '2S-3CM-D5@2024(SCS)',
      courseName: 'Compute Engineering',
      groupNumber: 1,
      userId: 2,
      academicPeriod: ACADEMIC_PERIOD.ANNUAL,
      courseGrade: 3,
    }),
    new Schedule({
      scheduleId: '1S-2CIC-D4@2024(SCS)',
      courseName: 'Cience Coputing',
      groupNumber: 1,
      userId: 2,
      academicPeriod: ACADEMIC_PERIOD.FIRST_SEMESTER,
      courseGrade: 2,
    }),
  ]
  // #region possibilities
  private possibilities: Possibility[] = [
    // MON - SAT | 07:40 - 13:00 | 2S-4CM-D5@2024(SCS)
    new Possibility({
      id: '113e4567-e89b-12d3-a456-426614174000',
      weekDay: WEEK_DAY.MON,
      startTime: MAUA_START_TIME.H07_40_09_20,
      endTime: MAUA_END_TIME.H07_40_09_20,
      scheduleId: '2S-4CM-D5@2024(SCS)',
    }),
    new Possibility({
      id: '123e4567-e89b-12d3-a456-426614174001',
      weekDay: WEEK_DAY.MON,
      startTime: MAUA_START_TIME.H09_30_11_10,
      endTime: MAUA_END_TIME.H09_30_11_10,
      scheduleId: '2S-4CM-D5@2024(SCS)',
    }),
    new Possibility({
      id: '133e4567-e89b-12d3-a456-426614174002',
      weekDay: WEEK_DAY.MON,
      startTime: MAUA_START_TIME.H11_20_13_00,
      endTime: MAUA_END_TIME.H11_20_13_00,
      scheduleId: '2S-4CM-D5@2024(SCS)',
    }),
    new Possibility({
      id: '143e4567-e89b-12d3-a456-426614174000',
      weekDay: WEEK_DAY.TUE,
      startTime: MAUA_START_TIME.H07_40_09_20,
      endTime: MAUA_END_TIME.H07_40_09_20,
      scheduleId: '2S-4CM-D5@2024(SCS)',
    }),
    new Possibility({
      id: '153e4567-e89b-12d3-a456-426614174001',
      weekDay: WEEK_DAY.TUE,
      startTime: MAUA_START_TIME.H09_30_11_10,
      endTime: MAUA_END_TIME.H09_30_11_10,
      scheduleId: '2S-4CM-D5@2024(SCS)',
    }),
    new Possibility({
      id: '163e4567-e89b-12d3-a456-426614174002',
      weekDay: WEEK_DAY.TUE,
      startTime: MAUA_START_TIME.H11_20_13_00,
      endTime: MAUA_END_TIME.H11_20_13_00,
      scheduleId: '2S-4CM-D5@2024(SCS)',
    }),
    new Possibility({
      id: '173e4567-e89b-12d3-a456-426614174000',
      weekDay: WEEK_DAY.WED,
      startTime: MAUA_START_TIME.H07_40_09_20,
      endTime: MAUA_END_TIME.H07_40_09_20,
      scheduleId: '2S-4CM-D5@2024(SCS)',
    }),
    new Possibility({
      id: '183e4567-e89b-12d3-a456-426614174001',
      weekDay: WEEK_DAY.WED,
      startTime: MAUA_START_TIME.H09_30_11_10,
      endTime: MAUA_END_TIME.H09_30_11_10,
      scheduleId: '2S-4CM-D5@2024(SCS)',
    }),
    new Possibility({
      id: '193e4567-e89b-12d3-a456-426614174002',
      weekDay: WEEK_DAY.WED,
      startTime: MAUA_START_TIME.H11_20_13_00,
      endTime: MAUA_END_TIME.H11_20_13_00,
      scheduleId: '2S-4CM-D5@2024(SCS)',
    }),
    new Possibility({
      id: '103e4567-e89b-12d3-a456-426614174000',
      weekDay: WEEK_DAY.THU,
      startTime: MAUA_START_TIME.H07_40_09_20,
      endTime: MAUA_END_TIME.H07_40_09_20,
      scheduleId: '2S-4CM-D5@2024(SCS)',
    }),
    new Possibility({
      id: '121e4567-e89b-12d3-a456-426614174001',
      weekDay: WEEK_DAY.THU,
      startTime: MAUA_START_TIME.H09_30_11_10,
      endTime: MAUA_END_TIME.H09_30_11_10,
      scheduleId: '2S-4CM-D5@2024(SCS)',
    }),
    new Possibility({
      id: '122e4567-e89b-12d3-a456-426614174002',
      weekDay: WEEK_DAY.THU,
      startTime: MAUA_START_TIME.H11_20_13_00,
      endTime: MAUA_END_TIME.H11_20_13_00,
      scheduleId: '2S-4CM-D5@2024(SCS)',
    }),
    new Possibility({
      id: '124e4567-e89b-12d3-a456-426614174000',
      weekDay: WEEK_DAY.FRI,
      startTime: MAUA_START_TIME.H07_40_09_20,
      endTime: MAUA_END_TIME.H07_40_09_20,
      scheduleId: '2S-4CM-D5@2024(SCS)',
    }),
    new Possibility({
      id: '125e4567-e89b-12d3-a456-426614174001',
      weekDay: WEEK_DAY.FRI,
      startTime: MAUA_START_TIME.H09_30_11_10,
      endTime: MAUA_END_TIME.H09_30_11_10,
      scheduleId: '2S-4CM-D5@2024(SCS)',
    }),
    new Possibility({
      id: '126e4567-e89b-12d3-a456-426614174002',
      weekDay: WEEK_DAY.FRI,
      startTime: MAUA_START_TIME.H11_20_13_00,
      endTime: MAUA_END_TIME.H11_20_13_00,
      scheduleId: '2S-4CM-D5@2024(SCS)',
    }),
    new Possibility({
      id: '127e4567-e89b-12d3-a456-426614174000',
      weekDay: WEEK_DAY.SAT,
      startTime: MAUA_START_TIME.H07_40_09_20,
      endTime: MAUA_END_TIME.H07_40_09_20,
      scheduleId: '2S-4CM-D5@2024(SCS)',
    }),
    new Possibility({
      id: '128e4567-e89b-12d3-a456-426614174001',
      weekDay: WEEK_DAY.SAT,
      startTime: MAUA_START_TIME.H09_30_11_10,
      endTime: MAUA_END_TIME.H09_30_11_10,
      scheduleId: '2S-4CM-D5@2024(SCS)',
    }),
    new Possibility({
      id: '129e4567-e89b-12d3-a456-426614174002',
      weekDay: WEEK_DAY.SAT,
      startTime: MAUA_START_TIME.H11_20_13_00,
      endTime: MAUA_END_TIME.H11_20_13_00,
      scheduleId: '2S-4CM-D5@2024(SCS)',
    }),

    // MON - FRI | 07:40 - 11:20 | 2S-3CM-D5@2024(SCS)
    new Possibility({
      id: 'a13e4567-e89b-12d3-a456-426614174000',
      weekDay: WEEK_DAY.MON,
      startTime: MAUA_START_TIME.H07_40_09_20,
      endTime: MAUA_END_TIME.H07_40_09_20,
      scheduleId: '2S-3CM-D5@2024(SCS)',
    }),
    new Possibility({
      id: 'a23e4567-e89b-12d3-a456-426614174001',
      weekDay: WEEK_DAY.MON,
      startTime: MAUA_START_TIME.H09_30_11_10,
      endTime: MAUA_END_TIME.H09_30_11_10,
      scheduleId: '2S-3CM-D5@2024(SCS)',
    }),
    new Possibility({
      id: 'a33e4567-e89b-12d3-a456-426614174002',
      weekDay: WEEK_DAY.MON,
      startTime: MAUA_START_TIME.H11_20_13_00,
      endTime: MAUA_END_TIME.H11_20_13_00,
      scheduleId: '2S-3CM-D5@2024(SCS)',
    }),
    new Possibility({
      id: 'a43e4567-e89b-12d3-a456-426614174000',
      weekDay: WEEK_DAY.TUE,
      startTime: MAUA_START_TIME.H07_40_09_20,
      endTime: MAUA_END_TIME.H07_40_09_20,
      scheduleId: '2S-3CM-D5@2024(SCS)',
    }),
    new Possibility({
      id: 'a53e4567-e89b-12d3-a456-426614174001',
      weekDay: WEEK_DAY.TUE,
      startTime: MAUA_START_TIME.H09_30_11_10,
      endTime: MAUA_END_TIME.H09_30_11_10,
      scheduleId: '2S-3CM-D5@2024(SCS)',
    }),
    new Possibility({
      id: 'a63e4567-e89b-12d3-a456-426614174002',
      weekDay: WEEK_DAY.TUE,
      startTime: MAUA_START_TIME.H11_20_13_00,
      endTime: MAUA_END_TIME.H11_20_13_00,
      scheduleId: '2S-3CM-D5@2024(SCS)',
    }),
    new Possibility({
      id: 'a73e4567-e89b-12d3-a456-426614174000',
      weekDay: WEEK_DAY.WED,
      startTime: MAUA_START_TIME.H07_40_09_20,
      endTime: MAUA_END_TIME.H07_40_09_20,
      scheduleId: '2S-3CM-D5@2024(SCS)',
    }),
    new Possibility({
      id: 'a83e4567-e89b-12d3-a456-426614174001',
      weekDay: WEEK_DAY.WED,
      startTime: MAUA_START_TIME.H09_30_11_10,
      endTime: MAUA_END_TIME.H09_30_11_10,
      scheduleId: '2S-3CM-D5@2024(SCS)',
    }),
    new Possibility({
      id: 'b13e4567-e89b-12d3-a456-426614174002',
      weekDay: WEEK_DAY.WED,
      startTime: MAUA_START_TIME.H11_20_13_00,
      endTime: MAUA_END_TIME.H11_20_13_00,
      scheduleId: '2S-3CM-D5@2024(SCS)',
    }),
    new Possibility({
      id: 'b23e4567-e89b-12d3-a456-426614174000',
      weekDay: WEEK_DAY.THU,
      startTime: MAUA_START_TIME.H07_40_09_20,
      endTime: MAUA_END_TIME.H07_40_09_20,
      scheduleId: '2S-3CM-D5@2024(SCS)',
    }),
    new Possibility({
      id: 'b33e4567-e89b-12d3-a456-426614174001',
      weekDay: WEEK_DAY.THU,
      startTime: MAUA_START_TIME.H09_30_11_10,
      endTime: MAUA_END_TIME.H09_30_11_10,
      scheduleId: '2S-3CM-D5@2024(SCS)',
    }),
    new Possibility({
      id: 'b43e4567-e89b-12d3-a456-426614174002',
      weekDay: WEEK_DAY.THU,
      startTime: MAUA_START_TIME.H11_20_13_00,
      endTime: MAUA_END_TIME.H11_20_13_00,
      scheduleId: '2S-3CM-D5@2024(SCS)',
    }),
    new Possibility({
      id: 'b53e4567-e89b-12d3-a456-426614174000',
      weekDay: WEEK_DAY.FRI,
      startTime: MAUA_START_TIME.H07_40_09_20,
      endTime: MAUA_END_TIME.H07_40_09_20,
      scheduleId: '2S-3CM-D5@2024(SCS)',
    }),
    new Possibility({
      id: 'b63e4567-e89b-12d3-a456-426614174001',
      weekDay: WEEK_DAY.FRI,
      startTime: MAUA_START_TIME.H09_30_11_10,
      endTime: MAUA_END_TIME.H09_30_11_10,
      scheduleId: '2S-3CM-D5@2024(SCS)',
    }),
    new Possibility({
      id: 'b73e4567-e89b-12d3-a456-426614174002',
      weekDay: WEEK_DAY.FRI,
      startTime: MAUA_START_TIME.H11_20_13_00,
      endTime: MAUA_END_TIME.H11_20_13_00,
      scheduleId: '2S-3CM-D5@2024(SCS)',
    }),
  ]
  // #region availabilities
  private availabilities: Availability[] = [
    // Professor com userId = 3, todos os dias com H07_40_09_20 e H09_30_11_10
    new Availability({
      id: '0a8c5357-1f07-5b24-9845-9318c4000000',
      userId: 3,
      startTime: MAUA_START_TIME.H07_40_09_20,
      endTime: MAUA_END_TIME.H07_40_09_20,
      isTaken: false,
      weekDay: WEEK_DAY.MON,
    }),
    new Availability({
      id: '0a8c5357-1f07-5b24-9845-9318c4000001',
      userId: 3,
      startTime: MAUA_START_TIME.H09_30_11_10,
      endTime: MAUA_END_TIME.H09_30_11_10,
      isTaken: false,
      weekDay: WEEK_DAY.MON,
    }),
    new Availability({
      id: '0a8c5357-1f07-5b24-9845-9318c4000002',
      userId: 3,
      startTime: MAUA_START_TIME.H07_40_09_20,
      endTime: MAUA_END_TIME.H07_40_09_20,
      isTaken: false,
      weekDay: WEEK_DAY.TUE,
    }),
    new Availability({
      id: '0a8c5357-1f07-5b24-9845-9318c4000003',
      userId: 3,
      startTime: MAUA_START_TIME.H09_30_11_10,
      endTime: MAUA_END_TIME.H09_30_11_10,
      isTaken: false,
      weekDay: WEEK_DAY.TUE,
    }),
    new Availability({
      id: '0a8c5357-1f07-5b24-9845-9318c4000004',
      userId: 3,
      startTime: MAUA_START_TIME.H07_40_09_20,
      endTime: MAUA_END_TIME.H07_40_09_20,
      isTaken: false,
      weekDay: WEEK_DAY.WED,
    }),
    new Availability({
      id: '0a8c5357-1f07-5b24-9845-9318c4000005',
      userId: 3,
      startTime: MAUA_START_TIME.H09_30_11_10,
      endTime: MAUA_END_TIME.H09_30_11_10,
      isTaken: false,
      weekDay: WEEK_DAY.WED,
    }),
    new Availability({
      id: '0a8c5357-1f07-5b24-9845-9318c4000006',
      userId: 3,
      startTime: MAUA_START_TIME.H07_40_09_20,
      endTime: MAUA_END_TIME.H07_40_09_20,
      isTaken: false,
      weekDay: WEEK_DAY.THU,
    }),
    new Availability({
      id: '0a8c5357-1f07-5b24-9845-9318c4000007',
      userId: 3,
      startTime: MAUA_START_TIME.H09_30_11_10,
      endTime: MAUA_END_TIME.H09_30_11_10,
      isTaken: false,
      weekDay: WEEK_DAY.THU,
    }),
    new Availability({
      id: '0a8c5357-1f07-5b24-9845-9318c4000008',
      userId: 3,
      startTime: MAUA_START_TIME.H07_40_09_20,
      endTime: MAUA_END_TIME.H07_40_09_20,
      isTaken: false,
      weekDay: WEEK_DAY.FRI,
    }),
    new Availability({
      id: '0a8c5357-1f07-5b24-9845-9318c4000009',
      userId: 3,
      startTime: MAUA_START_TIME.H09_30_11_10,
      endTime: MAUA_END_TIME.H09_30_11_10,
      isTaken: true,
      weekDay: WEEK_DAY.FRI,
    }),

    // Professor com userId = 4, apenas segunda-feira, em todos os horários
    new Availability({
      id: '0a8c5357-1f07-5b24-9845-9318c400000a',
      userId: 4,
      startTime: MAUA_START_TIME.H07_40_09_20,
      endTime: MAUA_END_TIME.H07_40_09_20,
      isTaken: true,
      weekDay: WEEK_DAY.MON,
    }),
    new Availability({
      id: '0a8c5357-1f07-5b24-9845-9318c400000b',
      userId: 4,
      startTime: MAUA_START_TIME.H09_30_11_10,
      endTime: MAUA_END_TIME.H09_30_11_10,
      isTaken: false,
      weekDay: WEEK_DAY.MON,
    }),
    new Availability({
      id: '0a8c5357-1f07-5b24-9845-9318c400000c',
      userId: 4,
      startTime: MAUA_START_TIME.H11_20_13_00,
      endTime: MAUA_END_TIME.H11_20_13_00,
      isTaken: false,
      weekDay: WEEK_DAY.MON,
    }),
    new Availability({
      id: '0a8c5357-1f07-5b24-9845-9318c400000d',
      userId: 4,
      startTime: MAUA_START_TIME.H13_10_14_50,
      endTime: MAUA_END_TIME.H13_10_14_50,
      isTaken: false,
      weekDay: WEEK_DAY.MON,
    }),
    new Availability({
      id: '0a8c5357-1f07-5b24-9845-9318c400000e',
      userId: 4,
      startTime: MAUA_START_TIME.H15_00_16_40,
      endTime: MAUA_END_TIME.H15_00_16_40,
      isTaken: false,
      weekDay: WEEK_DAY.MON,
    }),
    new Availability({
      id: '0a8c5357-1f07-5b24-9845-9318c400000f',
      userId: 4,
      startTime: MAUA_START_TIME.H16_50_18_30,
      endTime: MAUA_END_TIME.H16_50_18_30,
      isTaken: false,
      weekDay: WEEK_DAY.MON,
    }),
    new Availability({
      id: '0a8c5357-1f07-5b24-9845-9318c4000010',
      userId: 4,
      startTime: MAUA_START_TIME.H19_00_20_40,
      endTime: MAUA_END_TIME.H19_00_20_40,
      isTaken: false,
      weekDay: WEEK_DAY.MON,
    }),
    new Availability({
      id: '0a8c5357-1f07-5b24-9845-9318c4000011',
      userId: 4,
      startTime: MAUA_START_TIME.H20_50_22_30,
      endTime: MAUA_END_TIME.H20_50_22_30,
      isTaken: false,
      weekDay: WEEK_DAY.MON,
    }),
  ]
  // #region avFullfilled
  private avsFullfilled: AvFullfilled[] = [
    /* 
      professor with userId=4 
      will teach Linguagens de Programacao II 
      from 07:40 to 09:20 on Monday 
      for course 2S-4CM-D5@2024(SCS)
    */
    new AvFullfilled({
      availabilityId: '0a8c5357-1f07-5b24-9845-9318c400000a',
      possibilityId: '113e4567-e89b-12d3-a456-426614174000',
      classId: '0a8c5357-1f07-5b24-9845-9318c47ac924',
    }),
    /* 
      professor with userId=3
      will teach Physics I
      from 09:30 to 11:10 on Friday 
      for course 2S-3CM-D5@2024(SCS)
    */
    new AvFullfilled({
      availabilityId: '0a8c5357-1f07-5b24-9845-9318c4000009',
      possibilityId: 'b63e4567-e89b-12d3-a456-426614174001',
      classId: '0a8c5357-1f07-5b24-9845-9318c47ac925',
    }),
  ]

  // #region User methods
  getUsersLength(): number {
    return this.users.length
  }

  async getUser(id: number): Promise<User> {
    const user = this.users.find((user) => user.id === id)
    if (!user) {
      throw new NoItemsFound('userId')
    }
    return user
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email)
    if (!user) {
      throw new NoItemsFound('email')
    }
    return user
  }
  async getRoleByEmail(email: string): Promise<ROLE | null> {
    const user = this.users.find((user) => user.email === email)
    if (!user) {
      return null
    }
    return user.role
  }
  async getAllUsers(): Promise<User[]> {
    return this.users
  }

  async createUser(user: User): Promise<User> {
    const exists = this.users.find((u) => u.id === user.id)
    if (exists) {
      throw new DuplicatedItem('userId')
    }
    this.users.push(user)
    return user
  }

  async updateUser(
    id: number,
    newName: string,
    newEmail: string,
  ): Promise<User> {
    const user = this.users.find((user) => user.id === id)
    if (!user) {
      throw new NoItemsFound('id')
    }
    user.setName = newName
    user.setEmail = newEmail
    return user
  }

  async deleteUser(id: number): Promise<User> {
    const user = this.users.find((user) => user.id === id)
    if (!user) {
      throw new NoItemsFound('id')
    }
    this.users = this.users.filter((user) => user.id !== id)
    return user
  }

  async loginUser(email: string, password: string): Promise<User | null> {
    const user = this.users.find(
      (user) => user.email === email && user.password === password,
    )
    return user || null
  }

  async getUsersByRole(role: ROLE): Promise<User[]> {
    const users = this.users.filter((user) => user.role === role)
    return users
  }

  async getProfessorsByClass(classId: string): Promise<User[]> {

    const foundClass = this.getClass(classId);

  
    const subjectCode = (await foundClass).subjectCode;


    const suitableUsers = this.suitabilities
      .filter(suitability => suitability.codeSubject === subjectCode)
      .map(suitability => this.users.find(user => user.id === suitability.userId))
      .filter((user): user is User => user !== undefined); 

    return suitableUsers;
  }

  async getUsersWithAvailabilitiesAndSuitabilities(
    userIds: number[]
  ): Promise<
    Record<
      number,
      {
        user: User;
        suitabilities: Suitability[];
        availabilities: { data: Availability; scheduleFullfilled: string | undefined }[];
      }
    >
  > {
    // Filter users based on the provided userIds
    const users = this.users.filter((user) => userIds.includes(user.id));
  
    // Check if all userIds exist
    if (users.length !== userIds.length) {
      throw new NoItemsFound('userId');
    }
  
    // Ensure users are not STAFF
    users.forEach((user) => {
      if (user.role === ROLE.STAFF) {
        throw new ViolateDataRule('user must be a professor');
      }
    });
  
    // Create the result object
    const result: Record<
      number,
      {
        user: User;
        suitabilities: Suitability[];
        availabilities: { data: Availability; scheduleFullfilled: string | undefined }[];
      }
    > = {};
  
    // Process each user
    for (const user of users) {
      // Fetch suitabilities and availabilities for the current user
      const suitabilities = this.suitabilities.filter((suitability) => suitability.userId === user.id);
      const availabilities = this.availabilities.filter((availability) => availability.userId === user.id);
  
      // Check each availability for fulfilled schedules
      const availabilitiesWithFullfilled = await Promise.all(
        availabilities.map(async (availability) => {
          const avFullfilled = this.avsFullfilled.find(
            (item) => item.availabilityId === availability.availabilityId
          );
  
          if (!avFullfilled) {
            return {
              data: availability,
              scheduleFullfilled: undefined,
            };
          }
  
          const classId = avFullfilled.classId;
          const specificClass = this.classes.find((c) => c.id === classId);
  
          return {
            data: availability,
            scheduleFullfilled: specificClass?.scheduleId,
          };
        })
      );
  
      // Store the data in the result object
      result[user.id] = {
        user,
        suitabilities,
        availabilities: availabilitiesWithFullfilled,
      };
    }
  
    return result;
  }

  // #region Class methods
  getClassesLength(): number {
    return this.classes.length
  }

  async getClass(classId: string): Promise<Class> {
    const selectedClass = this.classes.find((c) => c.id === classId)
    if (!selectedClass) {
      throw new NoItemsFound('classId')
    }
    return selectedClass
  }

  async getAllClasses(): Promise<Class[]> {
    return this.classes
  }

  async createClass(newClass: Class): Promise<Class> {
    const exists = this.classes.find((c) => c.id === newClass.id)
    if (exists) {
      throw new DuplicatedItem('Class')
    }
    this.classes.push(newClass)
    return newClass
  }

  async getClassesByIds(classesIds: string[]): Promise<Record<string, Class>> {
    const classes = this.classes.filter((c) => classesIds.includes(c.id))
    
    // check if some class does not exist
    if (classes.length !== classesIds.length) {
      throw new NoItemsFound('classId')
    }

    // format the data
    return classes.reduce<Record<string, Class>>((acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {});
  }

  // #region Subject methods
  getSubjectsLength(): number {
    return this.subjects.length
  }

  async getSubject(code: string): Promise<Subject> {
    const subject = this.subjects.find((subject) => subject.code === code)
    if (!subject) {
      throw new NoItemsFound('codeSubject')
    }
    return subject
  }

  async getAllSubjects(): Promise<Subject[]> {
    return this.subjects
  }
  

  async createSubject(subject: Subject): Promise<Subject> {
    const exists = this.subjects.find((s) => s.code === subject.code)
    if (exists) {
      throw new DuplicatedItem('Subject')
    }
    this.subjects.push(subject)
    return subject
  }
  // #region Suitability methods
  getSuitabilitiesLength(): number {
    return this.suitabilities.length
  }

  async getAllSuitabilities(): Promise<Suitability[]> {
    return this.suitabilities
  }

  async createSuitability(suitability: Suitability): Promise<Suitability> {
    // Check if the suitability already exists
    const exists = this.suitabilities.find(
      (s) =>
        s.userId === suitability.userId &&
        s.codeSubject === suitability.codeSubject,
    )
    if (exists) {
      throw new DuplicatedItem('Suitability')
    }

    // Check if the user exists
    const user = await this.getUser(suitability.userId)

    // Check if the user is a professor
    if (user.role === ROLE.STAFF) {
      throw new ViolateDataRule('user must be a professor or coordinator')
    }

    // Check if the subject exists
    await this.getSubject(suitability.codeSubject)

    this.suitabilities.push(suitability)

    return Promise.resolve(suitability)
  }

  async deleteSuitabilityByUserId(userId: number): Promise<Suitability[]> {
    const suitabilities = this.suitabilities.filter((s) => s.userId !== userId)
    this.suitabilities = suitabilities
    return suitabilities
  }

  async getSuitabilitiesByUserId(userId: number): Promise<Suitability[]> {
    const suitabilities = this.suitabilities.filter((s) => s.userId === userId)

    return suitabilities
  }

  // #region Schedule methods
  getSchedulesLength(): number {
    return this.schedules.length
  }

  async getSchedule(id: string, groupNumber: number): Promise<Schedule> {
    const schedule = this.schedules.find(
      (schedule) =>
        schedule.scheduleId === id && schedule.groupNumber === groupNumber,
    )
    if (!schedule) {
      throw new NoItemsFound('scheduleId')
    }
    return schedule
  }

  async getAllSchedules(): Promise<Schedule[]> {
    return this.schedules
  }

  async createSchedule(schedule: Schedule): Promise<Schedule> {
    const exists = this.schedules.find(
      (s) => s.scheduleId === schedule.scheduleId,
    )
    if (exists) {
      throw new DuplicatedItem('Schedule')
    }

    const user = await this.getUser(schedule.userId)
    if (user.role !== ROLE.COORDINATOR) {
      throw new ViolateDataRule('user must be a coordinator')
    }

    this.schedules.push(schedule)
    return schedule
  }

  // #region Possibility methods
  getPossibilitiesLength(): number {
    return this.possibilities.length
  }

  async getPossibility(possibilityId: string): Promise<Possibility> {
    const possibility = this.possibilities.find(
      (possibility) => possibility.id === possibilityId,
    )
    if (!possibility) {
      throw new NoItemsFound('possibilityId')
    }
    return possibility
  }

  async getAllPossibilities(): Promise<Possibility[]> {
    return this.possibilities
  }

  async createPossibility(possibility: Possibility): Promise<Possibility> {
    const exists = this.possibilities.find((p) => p.id === possibility.id)
    if (exists) {
      throw new DuplicatedItem('id')
    }

    await this.getSchedule(possibility.scheduleId, 1)

    this.possibilities.push(possibility)
    return possibility
  }

  async getPossibilitiesByIds(possibilitiesIds: string[]): Promise<Record<string, Possibility>>{
    const possibilities = this.possibilities.filter((p) => possibilitiesIds.includes(p.id))
    
    // check if some possibility does not exist
    if (possibilities.length !== possibilitiesIds.length) {
      throw new NoItemsFound('possibilityId')
    }

    // format the data
    return possibilities.reduce<Record<string, Possibility>>((acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {});
  }
  
  // #region Availability methods
  getAvailabilitiesLength(): number {
    return this.availabilities.length
  }

  async getAvailability(id: string): Promise<Availability> {
    const availability = this.availabilities.find(
      (availability) => availability.availabilityId === id,
    )
    if (!availability) {
      throw new NoItemsFound('availabilityId')
    }
    return availability
  }

  async getAllAvailabilities(): Promise<Availability[]> {
    return this.availabilities
  }

  async getAvailabilitiesByUserId(userId: number): Promise<Availability[]> {
    return this.availabilities.filter((a) => a.userId === userId)
  }

  async deleteAvailability(id: string): Promise<Availability> {
    const availability = this.availabilities.find(
      (availability) => availability.availabilityId === id,
    )
    if (!availability) {
      throw new NoItemsFound('availabilityId')
    }
    this.availabilities = this.availabilities.filter(
      (availability) => availability.availabilityId !== id,
    )
    return availability
  }

  async createAvailability(availability: Availability): Promise<Availability> {
    const exists = this.availabilities.find(
      (a) => a.availabilityId === availability.availabilityId,
    )
    if (exists) {
      throw new DuplicatedItem('availabilityId')
    }

    const user = await this.getUser(availability.userId)

    if (user.role !== ROLE.PROFESSOR && user.role !== ROLE.COORDINATOR) {
      throw new ViolateDataRule('user must be a professor')
    }

    this.availabilities.push(availability)
    return availability
  }

  // #region AvFullfilled methods
  getAvsFullfilledLength(): number {
    return this.avsFullfilled.length
  }

  async getAllAvsFullfilled(): Promise<AvFullfilled[]> {
    return this.avsFullfilled
  }

  async createAvFullfilled(avFullfilled: AvFullfilled): Promise<AvFullfilled> {
    const availability = await this.getAvailability(avFullfilled.availabilityId) // availability exists?
    const possibility = await this.getPossibility(avFullfilled.possibilityId) // possibility exists?
    const selectedClass = await this.getClass(avFullfilled.classId) // class exists?

    if (availability.isTaken) {
      throw new ViolateDataRule('Availability is already taken')
    }
    if (possibility.scheduleId !== selectedClass.scheduleId) {
      throw new ViolateDataRule(
        'Possibility and Class must have the same scheduleId',
      )
    }
    if (
      possibility.startTime !== availability.startTime ||
      possibility.endTime !== availability.endTime
    ) {
      throw new ViolateDataRule(
        'Possibility and Availability must have the same startTime and endTime',
      )
    }
    if (possibility.weekDay !== availability.weekDay) {
      throw new ViolateDataRule(
        'Possibility and Availability must have the same weekDay',
      )
    }

    availability.isTaken = true

    this.avsFullfilled.push(avFullfilled)
    return avFullfilled
  }

  async createAvsFullfilled(avsFullfilled: AvFullfilled[]): Promise<AvFullfilled[]>{
    for (const avFullfilled of avsFullfilled) {
      await this.createAvFullfilled(avFullfilled)
    }
    return avsFullfilled
  }

  async deleteAvsFullfilledByScheduleId(scheduleId: string): Promise<AvFullfilled[]>{
    const avsFullfilled = this.avsFullfilled.filter((avFullfilled) => {
      const possibility = this.possibilities.find((p) => p.id === avFullfilled.possibilityId)
      return possibility?.scheduleId !== scheduleId
    })
    const avsFullfilledIds = avsFullfilled.map((avFullfilled) => avFullfilled.availabilityId)
    this.availabilities.forEach((availability) => {
      if (!avsFullfilledIds.includes(availability.availabilityId)) {
        availability.isTaken = false
      }
    })
    this.avsFullfilled = avsFullfilled
    return avsFullfilled
  }
}
