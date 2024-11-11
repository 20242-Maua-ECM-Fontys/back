import { describe, it, expect } from 'vitest'
import { GetSchedulesByCoordinatorViewmodel } from '../../../../src/modules/get_schedules_by_coordinator/app/get_schedules_by_coordinator_viewmodel'
import { GetSchedulesByCoordinatorUsecase } from '../../../../src/modules/get_schedules_by_coordinator/app/get_schedules_by_coordinator_usecase'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'

describe('GetSchedulesByCoordinatorUsecase tests', () => {
  it('Should return a list of schedules', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetSchedulesByCoordinatorUsecase(repo)
    const response = await usecase.execute(2)
    const viewmodel = new GetSchedulesByCoordinatorViewmodel(response)
    //console.log(JSON.stringify(viewmodel.toJSON()))
    expect(viewmodel.toJSON()).toEqual({
      message: 'schedules by coordinator returned',
      schedules: [
        {
          schedule: {
            id: '2S-4CM-D5@2024(SCS)',
            userId: 2,
            courseName: 'Compute Engineering',
            groupNumber: 1,
            academicPeriod: 'ANNUAL',
            courseGrade: 4,
            classes: [
              {
                id: '0a8c5357-1f07-5b24-9845-9318c47ac924',
                name: 'Linguagens de Programacao II',
                modality: 'IN_PERSON',
                classType: 'THEORY',
                subjectCode: 'ECM256',
                scheduleId: '2S-4CM-D5@2024(SCS)',
              },
              {
                id: '0a8c5357-1f07-5b24-9845-9318c47ac926',
                name: 'Physics I',
                modality: 'IN_PERSON',
                classType: 'LAB',
                subjectCode: 'EFB207',
                scheduleId: '2S-4CM-D5@2024(SCS)',
              },
            ],
            possibilities: [
              {
                id: '113e4567-e89b-12d3-a456-426614174000',
                weekDay: 'MON',
                startTime: 460,
                endTime: 560,
                scheduleId: '2S-4CM-D5@2024(SCS)',
              },
              {
                id: '123e4567-e89b-12d3-a456-426614174001',
                weekDay: 'MON',
                startTime: 570,
                endTime: 670,
                scheduleId: '2S-4CM-D5@2024(SCS)',
              },
              {
                id: '133e4567-e89b-12d3-a456-426614174002',
                weekDay: 'MON',
                startTime: 680,
                endTime: 780,
                scheduleId: '2S-4CM-D5@2024(SCS)',
              },
              {
                id: '143e4567-e89b-12d3-a456-426614174000',
                weekDay: 'TUE',
                startTime: 460,
                endTime: 560,
                scheduleId: '2S-4CM-D5@2024(SCS)',
              },
              {
                id: '153e4567-e89b-12d3-a456-426614174001',
                weekDay: 'TUE',
                startTime: 570,
                endTime: 670,
                scheduleId: '2S-4CM-D5@2024(SCS)',
              },
              {
                id: '163e4567-e89b-12d3-a456-426614174002',
                weekDay: 'TUE',
                startTime: 680,
                endTime: 780,
                scheduleId: '2S-4CM-D5@2024(SCS)',
              },
              {
                id: '173e4567-e89b-12d3-a456-426614174000',
                weekDay: 'WED',
                startTime: 460,
                endTime: 560,
                scheduleId: '2S-4CM-D5@2024(SCS)',
              },
              {
                id: '183e4567-e89b-12d3-a456-426614174001',
                weekDay: 'WED',
                startTime: 570,
                endTime: 670,
                scheduleId: '2S-4CM-D5@2024(SCS)',
              },
              {
                id: '193e4567-e89b-12d3-a456-426614174002',
                weekDay: 'WED',
                startTime: 680,
                endTime: 780,
                scheduleId: '2S-4CM-D5@2024(SCS)',
              },
              {
                id: '103e4567-e89b-12d3-a456-426614174000',
                weekDay: 'THU',
                startTime: 460,
                endTime: 560,
                scheduleId: '2S-4CM-D5@2024(SCS)',
              },
              {
                id: '121e4567-e89b-12d3-a456-426614174001',
                weekDay: 'THU',
                startTime: 570,
                endTime: 670,
                scheduleId: '2S-4CM-D5@2024(SCS)',
              },
              {
                id: '122e4567-e89b-12d3-a456-426614174002',
                weekDay: 'THU',
                startTime: 680,
                endTime: 780,
                scheduleId: '2S-4CM-D5@2024(SCS)',
              },
              {
                id: '124e4567-e89b-12d3-a456-426614174000',
                weekDay: 'FRI',
                startTime: 460,
                endTime: 560,
                scheduleId: '2S-4CM-D5@2024(SCS)',
              },
              {
                id: '125e4567-e89b-12d3-a456-426614174001',
                weekDay: 'FRI',
                startTime: 570,
                endTime: 670,
                scheduleId: '2S-4CM-D5@2024(SCS)',
              },
              {
                id: '126e4567-e89b-12d3-a456-426614174002',
                weekDay: 'FRI',
                startTime: 680,
                endTime: 780,
                scheduleId: '2S-4CM-D5@2024(SCS)',
              },
              {
                id: '127e4567-e89b-12d3-a456-426614174000',
                weekDay: 'SAT',
                startTime: 460,
                endTime: 560,
                scheduleId: '2S-4CM-D5@2024(SCS)',
              },
              {
                id: '128e4567-e89b-12d3-a456-426614174001',
                weekDay: 'SAT',
                startTime: 570,
                endTime: 670,
                scheduleId: '2S-4CM-D5@2024(SCS)',
              },
              {
                id: '129e4567-e89b-12d3-a456-426614174002',
                weekDay: 'SAT',
                startTime: 680,
                endTime: 780,
                scheduleId: '2S-4CM-D5@2024(SCS)',
              },
            ],
          },
        },
        {
          schedule: {
            id: '2S-2CM-D5@2024(SCS)',
            userId: 2,
            courseName: 'Compute Engineering',
            groupNumber: 1,
            academicPeriod: 'ANNUAL',
            courseGrade: 2,
            classes: [],
            possibilities: [],
          },
        },
        {
          schedule: {
            id: '2S-3CM-D5@2024(SCS)',
            userId: 2,
            courseName: 'Compute Engineering',
            groupNumber: 1,
            academicPeriod: 'ANNUAL',
            courseGrade: 3,
            classes: [
              {
                id: '0a8c5357-1f07-5b24-9845-9318c47ac925',
                name: 'Physics I',
                modality: 'REMOTE',
                classType: 'THEORY',
                subjectCode: 'EFB207',
                scheduleId: '2S-3CM-D5@2024(SCS)',
              },
            ],
            possibilities: [
              {
                id: 'a13e4567-e89b-12d3-a456-426614174000',
                weekDay: 'MON',
                startTime: 460,
                endTime: 560,
                scheduleId: '2S-3CM-D5@2024(SCS)',
              },
              {
                id: 'a23e4567-e89b-12d3-a456-426614174001',
                weekDay: 'MON',
                startTime: 570,
                endTime: 670,
                scheduleId: '2S-3CM-D5@2024(SCS)',
              },
              {
                id: 'a33e4567-e89b-12d3-a456-426614174002',
                weekDay: 'MON',
                startTime: 680,
                endTime: 780,
                scheduleId: '2S-3CM-D5@2024(SCS)',
              },
              {
                id: 'a43e4567-e89b-12d3-a456-426614174000',
                weekDay: 'TUE',
                startTime: 460,
                endTime: 560,
                scheduleId: '2S-3CM-D5@2024(SCS)',
              },
              {
                id: 'a53e4567-e89b-12d3-a456-426614174001',
                weekDay: 'TUE',
                startTime: 570,
                endTime: 670,
                scheduleId: '2S-3CM-D5@2024(SCS)',
              },
              {
                id: 'a63e4567-e89b-12d3-a456-426614174002',
                weekDay: 'TUE',
                startTime: 680,
                endTime: 780,
                scheduleId: '2S-3CM-D5@2024(SCS)',
              },
              {
                id: 'a73e4567-e89b-12d3-a456-426614174000',
                weekDay: 'WED',
                startTime: 460,
                endTime: 560,
                scheduleId: '2S-3CM-D5@2024(SCS)',
              },
              {
                id: 'a83e4567-e89b-12d3-a456-426614174001',
                weekDay: 'WED',
                startTime: 570,
                endTime: 670,
                scheduleId: '2S-3CM-D5@2024(SCS)',
              },
              {
                id: 'b13e4567-e89b-12d3-a456-426614174002',
                weekDay: 'WED',
                startTime: 680,
                endTime: 780,
                scheduleId: '2S-3CM-D5@2024(SCS)',
              },
              {
                id: 'b23e4567-e89b-12d3-a456-426614174000',
                weekDay: 'THU',
                startTime: 460,
                endTime: 560,
                scheduleId: '2S-3CM-D5@2024(SCS)',
              },
              {
                id: 'b33e4567-e89b-12d3-a456-426614174001',
                weekDay: 'THU',
                startTime: 570,
                endTime: 670,
                scheduleId: '2S-3CM-D5@2024(SCS)',
              },
              {
                id: 'b43e4567-e89b-12d3-a456-426614174002',
                weekDay: 'THU',
                startTime: 680,
                endTime: 780,
                scheduleId: '2S-3CM-D5@2024(SCS)',
              },
              {
                id: 'b53e4567-e89b-12d3-a456-426614174000',
                weekDay: 'FRI',
                startTime: 460,
                endTime: 560,
                scheduleId: '2S-3CM-D5@2024(SCS)',
              },
              {
                id: 'b63e4567-e89b-12d3-a456-426614174001',
                weekDay: 'FRI',
                startTime: 570,
                endTime: 670,
                scheduleId: '2S-3CM-D5@2024(SCS)',
              },
              {
                id: 'b73e4567-e89b-12d3-a456-426614174002',
                weekDay: 'FRI',
                startTime: 680,
                endTime: 780,
                scheduleId: '2S-3CM-D5@2024(SCS)',
              },
            ],
          },
        },
        {
          schedule: {
            id: '1S-2CIC-D4@2024(SCS)',
            userId: 2,
            courseName: 'Cience Coputing',
            groupNumber: 1,
            academicPeriod: '1SEM',
            courseGrade: 2,
            classes: [
              {
                id: '0a8c5357-1f07-5b24-9845-9318c47ab923',
                name: 'Linguagens de Programacao II',
                modality: 'IN_PERSON',
                classType: 'THEORY',
                subjectCode: 'ECM256',
                scheduleId: '1S-2CIC-D4@2024(SCS)',
              },
              {
                id: '0a8c5357-1f07-5b24-9845-9318c47ab9aa',
                name: 'Linguagens de Programacao III',
                modality: 'IN_PERSON',
                classType: 'THEORY',
                subjectCode: 'ECM111',
                scheduleId: '1S-2CIC-D4@2024(SCS)',
              },
            ],
            possibilities: [],
          },
        },
      ],
    })
  })
})
