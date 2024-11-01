import { describe, it, expect } from 'vitest'
import { UpdateSuitabilitiesPresenter } from '../../../../src/modules/update_suitabilities/app/update_suitabilities_presenter'
import { HttpRequest } from '../../../../src/shared/helpers/external_interfaces/http_models'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'

describe('Tests for UpdateSuitabilitiesPresenter', () => {
  it('Should call presenter and return status 200', async () => {
    const repo = new ScheduleRepositoryMock()
    const userId = 3
    const subjects = ['ECM256', 'EFB207']
    const httpRequest = new HttpRequest(
      {
        userId: userId,
        subjectCodes: subjects,
      },
      undefined,
      {},
      undefined,
    )
    const response = await UpdateSuitabilitiesPresenter(httpRequest, repo)

    expect(response?.statusCode).toEqual(200)
    expect(response?.body.message).toEqual('suitabilities updated')
  })
  it('Should call presenter and return status 400', async () => {
    const repo = new ScheduleRepositoryMock()
    const userId = 3
    const subjects = ['ECM256', 'EFB207']
    const httpRequest = new HttpRequest(
      {
        subjectCodes: subjects,
      },
      undefined,
      {},
      undefined,
    )
    const response = await UpdateSuitabilitiesPresenter(httpRequest, repo)

    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual('Field userId is missing')
  })
  it('Should call presenter and return status 403', async () => {
    const repo = new ScheduleRepositoryMock()
    const userId = 1
    const httpRequest = new HttpRequest(
      {
        userId: userId,
        subjectCodes: []
      },
      undefined,
      {},
      undefined,
    )
    const response = await UpdateSuitabilitiesPresenter(httpRequest, repo)

    expect(response?.statusCode).toEqual(403)
    expect(response?.body).toEqual('Invalid role. Expected PROFESSOR or COORDINATOR but received STAFF')
  })
  it('Should call presenter and return status 404', async () => {
    const repo = new ScheduleRepositoryMock()
    const userId = repo.getUsersLength() + 1
    const httpRequest = new HttpRequest(
      {
        userId: userId,
        subjectCodes: []
      },
      undefined,
      {},
      undefined,
    )
    const response = await UpdateSuitabilitiesPresenter(httpRequest, repo)

    expect(response?.statusCode).toEqual(404)
    expect(response?.body).toEqual('No items found for userId')
  })
  it('Should call presenter and return status 400', async () => {
    const repo = new ScheduleRepositoryMock()
    const userId = 3
    const httpRequest = new HttpRequest(
      {
        userId: userId,
      },
      undefined,
      {},
      undefined,
    )
    const response = await UpdateSuitabilitiesPresenter(httpRequest, repo)

    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual('Field subjectCodes is missing')
  })
})
