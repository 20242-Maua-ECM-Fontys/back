
import { describe, it, expect } from 'vitest'
import { GetAllSubjectsPresenter } from '../../../../src/modules/get_all_subjects/app/get_all_subjects_presenter'
import { HttpRequest } from '../../../../src/shared/helpers/external_interfaces/http_models'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'

describe('Tests for GetAllSubjectsPresenter', () => {
  it('Should call presenter and return status 200', async () => {
    const repo = new ScheduleRepositoryMock()

    const event = new HttpRequest(
      undefined,
      undefined,
      {},
      undefined
    )

    const response = await GetAllSubjectsPresenter(event, repo)

    expect(response?.statusCode).toEqual(200)
  })
})