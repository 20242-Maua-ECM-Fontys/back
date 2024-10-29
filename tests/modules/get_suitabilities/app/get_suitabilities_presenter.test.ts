import { describe, it, expect } from 'vitest'
import { GetSuitabilitiesByProfessorPresenter } from '../../../../src/modules/get_suitabilities_by_prefessor/app/get_suitabilities_by_professor_presenter'
import { HttpRequest } from '../../../../src/shared/helpers/external_interfaces/http_models'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'

describe('Tests for GetSuitabilitiesByProfessorPresenter', () => {
  it('Should call presenter and return status 200', async () => {
    const repo = new ScheduleRepositoryMock()

    const event = new HttpRequest(
      undefined,
      undefined,
      { userId: 4 },
      undefined,
    )

    const response = await GetSuitabilitiesByProfessorPresenter(event, repo)

    expect(response?.statusCode).toEqual(200)
    expect(response?.body.message).toEqual('suitabilities found')
  })
})
