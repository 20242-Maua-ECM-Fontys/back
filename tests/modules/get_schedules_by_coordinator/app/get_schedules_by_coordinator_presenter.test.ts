import { GetSchedulesByCoordinatorPresenter } from '../../../../src/modules/get_schedules_by_coordinator/app/get_schedules_by_coordinator_presenter'
import { describe, it, expect } from 'vitest'
import { HttpRequest } from '../../../../src/shared/helpers/external_interfaces/http_models'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'

describe('Tests for GetSchedulesByCoordinatorPresenter', () => {
  it('Should call presenter and return status 200', async () => {
    const repo = new ScheduleRepositoryMock()

    const event = new HttpRequest(
      {
      },
      undefined,
      {
        userId: '2',},
      undefined,
    )

    const response = await GetSchedulesByCoordinatorPresenter(event, repo)

    expect(response?.statusCode).toEqual(200)
    expect(response?.body.message).toEqual('schedules by coordinator returned')
  })

  it('Should call presenter and return status 400', async () => {
    const repo = new ScheduleRepositoryMock()

    const event = new HttpRequest(
      {
      },
      undefined,
      {},
      undefined,
    )

    const response = await GetSchedulesByCoordinatorPresenter(event, repo)

    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual('Field userId is missing')
  })

  it('Should call presenter and return status 404', async () => {
    const repo = new ScheduleRepositoryMock()

    const event = new HttpRequest(
      {
      },
      undefined,
      {
        userId: '2023',},
      undefined,
    )

    const response = await GetSchedulesByCoordinatorPresenter(event, repo)

    expect(response?.statusCode).toEqual(404)
    expect(response?.body).toEqual('No items found for userId')
  })
})
