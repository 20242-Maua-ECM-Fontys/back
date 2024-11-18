import { describe, it, expect } from 'vitest'
import { CreatePossibilitiesPresenter } from '../../../../src/modules/create_possibilities/app/create_possibilities_presenter'
import { HttpRequest } from '../../../../src/shared/helpers/external_interfaces/http_models'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'

describe('Tests for CreatePossibilitiesPresenter', () => {
  it('Should call presenter and return status 201', async () => {
    const repo = new ScheduleRepositoryMock()

    const scheduleId = "1S-2CIC-D4@2024(SCS)"
    const dates = {
      "MON": {
        notEarlier: 460,
        notLater: 560
      },
      "TUE": {
        notEarlier: 460,
        notLater: 670
      },
      "WED": {
        notEarlier: 460,
        notLater: 670
      },
      "THU": {
        notEarlier: 460,
        notLater: 1350
      },
      "FRI": {
        notEarlier: 1250,
        notLater: 1350
      },
      "SAT": {
        notEarlier: 680,
        notLater: 1240
      },
    }
    const httpRequest = new HttpRequest(
      {
        'scheduleId': scheduleId,
        'dates': dates
      },
      undefined,
      {},
      undefined,
    )
    const response = await CreatePossibilitiesPresenter(httpRequest, repo)

    expect(response?.statusCode).toEqual(201)
    expect(response?.body.message).toEqual('possibilities created')
  })
  it('Should call presenter and return status 400', async () => {
    const repo = new ScheduleRepositoryMock()

    const scheduleId = "1S-2CIC-D4@2024(SCS)"
    const dates = {
      "MON": {
        notEarlier: 1250,
        notLater: 560
      },
      "TUE": {
        notEarlier: 460,
        notLater: 670
      },
      "WED": {
        notEarlier: 460,
        notLater: 670
      },
      "THU": {
        notEarlier: 460,
        notLater: 1350
      },
      "FRI": {
        notEarlier: 1250,
        notLater: 1350
      },
      "SAT": {
        notEarlier: 680,
        notLater: 1240
      },
    }
    const httpRequest = new HttpRequest(
      {
        'scheduleId': scheduleId,
        'dates': dates
      },
      undefined,
      {},
      undefined,
    )
    const response = await CreatePossibilitiesPresenter(httpRequest, repo)

    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual('Invalid time: notEarlier "1250" must be earlier than notLater "560"')
  })
  it('Should call presenter and return status 404', async () => {
    const repo = new ScheduleRepositoryMock()

    const scheduleId = "1S-1CIC-D6@2024(SCS)"
    const dates = {
      "MON": {
        notEarlier: 460,
        notLater: 560
      },
      "TUE": {
        notEarlier: 460,
        notLater: 670
      },
      "WED": {
        notEarlier: 460,
        notLater: 670
      },
      "THU": {
        notEarlier: 460,
        notLater: 1350
      },
      "FRI": {
        notEarlier: 1250,
        notLater: 1350
      },
      "SAT": {
        notEarlier: 680,
        notLater: 1240
      },
    }
    const httpRequest = new HttpRequest(
      {
        'scheduleId': scheduleId,
        'dates': dates
      },
      undefined,
      {},
      undefined,
    )
    const response = await CreatePossibilitiesPresenter(httpRequest, repo)

    expect(response?.statusCode).toEqual(404)
    expect(response?.body).toEqual('No items found for scheduleId')
  })
  
})
