import { describe, it, expect } from 'vitest'
import { HttpRequest } from '../../../../src/shared/helpers/external_interfaces/http_models'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'
import { GetProfessorAvailabilityPresenter } from '../../../../src/modules/get_all_professor_availabilities/app/get_professor_availabilities_presenter'

describe('Tests for GetProfessorAvailabilityPresenter', () => {
  it('Should call presenter and return status 200', async () => {
    const repo = new ScheduleRepositoryMock()

    const event = new HttpRequest(
      undefined,
      undefined,
      { userId: '4' },
      undefined,
    )

    const response = await GetProfessorAvailabilityPresenter(event, repo)

    expect(response?.statusCode).toEqual(200)
    expect(response?.body.message).toEqual(
      'availabilities by professor returned',
    )
  })
  it('Should call presenter and return status 400', async () => {
    const repo = new ScheduleRepositoryMock()

    const event = new HttpRequest(
      undefined,
      undefined,
      { userId: '-1' },
      undefined,
    )

    const response = await GetProfessorAvailabilityPresenter(event, repo)

    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual(
      'Field userId is not valid',
    )
  })
})