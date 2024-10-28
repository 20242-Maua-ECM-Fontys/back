import { describe, it, expect } from 'vitest'
import { GetSuitabilitiesController } from '../../../../src/modules/get_suitabilities/app/get_suitabilities_controller'
import { GetSuitabilitiesUsecase } from '../../../../src/modules/get_suitabilities/app/get_suitabilities_usecase'
import { HttpRequest } from '../../../../src/shared/helpers/external_interfaces/http_models'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'

describe('Tests for GetSuitabilitiesController', () => {
  it('should return a list of suitabilities', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetSuitabilitiesUsecase(repo)
    const controller = new GetSuitabilitiesController(usecase)
    const request = new HttpRequest({
      userId: 4,
    })
    const response = await controller.execute(request)

    expect(response?.statusCode).toBe(200)
    expect(response?.body.message).toEqual('suitabilities found')
  })

  it('should return 400 if userId is missing', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetSuitabilitiesUsecase(repo)
    const controller = new GetSuitabilitiesController(usecase)
    const request = new HttpRequest({})
    const response = await controller.execute(request)

    expect(response?.statusCode).toBe(400)
    expect(response?.body).toEqual('Field userId is missing')
  })

  it('should return 400 if userId is not a number', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetSuitabilitiesUsecase(repo)
    const controller = new GetSuitabilitiesController(usecase)
    const request = new HttpRequest({
      userId: '4',
    })
    const response = await controller.execute(request)
    console.log(response)

    expect(response?.statusCode).toBe(400)
    expect(response?.body).toEqual(
      "Field userId isn't in the right type.\n" +
        ' Received: 4.\n' +
        ' Expected to be a number.',
    )
  })

  it('should return 404 if no suitabilities are found', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetSuitabilitiesUsecase(repo)
    const controller = new GetSuitabilitiesController(usecase)
    const request = new HttpRequest({
      userId: 20,
    })
    const response = await controller.execute(request)

    expect(response?.statusCode).toBe(404)
    expect(response?.body).toEqual('No items found for userId')
  })
})
