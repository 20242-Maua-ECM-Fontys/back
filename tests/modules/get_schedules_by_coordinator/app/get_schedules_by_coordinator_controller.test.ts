import { describe, it, expect } from 'vitest'
import { GetSchedulesByCoordinatorController } from '../../../../src/modules/get_schedules_by_coordinator/app/get_schedules_by_coordinator_controller'
import { GetSchedulesByCoordinatorUsecase } from '../../../../src/modules/get_schedules_by_coordinator/app/get_schedules_by_coordinator_usecase'
import { HttpRequest } from '../../../../src/shared/helpers/external_interfaces/http_models'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'

describe('Tests for GetSchedulesByCoordinatorController', () => {
  it('should return a list of schedules', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetSchedulesByCoordinatorUsecase(repo)
    const controller = new GetSchedulesByCoordinatorController(usecase)
    const request = new HttpRequest(
      {
      },
      undefined,
      {
        userId: '2',},
      undefined,
    )
    const response = await controller.execute(request)

    expect(response?.statusCode).toBe(200)
    expect(response?.body.message).toEqual('schedules by coordinator returned')
  })

  it('should return 400 if userId is missing', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetSchedulesByCoordinatorUsecase(repo)
    const controller = new GetSchedulesByCoordinatorController(usecase)
    const request = new HttpRequest(
      {
      },
      undefined,
      {},
      undefined,
    )
    const response = await controller.execute(request)

    expect(response?.statusCode).toBe(400)
    expect(response?.body).toEqual('Field userId is missing')
  })

  it('should return 400 if userId is not a numeric string', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetSchedulesByCoordinatorUsecase(repo)
    const controller = new GetSchedulesByCoordinatorController(usecase)
    const request = new HttpRequest(
      {
      },
      undefined,
      {userId: '2a',},
      undefined,
    )
    const response = await controller.execute(request)

    expect(response?.statusCode).toBe(400)
    expect(response?.body).toEqual(
      "Field userId isn't in the right type.\n" +
        ' Received: 2a.\n' +
        ' Expected to be a numeric string.',
    )
  })

  it('should return 404 if no users are found', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetSchedulesByCoordinatorUsecase(repo)
    const controller = new GetSchedulesByCoordinatorController(usecase)
    const request = new HttpRequest(
      {
      },
      undefined,
      {
        userId: '20',},
      undefined,
    )
    const response = await controller.execute(request)

    expect(response?.statusCode).toBe(404)
    expect(response?.body).toEqual('No items found for userId')
  })

  it('should return 400 if user is not a coordinator', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetSchedulesByCoordinatorUsecase(repo)
    const controller = new GetSchedulesByCoordinatorController(usecase)
    const request = new HttpRequest(
      {
      },
      undefined,
      {
        userId: '1',
      },
      undefined,
    )
    const response = await controller.execute(request)

    expect(response?.statusCode).toBe(400)
    expect(response?.body).toEqual(
      'Invalid role. Expected COORDINATOR but received STAFF',
    )
  })
})
