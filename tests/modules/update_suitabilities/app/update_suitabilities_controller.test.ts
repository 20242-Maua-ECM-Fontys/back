import { describe, it, expect } from 'vitest'
import { HttpRequest } from '../../../../src/shared/helpers/external_interfaces/http_models'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'
import { UpdateSuitabilitiesController } from '../../../../src/modules/update_suitabilities/app/update_suitabilities_controller'
import { UpdateSuitabilitiesUsecase } from '../../../../src/modules/update_suitabilities/app/update_suitabilities_usecase'

describe('Tests for UpdateSuitabilitiesController', () => {
  it('Should activate controller correctly', async () => {
    const repo = new ScheduleRepositoryMock()
    const controller = new UpdateSuitabilitiesController(
      new UpdateSuitabilitiesUsecase(repo),
    )
    const userId = 3
    const subjects = ['ECM256', 'EFB207']

    const request = new HttpRequest({
      userId,
      subjectCodes: subjects,
    })

    const response = await controller.execute(request)

    expect(response?.statusCode).toEqual(200)

    const suitabilitiesForUser = await repo.getSuitabilitiesByUserId(userId)

    expect(suitabilitiesForUser.length).toEqual(2)

    expect(suitabilitiesForUser[0].codeSubject).toEqual('ECM256')
    expect(suitabilitiesForUser[0].userId).toEqual(userId)

    expect(suitabilitiesForUser[1].codeSubject).toEqual('EFB207')
    expect(suitabilitiesForUser[1].userId).toEqual(userId)
  })

  it('Should throw error for missing userId', async () => {
    const repo = new ScheduleRepositoryMock()
    const controller = new UpdateSuitabilitiesController(
      new UpdateSuitabilitiesUsecase(repo),
    )
    const subjects = ['ECM256', 'EFB207']

    const request = new HttpRequest({
      subjectCodes: subjects,
    })

    const response = await controller.execute(request)

    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual('Field userId is missing')
  })

  it('Should throw error for missing subjectCodes', async () => {
    const repo = new ScheduleRepositoryMock()
    const controller = new UpdateSuitabilitiesController(
      new UpdateSuitabilitiesUsecase(repo),
    )
    const userId = 3

    const request = new HttpRequest({
      userId,
    })

    const response = await controller.execute(request)

    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual('Field subjectCodes is missing')
  })

  it('Should throw error for wrong type userId', async () => {
    const repo = new ScheduleRepositoryMock()
    const controller = new UpdateSuitabilitiesController(
      new UpdateSuitabilitiesUsecase(repo),
    )
    const userId = '3'
    const subjects = ['ECM256', 'EFB207']

    const request = new HttpRequest({
      userId,
      subjectCodes: subjects,
    })

    const response = await controller.execute(request)

    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual(`Field userId isn't in the right type.
 Received: string.
 Expected to be a number.`)
  })

  it('Should throw error for wrong type subjectCodes', async () => {
    const repo = new ScheduleRepositoryMock()
    const controller = new UpdateSuitabilitiesController(
      new UpdateSuitabilitiesUsecase(repo),
    )
    const userId = 3
    const subjects = 'ECM256'

    const request = new HttpRequest({
      userId,
      subjectCodes: subjects,
    })

    const response = await controller.execute(request)

    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual(`Field subjectCodes isn't in the right type.
 Received: string.
 Expected to be a array.`)
  })

  it('Should throw error for wrong type subjectCode', async () => {
    const repo = new ScheduleRepositoryMock()
    const controller = new UpdateSuitabilitiesController(
      new UpdateSuitabilitiesUsecase(repo),
    )
    const userId = 3
    const subjects = [3]

    const request = new HttpRequest({
      userId,
      subjectCodes: subjects,
    })

    const response = await controller.execute(request)

    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual(`Field subjectCode isn't in the right type.
 Received: number.
 Expected to be a string.`)
  })

  it('Should throw error for no items found', async () => {
    const repo = new ScheduleRepositoryMock()
    const controller = new UpdateSuitabilitiesController(
      new UpdateSuitabilitiesUsecase(repo),
    )
    const userId = repo.getUsersLength() + 1
    const subjects = ['ECM256', 'EFB207']

    const request = new HttpRequest({
      userId,
      subjectCodes: subjects,
    })

    const response = await controller.execute(request)

    expect(response?.statusCode).toEqual(404)
    expect(response?.body).toEqual('No items found for userId')
  })

  it('Should throw error for invalid Role', async () => {
    const repo = new ScheduleRepositoryMock()
    const controller = new UpdateSuitabilitiesController(
      new UpdateSuitabilitiesUsecase(repo),
    )
    const userId = 1
    const subjects = ['ECM256', 'EFB207']

    const request = new HttpRequest({
      userId,
      subjectCodes: subjects,
    })

    try {
      await controller.execute(request)
    } catch (error) {
      expect(error.message).toEqual('Invalid Role')
    }
  })
})
