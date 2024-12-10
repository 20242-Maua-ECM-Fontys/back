import { GetProfessorsByClassViewmodel } from '../../../../src/modules/get_professors_by_class/app/get_professors_by_class_viewmodel'
import { it, expect, describe } from 'vitest'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'
import { GetProfessorsByClassUsecase } from '../../../../src/modules/get_professors_by_class/app/get_professors_by_class_usecase'
import { WEEK_DAY } from '../../../../src/shared/domain/enums/week_day_enum'
import { MAUA_START_TIME } from '../../../../src/shared/domain/enums/maua_start_time_enum'
import { MAUA_END_TIME } from '../../../../src/shared/domain/enums/maua_end_time_enum'

describe('GetProfessorsByClassViewmodel', () => {
  it('should correctly transform professors data to JSON format', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetProfessorsByClassUsecase(repo)

    const professors = await usecase.execute(
      '0a8c5357-1f07-5b24-9845-9318c47ab923',
    )

    const viewModel = new GetProfessorsByClassViewmodel(professors)
    const result = viewModel.toJSON()

    expect(result).toEqual({
      message: "professors by class returned",
      professors: {
        "3": {
          name: "PEDRO HENRIQUE DE SOUSA MATUMOTO",
          email: "21.00784-5@maua.br",
          RA: "21.00784-5",
          availabilities: {
            "0a8c5357-1f07-5b24-9845-9318c4000000": {
              weekDay: "MON",
              startTime: 460,
              endTime: 560,
              isTaken: false,
            },
            "0a8c5357-1f07-5b24-9845-9318c4000001": {
              weekDay: "MON",
              startTime: 570,
              endTime: 670,
              isTaken: false,
            },
            "0a8c5357-1f07-5b24-9845-9318c4000002": {
              weekDay: "TUE",
              startTime: 460,
              endTime: 560,
              isTaken: false,
            },
            "0a8c5357-1f07-5b24-9845-9318c4000003": {
              weekDay: "TUE",
              startTime: 570,
              endTime: 670,
              isTaken: false,
            },
            "0a8c5357-1f07-5b24-9845-9318c4000004": {
              weekDay: "WED",
              startTime: 460,
              endTime: 560,
              isTaken: false,
            },
            "0a8c5357-1f07-5b24-9845-9318c4000005": {
              weekDay: "WED",
              startTime: 570,
              endTime: 670,
              isTaken: false,
            },
            "0a8c5357-1f07-5b24-9845-9318c4000006": {
              weekDay: "THU",
              startTime: 460,
              endTime: 560,
              isTaken: false,
            },
            "0a8c5357-1f07-5b24-9845-9318c4000007": {
              weekDay: "THU",
              startTime: 570,
              endTime: 670,
              isTaken: false,
            },
            "0a8c5357-1f07-5b24-9845-9318c4000008": {
              weekDay: "FRI",
              startTime: 460,
              endTime: 560,
              isTaken: false,
            },
            "0a8c5357-1f07-5b24-9845-9318c4000009": {
              weekDay: "FRI",
              startTime: 570,
              endTime: 670,
              isTaken: true,
            },
          },
        },
        "4": {
          name: "JHON DOE",
          email: "93.10232-1@maua.br",
          RA: "93.10232-1",
          availabilities: {
            "0a8c5357-1f07-5b24-9845-9318c400000a": {
              weekDay: "MON",
              startTime: 460,
              endTime: 560,
              isTaken: true,
            },
            "0a8c5357-1f07-5b24-9845-9318c400000b": {
              weekDay: "MON",
              startTime: 570,
              endTime: 670,
              isTaken: false,
            },
            "0a8c5357-1f07-5b24-9845-9318c400000c": {
              weekDay: "MON",
              startTime: 680,
              endTime: 780,
              isTaken: false,
            },
            "0a8c5357-1f07-5b24-9845-9318c400000d": {
              weekDay: "MON",
              startTime: 790,
              endTime: 890,
              isTaken: false,
            },
            "0a8c5357-1f07-5b24-9845-9318c400000e": {
              weekDay: "MON",
              startTime: 900,
              endTime: 1000,
              isTaken: false,
            },
            "0a8c5357-1f07-5b24-9845-9318c400000f": {
              weekDay: "MON",
              startTime: 1010,
              endTime: 1110,
              isTaken: false,
            },
            "0a8c5357-1f07-5b24-9845-9318c4000010": {
              weekDay: "MON",
              startTime: 1140,
              endTime: 1240,
              isTaken: false,
            },
            "0a8c5357-1f07-5b24-9845-9318c4000011": {
              weekDay: "MON",
              startTime: 1250,
              endTime: 1350,
              isTaken: false,
            },
          },
        },
        "7": {
          name: "Austin Green",
          email: "viraw@mon.cm",
          RA: "66.00000-6",
          availabilities: {
            "4990da07-f233-5053-8a6f-33bf8aecb4a3": {
              weekDay: "MON",
              startTime: 460,
              endTime: 560,
              isTaken: false,
            },
            "262cfbd2-ad3f-5940-839f-7ff1e3d2b7dc": {
              weekDay: "MON",
              startTime: 570,
              endTime: 670,
              isTaken: false,
            },
          },
        },
      },
    })
  })

  it('should return an empty data object if no professors are provided', () => {
    const formattedProfessors: {
      id: string
      name: string
      email: string
      RA: string
      availabilities: []
    }[] = []

    const viewModel = new GetProfessorsByClassViewmodel(formattedProfessors)
    const result = viewModel.toJSON()

    expect(result).toEqual({
      message: 'professors by class returned',
      professors: {},
    })
  })
})
