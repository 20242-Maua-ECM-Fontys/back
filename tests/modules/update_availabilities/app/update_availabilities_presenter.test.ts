import { describe, it, expect } from 'vitest'
import { UpdateAvailabilitiesPresenter } from '../../../../src/modules/update_availabilities/app/update_availabilities_presenter'
import { HttpRequest } from '../../../../src/shared/helpers/external_interfaces/http_models'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'

describe('Tests for UpdateAvailabilitiesPresenter', () => {
  it('Should call presenter and return status 200', async () => {
    const repo = new ScheduleRepositoryMock()
    const userId = 3
    const availabilities = [
      {
        startTime: 460,
        endTime: 560,
        weekDay: 'FRI'
      },
      {
        startTime: 460,
        endTime: 560,
        weekDay: 'SAT'
      },
      {
        startTime: 570,
        endTime: 670,
        weekDay: 'FRI'
      }
    ]
    const httpRequest = new HttpRequest(
      {
        'userId': userId,
        'availabilities': availabilities
      },
      undefined,
      {},
      undefined,
    )
    const response = await UpdateAvailabilitiesPresenter(httpRequest, repo)

    expect(response?.statusCode).toEqual(200)
    expect(response?.body.message).toEqual('availabilities updated')
  })
  it('Should call presenter and return status 400', async () => {
    const repo = new ScheduleRepositoryMock()
    const userId = 3
    const availabilities = [
      {
        startTime: 460,
        weekDay: 'FRI'
      },
      {
        startTime: 460,
        endTime: 560,
        weekDay: 'SAT'
      },
      {
        startTime: 570,
        endTime: 670,
        weekDay: 'FRI'
      }
    ]
    const httpRequest = new HttpRequest(
      {
        'userId': userId,
        'availabilities': availabilities
      },
      undefined,
      {},
      undefined,
    )
    const response = await UpdateAvailabilitiesPresenter(httpRequest, repo)

    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual('Field endTime is missing')
  })
  it('Should call presenter and return status 403', async () => {
    const repo = new ScheduleRepositoryMock()
    const userId = 2
    const availabilities = [
      {
        startTime: 460,
        endTime: 560,
        weekDay: 'FRI'
      },
      {
        startTime: 460,
        endTime: 560,
        weekDay: 'SAT'
      },
      {
        startTime: 570,
        endTime: 670,
        weekDay: 'FRI'
      }
    ]
    const httpRequest = new HttpRequest(
      {
        'userId': userId,
        'availabilities': availabilities
      },
      undefined,
      {},
      undefined,
    )
    const response = await UpdateAvailabilitiesPresenter(httpRequest, repo)

    expect(response?.statusCode).toEqual(403)
    expect(response?.body).toEqual('Invalid role. Expected PROFESSOR but received COORDINATOR')
  })
  it('Should call presenter and return status 404', async () => {
    const repo = new ScheduleRepositoryMock()
    const userId = repo.getUsersLength() + 1
    const availabilities = [
      {
        startTime: 460,
        endTime: 560,
        weekDay: 'FRI'
      },
      {
        startTime: 460,
        endTime: 560,
        weekDay: 'SAT'
      },
      {
        startTime: 570,
        endTime: 670,
        weekDay: 'FRI'
      }
    ]
    const httpRequest = new HttpRequest(
      {
        'userId': userId,
        'availabilities': availabilities
      },
      undefined,
      {},
      undefined,
    )
    const response = await UpdateAvailabilitiesPresenter(httpRequest, repo)

    expect(response?.statusCode).toEqual(404)
    expect(response?.body).toEqual('No items found for userId')
  })
})
