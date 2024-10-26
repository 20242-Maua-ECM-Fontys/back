import { describe, it, expect } from 'vitest'
import { GetAllProfessorsPresenter } from '../../../../src/modules/get_all_professors/app/get_all_professors_presenter'
import { HttpRequest } from '../../../../src/shared/helpers/external_interfaces/http_models'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'

describe('Tests for GetAllProfessorsPresenter', () => {
  it('Should call presenter and return status 200', async () => {
    const repo = new ScheduleRepositoryMock()
    const event = new HttpRequest(
      undefined,
      undefined,
      {},
      undefined,
    )

    const response = await GetAllProfessorsPresenter(event, repo)

    expect(response?.statusCode).toEqual(200)
  })
})
