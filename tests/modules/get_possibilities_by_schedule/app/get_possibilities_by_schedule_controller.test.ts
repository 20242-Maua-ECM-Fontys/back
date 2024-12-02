import { describe, it, expect } from 'vitest'
import { GetPossibilitiesByScheduleController } from '../../../../src/modules/get_possibilities_by_schedule/app/get_possibilities_by_schedule_controller'
import { GetPossibilitiesByScheduleUsecase } from '../../../../src/modules/get_possibilities_by_schedule/app/get_possibilities_by_schedule_usecase'
import { HttpRequest } from '../../../../src/shared/helpers/external_interfaces/http_models'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'

describe('Tests for GetPossibilitiesByScheduleController', () => {
  it('should return a list of possibilities', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetPossibilitiesByScheduleUsecase(repo)
    const controller = new GetPossibilitiesByScheduleController(usecase)
    const request = new HttpRequest(
      undefined,
      undefined,
      { scheduleId: '2S-4CM-D5@2024(SCS)', groupNumber: 1 },
      undefined,
    )
    const response = await controller.execute(request)

    expect(response?.statusCode).toBe(200)
    expect(response?.body.message).toEqual('possibilities by schedule returned')
  })

  it('should return 400 if scheduleId is missing', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetPossibilitiesByScheduleUsecase(repo)
    const controller = new GetPossibilitiesByScheduleController(usecase)
    const request = new HttpRequest(
      undefined,
      undefined,
      { groupNumber: 1 },
      undefined,
    )
    const response = await controller.execute(request)

    expect(response?.statusCode).toBe(400)
    expect(response?.body).toEqual('Field scheduleId is missing')
  })

  it('should return 400 if scheduleId is not a string', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetPossibilitiesByScheduleUsecase(repo)
    const controller = new GetPossibilitiesByScheduleController(usecase)
    const request = new HttpRequest(
      undefined,
      undefined,
      { scheduleId: 2, groupNumber: 1 },
      undefined,
    )
    const response = await controller.execute(request)

    expect(response?.statusCode).toBe(400)
    expect(response?.body).toEqual(
      "Field scheduleId isn't in the right type.\n Received: number.\n Expected to be a string.",
    )
  })

  it('should return 400 if groupNumber is missing', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetPossibilitiesByScheduleUsecase(repo)
    const controller = new GetPossibilitiesByScheduleController(usecase)
    const request = new HttpRequest(
      undefined,
      undefined,
      { scheduleId: '2S-4CM-D5@2024(SCS)' },
      undefined,
    )
    const response = await controller.execute(request)

    expect(response?.statusCode).toBe(400)
    expect(response?.body).toEqual('Field groupNumber is missing')
  })

  it('should return 400 if groupNumber is not a number', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetPossibilitiesByScheduleUsecase(repo)
    const controller = new GetPossibilitiesByScheduleController(usecase)
    const request = new HttpRequest(
      undefined,
      undefined,
      { scheduleId: '2S-4CM-D5@2024(SCS)', groupNumber: '1' },
      undefined,
    )
    const response = await controller.execute(request)

    expect(response?.statusCode).toBe(400)
    expect(response?.body).toEqual(
      "Field groupNumber isn't in the right type.\n Received: string.\n Expected to be a number.",
    )
  })

  it('should return 404 if no schedules are found', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetPossibilitiesByScheduleUsecase(repo)
    const controller = new GetPossibilitiesByScheduleController(usecase)
    const request = new HttpRequest(
      undefined,
      undefined,
      { scheduleId: '2S-1CM-D5@2024(SCS)', groupNumber: 1 },
      undefined,
    )
    const response = await controller.execute(request)

    expect(response?.statusCode).toBe(404)
    expect(response?.body).toEqual('No items found for scheduleId')
  })

  it('should return 400 if scheduleId is not valid', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetPossibilitiesByScheduleUsecase(repo)
    const controller = new GetPossibilitiesByScheduleController(usecase)
    const request = new HttpRequest(
      undefined,
      undefined,
      { scheduleId: 'invalid', groupNumber: 1 },
      undefined,
    )
    const response = await controller.execute(request)

    expect(response?.statusCode).toBe(400)
    expect(response?.body).toEqual('Field scheduleId is not valid')
  })
})
