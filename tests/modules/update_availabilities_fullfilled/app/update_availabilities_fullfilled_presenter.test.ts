import { describe, it, expect } from 'vitest'
import { UpdateAvailabilitiesFullfilledPresenter } from '../../../../src/modules/update_availabilities_fullfilled/app/update_availabilities_fullfilled_presenter'
import { HttpRequest } from '../../../../src/shared/helpers/external_interfaces/http_models'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'
import { AvailabilitiesFullfilledParam } from '../../../../src/modules/update_availabilities_fullfilled/app/update_availabilities_fullfilled_usecase'

describe('Tests for UpdateAvailabilitiesFullfilledPresenter', () => {
  it('Should call presenter and return OK with status 200', async () => {
    const repo = new ScheduleRepositoryMock()
    const scheduleId = "2S-4CM-D5@2024(SCS)"
    const availabilitiesFullfilled : AvailabilitiesFullfilledParam[] = [
      {
        userId:3,
        classId:"0a8c5357-1f07-5b24-9845-9318c47ac926",
        possibilityId:"124e4567-e89b-12d3-a456-426614174000"
      },
      {
        userId:3,
        possibilityId:"123e4567-e89b-12d3-a456-426614174001",
        classId:"0a8c5357-1f07-5b24-9845-9318c47ac927"
      },
      {
        userId: 3,
        possibilityId: '113e4567-e89b-12d3-a456-426614174000',
        classId: '0a8c5357-1f07-5b24-9845-9318c47ac924',
      }
    ]
    const httpRequest = new HttpRequest(
      {
        'scheduleId': scheduleId,
        'availabilitiesFullfilled': availabilitiesFullfilled
      },
      undefined,
      {},
      undefined,
    )
    const response = await UpdateAvailabilitiesFullfilledPresenter(httpRequest, repo)

    expect(response?.statusCode).toEqual(200)
    expect(response?.body.message).toEqual('availabilities fullfilled updated')
  })
  it('Should call presenter and return Bad Request with status 400', async () => {
    const repo = new ScheduleRepositoryMock()
    const scheduleId = "2S-4CM-D5@2024(SCS)"
    const availabilitiesFullfilled : AvailabilitiesFullfilledParam[] = [
      {
        classId:"0a8c5357-1f07-5b24-9845-9318c47ac926",
        possibilityId:"124e4567-e89b-12d3-a456-426614174000"
      },
      {
        userId:3,
        possibilityId:"123e4567-e89b-12d3-a456-426614174001",
        classId:"0a8c5357-1f07-5b24-9845-9318c47ac927"
      },
      {
        userId: 3,
        possibilityId: '113e4567-e89b-12d3-a456-426614174000',
        classId: '0a8c5357-1f07-5b24-9845-9318c47ac924',
      }
    ]
    const httpRequest = new HttpRequest(
      {
        'scheduleId': scheduleId,
        'availabilitiesFullfilled': availabilitiesFullfilled
      },
      undefined,
      {},
      undefined,
    )
    const response = await UpdateAvailabilitiesFullfilledPresenter(httpRequest, repo)

    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual('Field userId is missing')
  })
  it('Should call presenter and return Forbidden with status 403', async () => {
    const repo = new ScheduleRepositoryMock()
    const scheduleId = "2S-4CM-D5@2024(SCS)"
    const availabilitiesFullfilled : AvailabilitiesFullfilledParam[] = [
      {
        userId:3,
        classId:"0a8c5357-1f07-5b24-9845-9318c47ac926",
        possibilityId:"124e4567-e89b-12d3-a456-426614174000"
      },
      {
        userId:1,
        possibilityId:"123e4567-e89b-12d3-a456-426614174001",
        classId:"0a8c5357-1f07-5b24-9845-9318c47ac927"
      },
      {
        userId: 3,
        possibilityId: '113e4567-e89b-12d3-a456-426614174000',
        classId: '0a8c5357-1f07-5b24-9845-9318c47ac924',
      }
    ]
    const httpRequest = new HttpRequest(
      {
        'scheduleId': scheduleId,
        'availabilitiesFullfilled': availabilitiesFullfilled
      },
      undefined,
      {},
      undefined,
    )
    const response = await UpdateAvailabilitiesFullfilledPresenter(httpRequest, repo)

    expect(response?.statusCode).toEqual(403)
    expect(response?.body).toEqual('The data rule "user must be a professor" was violated')
  })
  it('Should call presenter and return NotFound with status 404', async () => {
    const repo = new ScheduleRepositoryMock()
    const scheduleId = "2S-4CM-D5@2024(SCS)"
    const availabilitiesFullfilled : AvailabilitiesFullfilledParam[] = [
      {
        userId:await repo.getUsersLength() + 1,
        classId:"0a8c5357-1f07-5b24-9845-9318c47ac926",
        possibilityId:"124e4567-e89b-12d3-a456-426614174000"
      },
      {
        userId:3,
        possibilityId:"123e4567-e89b-12d3-a456-426614174001",
        classId:"0a8c5357-1f07-5b24-9845-9318c47ac927"
      },
      {
        userId: 3,
        possibilityId: '113e4567-e89b-12d3-a456-426614174000',
        classId: '0a8c5357-1f07-5b24-9845-9318c47ac924',
      }
    ]
    const httpRequest = new HttpRequest(
      {
        'scheduleId': scheduleId,
        'availabilitiesFullfilled': availabilitiesFullfilled
      },
      undefined,
      {},
      undefined,
    )
    const response = await UpdateAvailabilitiesFullfilledPresenter(httpRequest, repo)

    expect(response?.statusCode).toEqual(404)
    expect(response?.body).toEqual('No items found for userId')
  })
  it('Should call presenter and return Conflict with status 409', async () => {
    const repo = new ScheduleRepositoryMock()
    const scheduleId = "2S-4CM-D5@2024(SCS)"
    const availabilitiesFullfilled : AvailabilitiesFullfilledParam[] = [
      {
        userId:3,
        possibilityId:"125e4567-e89b-12d3-a456-426614174001",
        classId:"0a8c5357-1f07-5b24-9845-9318c47ac926"
      },
      {
        userId: 3,
        possibilityId: '113e4567-e89b-12d3-a456-426614174000',
        classId: '0a8c5357-1f07-5b24-9845-9318c47ac924',
      }
    ]
    const httpRequest = new HttpRequest(
      {
        'scheduleId': scheduleId,
        'availabilitiesFullfilled': availabilitiesFullfilled
      },
      undefined,
      {},
      undefined,
    )
    const response = await UpdateAvailabilitiesFullfilledPresenter(httpRequest, repo)

    expect(response?.statusCode).toEqual(409)
    expect(response?.body).toEqual("The professor with id 3 is already assigned to schedule with id 2S-3CM-D5@2024(SCS)")
  })
})
