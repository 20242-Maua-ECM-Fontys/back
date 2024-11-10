import { describe, it, expect } from 'vitest'
import { CreatePossibilitiesController } from '../../../../src/modules/create_possibilities/app/create_possibilities_controller'
import { CreatePossibilitiesUsecase } from '../../../../src/modules/create_possibilities/app/create_possibilities_usecase'
import { HttpRequest } from '../../../../src/shared/helpers/external_interfaces/http_models'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'
import { MAUA_START_TIME } from '../../../../src/shared/domain/enums/maua_start_time_enum'
import { MAUA_END_TIME } from '../../../../src/shared/domain/enums/maua_end_time_enum'

describe('Assert CreatePossibilitiesController is correct at all', () => {
  it('Should activate controller correctly', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new CreatePossibilitiesUsecase(
      repo
    )

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

    const controller = new CreatePossibilitiesController(usecase)
    const httpRequest = new HttpRequest(
      {
        'scheduleId': scheduleId,
        'dates': dates
      },
      undefined,
      {},
      undefined,
    )

    const possibilitiesLengthBefore = await repo.getPossibilitiesLength()
    const response = await controller.execute(httpRequest)
    const possibilitiesLengthAfter = await repo.getPossibilitiesLength()
    expect(response?.statusCode).toEqual(201)
    expect(response?.body.message).toEqual('possibilities created')
    expect(possibilitiesLengthAfter).toEqual(possibilitiesLengthBefore + 19)
  })
  it('Should activate controller correctly with optional dates', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new CreatePossibilitiesUsecase(
      repo
    )

    const scheduleId = "1S-2CIC-D4@2024(SCS)"
    const dates = {
      "MON": {
        notEarlier: 460,
        notLater: 560
      },
      "SAT": {
        notEarlier: 680,
        notLater: 1240
      },
    }

    const controller = new CreatePossibilitiesController(usecase)
    const httpRequest = new HttpRequest(
      {
        'scheduleId': scheduleId,
        'dates': dates
      },
      undefined,
      {},
      undefined,
    )

    const possibilitiesLengthBefore = await repo.getPossibilitiesLength()
    const response = await controller.execute(httpRequest)
    const possibilitiesLengthAfter = await repo.getPossibilitiesLength()
    expect(response?.statusCode).toEqual(201)
    expect(response?.body.message).toEqual('possibilities created')
    expect(possibilitiesLengthAfter).toEqual(possibilitiesLengthBefore + 6)
  })
  it('Should activate controller correctly without dates', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new CreatePossibilitiesUsecase(
      repo
    )

    const scheduleId = "1S-2CIC-D4@2024(SCS)"
    const dates = {
    }

    const controller = new CreatePossibilitiesController(usecase)
    const httpRequest = new HttpRequest(
      {
        'scheduleId': scheduleId,
        'dates': dates
      },
      undefined,
      {},
      undefined,
    )

    const possibilitiesLengthBefore = await repo.getPossibilitiesLength()
    const response = await controller.execute(httpRequest)
    const possibilitiesLengthAfter = await repo.getPossibilitiesLength()
    expect(response?.statusCode).toEqual(201)
    expect(response?.body.message).toEqual('possibilities created')
    expect(possibilitiesLengthAfter).toEqual(possibilitiesLengthBefore)
  })
  it('Should activate controller wrongly: scheduleId is missing', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new CreatePossibilitiesUsecase(
      repo
    )

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

    const controller = new CreatePossibilitiesController(usecase)
    const httpRequest = new HttpRequest(
      {
        'dates': dates
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual('Field scheduleId is missing')
  })
  it('Should activate controller wrongly: scheduleId with wrong type', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new CreatePossibilitiesUsecase(
      repo
    )

    const scheduleId = 1
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

    const controller = new CreatePossibilitiesController(usecase)
    const httpRequest = new HttpRequest(
      {
        'scheduleId': scheduleId,
        'dates': dates
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual("Field scheduleId isn't in the right type.\n Received: 1.\n Expected to be a string.")
  })
  it('Should activate controller wrongly: dates is missing', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new CreatePossibilitiesUsecase(
      repo
    )

    const scheduleId = "1S-2CIC-D4@2024(SCS)"
    

    const controller = new CreatePossibilitiesController(usecase)
    const httpRequest = new HttpRequest(
      {
        'scheduleId': scheduleId,
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual('Field dates is missing')
  })
  it('Should activate controller wrongly: dates with wrong type', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new CreatePossibilitiesUsecase(
      repo
    )

    const scheduleId = "1S-2CIC-D4@2024(SCS)"
    const dates = "mon tue wed thu fri sat"

    const controller = new CreatePossibilitiesController(usecase)
    const httpRequest = new HttpRequest(
      {
        'scheduleId': scheduleId,
        'dates': dates
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual("Field dates isn't in the right type.\n Received: mon tue wed thu fri sat.\n Expected to be a object.")
  })
  it('Should activate controller wrongly: weekDay with wrong type', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new CreatePossibilitiesUsecase(
      repo
    )

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
      "SUN": {
        notEarlier: 680,
        notLater: 1240
      },
    }

    const controller = new CreatePossibilitiesController(usecase)
    const httpRequest = new HttpRequest(
      {
        'scheduleId': scheduleId,
        'dates': dates
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual("Field weekDay isn't in the right type.\n Received: SUN.\n Expected to be a string as WEEK_DAY.")
  })
  it('Should activate controller wrongly: missing data of certain day', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new CreatePossibilitiesUsecase(
      repo
    )

    const scheduleId = "1S-2CIC-D4@2024(SCS)"
    const dates = {
      "MON": {
        notEarlier: 460,
        notLater: 560
      },
      "TUE": undefined,
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

    const controller = new CreatePossibilitiesController(usecase)
    const httpRequest = new HttpRequest(
      {
        'scheduleId': scheduleId,
        'dates': dates
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual('Field TUE is missing')
  })
  it('Should activate controller wrongly: dayData with wrong type', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new CreatePossibilitiesUsecase(
      repo
    )

    const scheduleId = "1S-2CIC-D4@2024(SCS)"
    const dates = {
      "MON": 460,
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

    const controller = new CreatePossibilitiesController(usecase)
    const httpRequest = new HttpRequest(
      {
        'scheduleId': scheduleId,
        'dates': dates
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual("Field MON isn't in the right type.\n Received: 460.\n Expected to be a object.")
  })
  it('Should activate controller wrongly: notEarlier is missing', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new CreatePossibilitiesUsecase(
      repo
    )

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

    const controller = new CreatePossibilitiesController(usecase)
    const httpRequest = new HttpRequest(
      {
        'scheduleId': scheduleId,
        'dates': dates
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual('Field notEarlier is missing')
  })
  it('Should activate controller wrongly: notEarlier with invalid type', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new CreatePossibilitiesUsecase(
      repo
    )

    const scheduleId = "1S-2CIC-D4@2024(SCS)"
    const dates = {
      "MON": {
        notEarlier: 490,
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

    const controller = new CreatePossibilitiesController(usecase)
    const httpRequest = new HttpRequest(
      {
        'scheduleId': scheduleId,
        'dates': dates
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual("Field notEarlier isn't in the right type.\n Received: 490.\n Expected to be a number as START_TIME.")
  })
  it('Should activate controller wrongly: notLater is missing', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new CreatePossibilitiesUsecase(
      repo
    )

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

    const controller = new CreatePossibilitiesController(usecase)
    const httpRequest = new HttpRequest(
      {
        'scheduleId': scheduleId,
        'dates': dates
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual('Field notLater is missing')
  })
  it('Should activate controller wrongly: notLater with invalid type', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new CreatePossibilitiesUsecase(
      repo
    )

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
        notLater: 1351
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

    const controller = new CreatePossibilitiesController(usecase)
    const httpRequest = new HttpRequest(
      {
        'scheduleId': scheduleId,
        'dates': dates
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual("Field notLater isn't in the right type.\n Received: 1351.\n Expected to be a number as END_TIME.")
  })
  it('Should activate controller wrongly: scheduleId not found', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new CreatePossibilitiesUsecase(
      repo
    )

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

    const controller = new CreatePossibilitiesController(usecase)
    const httpRequest = new HttpRequest(
      {
        'scheduleId': scheduleId,
        'dates': dates
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(404)
    expect(response?.body).toEqual('No items found for scheduleId')
  })
  it('Should activate controller wrongly: notEarlier bigger than notLater', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new CreatePossibilitiesUsecase(
      repo
    )

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
        notEarlier: 1250,
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

    const controller = new CreatePossibilitiesController(usecase)
    const httpRequest = new HttpRequest(
      {
        'scheduleId': scheduleId,
        'dates': dates
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual('Invalid time: notEarlier "1250" must be earlier than notLater "670"')
  })

})
