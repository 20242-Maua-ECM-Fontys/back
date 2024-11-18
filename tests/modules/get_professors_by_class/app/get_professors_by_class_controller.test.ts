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
      message: 'professors by class returned',
      professors: {
        '4': {
          name: 'user4',
          email: 'user4@gmail.com',
          RA: '44.00000-4',
          availabilities: {
            '0a8c5357-1f07-5b24-9845-9318c400000a': {
              weekDay: 'MON',
              startTime: 460,
              endTime: 560,
              isTaken: true,
            },
            '0a8c5357-1f07-5b24-9845-9318c400000b': {
              weekDay: 'MON',
              startTime: 570,
              endTime: 670,
              isTaken: false,
            },
            '0a8c5357-1f07-5b24-9845-9318c400000c': {
              weekDay: 'MON',
              startTime: 680,
              endTime: 780,
              isTaken: false,
            },
            '0a8c5357-1f07-5b24-9845-9318c400000d': {
              weekDay: 'MON',
              startTime: 790,
              endTime: 890,
              isTaken: false,
            },
            '0a8c5357-1f07-5b24-9845-9318c400000e': {
              weekDay: 'MON',
              startTime: 900,
              endTime: 1000,
              isTaken: false,
            },
            '0a8c5357-1f07-5b24-9845-9318c400000f': {
              weekDay: 'MON',
              startTime: 1010,
              endTime: 1110,
              isTaken: false,
            },
            '0a8c5357-1f07-5b24-9845-9318c4000010': {
              weekDay: 'MON',
              startTime: 1140,
              endTime: 1240,
              isTaken: false,
            },
            '0a8c5357-1f07-5b24-9845-9318c4000011': {
              weekDay: 'MON',
              startTime: 1250,
              endTime: 1350,
              isTaken: false,
            },
          },
        },
        '7': {
          name: 'Austin Green',
          email: 'viraw@mon.cm',
          RA: '66.00000-6',
          availabilities: {
            '4990da07-f233-5053-8a6f-33bf8aecb4a3': {
              weekDay: 'MON',
              startTime: 460,
              endTime: 560,
              isTaken: false,
            },
            '262cfbd2-ad3f-5940-839f-7ff1e3d2b7dc': {
              weekDay: 'MON',
              startTime: 570,
              endTime: 670,
              isTaken: false,
            },
          },
        },
      },
    })
  })
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
