import { describe, it, expect } from 'vitest'
import { GetSuitabilitiesByProfessorController } from '../../../../src/modules/get_suitabilities_by_prefessor/app/get_suitabilities_by_professor_controller'
import { GetSuitabilitiesByProfessorUsecase } from '../../../../src/modules/get_suitabilities_by_prefessor/app/get_suitabilities_by_professor_usecase'
import { HttpRequest } from '../../../../src/shared/helpers/external_interfaces/http_models'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'

describe('Tests for GetSuitabilitiesByProfessorController', () => {
  it('should return a list of suitabilities', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetSuitabilitiesByProfessorUsecase(repo)
    const controller = new GetSuitabilitiesByProfessorController(usecase)
    const request = new HttpRequest({
      userId: 4,
    })
    const response = await controller.execute(request)

    expect(response?.statusCode).toBe(200)
    expect(response?.body.message).toEqual(
      'suitabilities by professor returned',
    )
  })

  it('should return 400 if userId is missing', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetSuitabilitiesByProfessorUsecase(repo)
    const controller = new GetSuitabilitiesByProfessorController(usecase)
    const request = new HttpRequest({})
    const response = await controller.execute(request)

    expect(response?.statusCode).toBe(400)
    expect(response?.body).toEqual('Field userId is missing')
  })

  it('should return 400 if userId is not a number', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetSuitabilitiesByProfessorUsecase(repo)
    const controller = new GetSuitabilitiesByProfessorController(usecase)
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

  it('should return 404 if no users are found', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetSuitabilitiesByProfessorUsecase(repo)
    const controller = new GetSuitabilitiesByProfessorController(usecase)
    const request = new HttpRequest({
      userId: 20,
    })
    const response = await controller.execute(request)

    expect(response?.statusCode).toBe(404)
    expect(response?.body).toEqual('No items found for userId')
  })

  it('should return 400 if userId is not valid', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetSuitabilitiesByProfessorUsecase(repo)
    const controller = new GetSuitabilitiesByProfessorController(usecase)
    const request = new HttpRequest({
      userId: -1,
    })
    const response = await controller.execute(request)

    expect(response?.statusCode).toBe(400)
    expect(response?.body).toEqual('Field userId is not valid')
  })
})
