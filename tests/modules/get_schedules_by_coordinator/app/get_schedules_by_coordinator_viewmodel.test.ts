import { describe, it, expect } from 'vitest'
import { GetSchedulesByCoordinatorViewmodel } from '../../../../src/modules/get_schedules_by_coordinator/app/get_schedules_by_coordinator_viewmodel'
import { GetSchedulesByCoordinatorUsecase } from '../../../../src/modules/get_schedules_by_coordinator/app/get_schedules_by_coordinator_usecase'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'

describe('GetSchedulesByCoordinatorViewmodel tests', () => {
  it('Should return a list of schedules', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetSchedulesByCoordinatorUsecase(repo)
    const response = await usecase.execute(2)
    const viewmodel = new GetSchedulesByCoordinatorViewmodel(response)
    expect(viewmodel.toJSON()).toEqual({
      message: "schedules by coordinator returned",
      schedules: {
        "2S-4CM-D5@2024(SCS)": {
          academicPeriod: "ANNUAL",
          courseName: "Compute Engineering",
          groupNumber: 1,
          courseGrade: 4,
          possibilities: {
            "113e4567-e89b-12d3-a456-426614174000": {
              weekDay: "MON",
              startTime: 460,
              endTime: 560,
            },
            "123e4567-e89b-12d3-a456-426614174001": {
              weekDay: "MON",
              startTime: 570,
              endTime: 670,
            },
            "133e4567-e89b-12d3-a456-426614174002": {
              weekDay: "MON",
              startTime: 680,
              endTime: 780,
            },
            "143e4567-e89b-12d3-a456-426614174000": {
              weekDay: "TUE",
              startTime: 460,
              endTime: 560,
            },
            "153e4567-e89b-12d3-a456-426614174001": {
              weekDay: "TUE",
              startTime: 570,
              endTime: 670,
            },
            "163e4567-e89b-12d3-a456-426614174002": {
              weekDay: "TUE",
              startTime: 680,
              endTime: 780,
            },
            "173e4567-e89b-12d3-a456-426614174000": {
              weekDay: "WED",
              startTime: 460,
              endTime: 560,
            },
            "183e4567-e89b-12d3-a456-426614174001": {
              weekDay: "WED",
              startTime: 570,
              endTime: 670,
            },
            "193e4567-e89b-12d3-a456-426614174002": {
              weekDay: "WED",
              startTime: 680,
              endTime: 780,
            },
            "103e4567-e89b-12d3-a456-426614174000": {
              weekDay: "THU",
              startTime: 460,
              endTime: 560,
            },
            "121e4567-e89b-12d3-a456-426614174001": {
              weekDay: "THU",
              startTime: 570,
              endTime: 670,
            },
            "122e4567-e89b-12d3-a456-426614174002": {
              weekDay: "THU",
              startTime: 680,
              endTime: 780,
            },
            "124e4567-e89b-12d3-a456-426614174000": {
              weekDay: "FRI",
              startTime: 460,
              endTime: 560,
            },
            "125e4567-e89b-12d3-a456-426614174001": {
              weekDay: "FRI",
              startTime: 570,
              endTime: 670,
            },
            "126e4567-e89b-12d3-a456-426614174002": {
              weekDay: "FRI",
              startTime: 680,
              endTime: 780,
            },
            "127e4567-e89b-12d3-a456-426614174000": {
              weekDay: "SAT",
              startTime: 460,
              endTime: 560,
            },
            "128e4567-e89b-12d3-a456-426614174001": {
              weekDay: "SAT",
              startTime: 570,
              endTime: 670,
            },
            "129e4567-e89b-12d3-a456-426614174002": {
              weekDay: "SAT",
              startTime: 680,
              endTime: 780,
            },
          },
          classes: {
            "0a8c5357-1f07-5b24-9845-9318c47ac924": {
              name: "Linguagens de Programacao II",
              subjectCode: "ECM256",
              modality: "IN_PERSON",
              classType: "THEORY",
              fullfilledData: {
                professorId: 4,
                possibilityId: "113e4567-e89b-12d3-a456-426614174000",
              },
            },
            "0a8c5357-1f07-5b24-9845-9318c47ac926": {
              name: "Physics I",
              subjectCode: "EFB207",
              modality: "IN_PERSON",
              classType: "LAB",
              fullfilledData: {
                professorId: 7,
                possibilityId: "123e4567-e89b-12d3-a456-426614174001",
              },
            },
            "0a8c5357-1f07-5b24-9845-9318c47ac927": {
              name: "Linguagens de Programacao II",
              subjectCode: "ECM256",
              modality: "HYBRID",
              classType: "THEORY",
            },
          },
        },
        "2S-2CM-D5@2024(SCS)": {
          academicPeriod: "ANNUAL",
          courseName: "Compute Engineering",
          groupNumber: 1,
          courseGrade: 2,
          possibilities: {
          },
          classes: {
          },
        },
        "2S-3CM-D5@2024(SCS)": {
          academicPeriod: "ANNUAL",
          courseName: "Compute Engineering",
          groupNumber: 1,
          courseGrade: 3,
          possibilities: {
            "a13e4567-e89b-12d3-a456-426614174000": {
              weekDay: "MON",
              startTime: 460,
              endTime: 560,
            },
            "a23e4567-e89b-12d3-a456-426614174001": {
              weekDay: "MON",
              startTime: 570,
              endTime: 670,
            },
            "a33e4567-e89b-12d3-a456-426614174002": {
              weekDay: "MON",
              startTime: 680,
              endTime: 780,
            },
            "a43e4567-e89b-12d3-a456-426614174000": {
              weekDay: "TUE",
              startTime: 460,
              endTime: 560,
            },
            "a53e4567-e89b-12d3-a456-426614174001": {
              weekDay: "TUE",
              startTime: 570,
              endTime: 670,
            },
            "a63e4567-e89b-12d3-a456-426614174002": {
              weekDay: "TUE",
              startTime: 680,
              endTime: 780,
            },
            "a73e4567-e89b-12d3-a456-426614174000": {
              weekDay: "WED",
              startTime: 460,
              endTime: 560,
            },
            "a83e4567-e89b-12d3-a456-426614174001": {
              weekDay: "WED",
              startTime: 570,
              endTime: 670,
            },
            "b13e4567-e89b-12d3-a456-426614174002": {
              weekDay: "WED",
              startTime: 680,
              endTime: 780,
            },
            "b23e4567-e89b-12d3-a456-426614174000": {
              weekDay: "THU",
              startTime: 460,
              endTime: 560,
            },
            "b33e4567-e89b-12d3-a456-426614174001": {
              weekDay: "THU",
              startTime: 570,
              endTime: 670,
            },
            "b43e4567-e89b-12d3-a456-426614174002": {
              weekDay: "THU",
              startTime: 680,
              endTime: 780,
            },
            "b53e4567-e89b-12d3-a456-426614174000": {
              weekDay: "FRI",
              startTime: 460,
              endTime: 560,
            },
            "b63e4567-e89b-12d3-a456-426614174001": {
              weekDay: "FRI",
              startTime: 570,
              endTime: 670,
            },
            "b73e4567-e89b-12d3-a456-426614174002": {
              weekDay: "FRI",
              startTime: 680,
              endTime: 780,
            },
          },
          classes: {
            "0a8c5357-1f07-5b24-9845-9318c47ac925": {
              name: "Physics I",
              subjectCode: "EFB207",
              modality: "REMOTE",
              classType: "THEORY",
              fullfilledData: {
                professorId: 3,
                possibilityId: "b63e4567-e89b-12d3-a456-426614174001",
              },
            },
          },
        },
        "1S-2CIC-D4@2024(SCS)": {
          academicPeriod: "1SEM",
          courseName: "Cience Coputing",
          groupNumber: 1,
          courseGrade: 2,
          possibilities: {
          },
          classes: {
            "0a8c5357-1f07-5b24-9845-9318c47ab923": {
              name: "Linguagens de Programacao II",
              subjectCode: "ECM256",
              modality: "IN_PERSON",
              classType: "THEORY",
            },
            "0a8c5357-1f07-5b24-9845-9318c47ab9aa": {
              name: "Linguagens de Programacao III",
              subjectCode: "ECM111",
              modality: "IN_PERSON",
              classType: "THEORY",
            },
          },
        },
      },
    })
  })
})
