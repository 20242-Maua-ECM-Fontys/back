import { describe, it, expect } from 'vitest'
import { GetSuitabilitiesPresenter } from '../../../../src/modules/get_suitabilities/app/get_suitabilities_presenter'
import { HttpRequest } from '../../../../src/shared/helpers/external_interfaces/http_models'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'

describe('Tests for GetSuitabilitiesPresenter', () => {
  it('Should call presenter and return status 200', async () => {
    const repo = new ScheduleRepositoryMock()

    const event = new HttpRequest(
      undefined,
      undefined,
      { userId: 4 },
      undefined,
    )

    const response = await GetSuitabilitiesPresenter(event, repo)

    expect(response?.statusCode).toEqual(200)
    expect(response?.body.message).toEqual('suitabilities found')
  })
})
