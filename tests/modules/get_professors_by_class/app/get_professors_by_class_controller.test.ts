import { it, expect, describe } from 'vitest'
import { GetProfessorsByClassUsecase } from '../../../../src/modules/get_professors_by_class/app/get_professors_by_class_usecase'
import { GetProfessorsByClassController } from '../../../../src/modules/get_professors_by_class/app/get_professors_by_class_controller'
import { HttpRequest } from '../../../../src/shared/helpers/external_interfaces/http_models'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'
describe('Assert GetProfessorsByClassController is correct at all', () => {
  it('should return a list of professors for a valid classId', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetProfessorsByClassUsecase(repo)
    const controller = new GetProfessorsByClassController(usecase)

    const request = new HttpRequest(undefined, undefined, {
      classId: '0a8c5357-1f07-5b24-9845-9318c47ab923',
    })

    const response = await controller.execute(request)

    expect(response?.statusCode).toEqual(200)
    expect(response?.data).toEqual({
      "message": "professors by class returned",
    "professors": {
      "3": {
        "RA": "33.00000-3",
        "availabilities": {
          "0a8c5357-1f07-5b24-9845-9318c4000000": {
            "endTime": 560,
            "isTaken": false,
            "startTime": 460,
            "weekDay": "MON",
          },
          "0a8c5357-1f07-5b24-9845-9318c4000001": {
            "endTime": 670,
            "isTaken": false,
            "startTime": 570,
            "weekDay": "MON",
          },
          "0a8c5357-1f07-5b24-9845-9318c4000002": {
            "endTime": 560,
            "isTaken": false,
            "startTime": 460,
            "weekDay": "TUE",
          },
          "0a8c5357-1f07-5b24-9845-9318c4000003": {
            "endTime": 670,
            "isTaken": false,
            "startTime": 570,
            "weekDay": "TUE",
          },
          "0a8c5357-1f07-5b24-9845-9318c4000004": {
            "endTime": 560,
            "isTaken": false,
            "startTime": 460,
            "weekDay": "WED",
          },
          "0a8c5357-1f07-5b24-9845-9318c4000005": {
            "endTime": 670,
            "isTaken": false,
            "startTime": 570,
            "weekDay": "WED",
          },
          "0a8c5357-1f07-5b24-9845-9318c4000006": {
            "endTime": 560,
            "isTaken": false,
            "startTime": 460,
            "weekDay": "THU",
          },
          "0a8c5357-1f07-5b24-9845-9318c4000007": {
            "endTime": 670,
            "isTaken": false,
            "startTime": 570,
            "weekDay": "THU",
          },
          "0a8c5357-1f07-5b24-9845-9318c4000008": {
            "endTime": 560,
            "isTaken": false,
            "startTime": 460,
            "weekDay": "FRI",
          },
          "0a8c5357-1f07-5b24-9845-9318c4000009": {
            "endTime": 670,
            "isTaken": true,
            "startTime": 570,
            "weekDay": "FRI",
          },
        },
        "email": "user3@gmail.com",
        "name": "user3",
      },
      "4": {
        "RA": "44.00000-4",
        "availabilities": {
          "0a8c5357-1f07-5b24-9845-9318c400000a": {
            "endTime": 560,
            "isTaken": true,
            "startTime": 460,
            "weekDay": "MON",
          },
          "0a8c5357-1f07-5b24-9845-9318c400000b": {
            "endTime": 670,
            "isTaken": false,
            "startTime": 570,
            "weekDay": "MON",
          },
          "0a8c5357-1f07-5b24-9845-9318c400000c": {
            "endTime": 780,
            "isTaken": false,
            "startTime": 680,
            "weekDay": "MON",
          },
          "0a8c5357-1f07-5b24-9845-9318c400000d": {
            "endTime": 890,
            "isTaken": false,
            "startTime": 790,
            "weekDay": "MON",
          },
          "0a8c5357-1f07-5b24-9845-9318c400000e": {
            "endTime": 1000,
            "isTaken": false,
            "startTime": 900,
            "weekDay": "MON",
          },
          "0a8c5357-1f07-5b24-9845-9318c400000f": {
            "endTime": 1110,
            "isTaken": false,
            "startTime": 1010,
            "weekDay": "MON",
          },
          "0a8c5357-1f07-5b24-9845-9318c4000010": {
            "endTime": 1240,
            "isTaken": false,
            "startTime": 1140,
            "weekDay": "MON",
          },
          "0a8c5357-1f07-5b24-9845-9318c4000011": {
            "endTime": 1350,
            "isTaken": false,
            "startTime": 1250,
            "weekDay": "MON",
          },
        },
        "email": "user4@gmail.com",
        "name": "user4",
      },
      "7": {
        "RA": "66.00000-6",
        "availabilities": {
          "262cfbd2-ad3f-5940-839f-7ff1e3d2b7dc": {
            "endTime": 670,
            "isTaken": false,
            "startTime": 570,
            "weekDay": "MON",
          },
          "4990da07-f233-5053-8a6f-33bf8aecb4a3": {
            "endTime": 560,
            "isTaken": false,
            "startTime": 460,
            "weekDay": "MON",
          },
        },
        "email": "viraw@mon.cm",
        "name": "Austin Green",
      },
    }},
  )})
  it('should return a empty list', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetProfessorsByClassUsecase(repo)
    const controller = new GetProfessorsByClassController(usecase)

    const request = new HttpRequest(undefined, undefined, {
      classId: '0a8c5357-1f07-5b24-9845-9318c47ab9aa',
    })

    const response = await controller.execute(request)

    expect(response?.statusCode).toEqual(200)
    expect(response?.data).toEqual({
      professors: {},
      message: 'professors by class returned',
    })
  })
  it('should return a 400 error for an invalid classId', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetProfessorsByClassUsecase(repo)
    const controller = new GetProfessorsByClassController(usecase)

    const request = new HttpRequest(undefined, undefined, {
      classId: '0a8c5357-1f07-5b24-9845-9318c47abaa',
    })

    const response = await controller.execute(request)

    expect(response?.data.body).toBe('Field classId is not valid')
    expect(response?.statusCode).toEqual(400)
  })

  it('should return a 400 error if classId is missing', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetProfessorsByClassUsecase(repo)
    const controller = new GetProfessorsByClassController(usecase)

    const request = new HttpRequest(undefined, undefined, {
      classId: undefined,
    })

    const response = await controller.execute(request)

    expect(response?.statusCode).toEqual(400)
    expect(response?.data.body).toBe('Field classId is missing')
  })

  it('should return a 400 error if classId is not a string', async () => {
    const request = new HttpRequest(undefined, undefined, {
      classId: 2,
    })
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetProfessorsByClassUsecase(repo)
    const controller = new GetProfessorsByClassController(usecase)

    const response = await controller.execute(request)

    expect(response?.statusCode).toEqual(400)
    expect(response?.data.body).toBe('Field classId is not valid')
  })
  it('should return a 400 error if classId is not a valid UUID', async () => {
    const request = new HttpRequest(undefined, undefined, {
      classId: '11111111-1111-1111-1111-111111111@@1',
    })
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetProfessorsByClassUsecase(repo)
    const controller = new GetProfessorsByClassController(usecase)

    const response = await controller.execute(request)

    expect(response?.statusCode).toEqual(400)
    expect(response?.data.body).toBe('Field classId is not valid')
  })
})
