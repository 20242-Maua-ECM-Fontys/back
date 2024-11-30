import { describe, it, expect } from 'vitest'
import { GetPossibilitiesBySchedulePresenter } from '../../../../src/modules/get_possibilities_by_schedule/app/get_possibilities_by_schedule_presenter'
import { HttpRequest } from '../../../../src/shared/helpers/external_interfaces/http_models'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'

describe('Tests for GetPossibilitiesBySchedulePresenter', () => {
  it('Should call presenter and return status 200', async () => {
    const repo = new ScheduleRepositoryMock()

    const event = new HttpRequest(
      undefined,
      undefined,
      { scheduleId: '2S-4CM-D5@2024(SCS)', groupNumber: 1 },
      undefined,
    )

    const response = await GetPossibilitiesBySchedulePresenter(event, repo)

    expect(response?.statusCode).toEqual(200)
    expect(response?.body.message).toEqual('possibilities by schedule returned')
  })

  it('Should call presenter and return status 404', async () => {
    const repo = new ScheduleRepositoryMock()

    const event = new HttpRequest(
      undefined,
      undefined,
      { scheduleId: '2S-1CM-D5@2024(SCS)', groupNumber: 1 },
      undefined,
    )

    const response = await GetPossibilitiesBySchedulePresenter(event, repo)

    expect(response?.statusCode).toEqual(404)
    expect(response?.body).toEqual('No items found for scheduleId')
  })

  it('Should call presenter and return status 400', async () => {
    const repo = new ScheduleRepositoryMock()

    const event = new HttpRequest(
      undefined,
      undefined,
      { scheduleId: 'invalid', groupNumber: 1 },
      undefined,
    )

    const response = await GetPossibilitiesBySchedulePresenter(event, repo)

    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual('Field scheduleId is not valid')
  })
})
