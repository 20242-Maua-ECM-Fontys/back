import { describe, it, expect } from 'vitest'
import { UpdateAvailabilitiesController } from '../../../../src/modules/update_availabilities/app/update_availabilities_controller'
import { UpdateAvailabilitiesUsecase } from '../../../../src/modules/update_availabilities/app/update_availabilities_usecase'
import { HttpRequest } from '../../../../src/shared/helpers/external_interfaces/http_models'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'

describe('Assert UpdateAvailabilitiesController is correct at all', () => {
  it('Should activate controller correctly', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesUsecase(
      repo
    )

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

    const controller = new UpdateAvailabilitiesController(usecase)
    const httpRequest = new HttpRequest(
      {
        'userId': userId,
        'availabilities': availabilities
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(200)
    expect(response?.body.message).toEqual('availabilities updated')
    expect((await repo.getAvailabilitiesByUserId(userId)).length).toEqual(availabilities.length)

  })
  it('Should activate controller correctly: empty availabilities list', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesUsecase(
      repo
    )

    const userId = 3
    const availabilities = [
    ]

    const controller = new UpdateAvailabilitiesController(usecase)
    const httpRequest = new HttpRequest(
      {
        'userId': userId,
        'availabilities': availabilities
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(200)
    expect(response?.body.message).toEqual('availabilities updated')
    expect((await repo.getAvailabilitiesByUserId(userId)).length).toEqual(availabilities.length)
  })
  it('Should return BadRequest: missing userId', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesUsecase(
      repo
    )

    const userId = undefined
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

    const controller = new UpdateAvailabilitiesController(usecase)
    const httpRequest = new HttpRequest(
      {
        'userId': userId,
        'availabilities': availabilities
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual('Field userId is missing')
  })
  it('Should return BadRequest: userId with wrong type', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesUsecase(
      repo
    )

    const userId = '3.2'
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

    const controller = new UpdateAvailabilitiesController(usecase)
    const httpRequest = new HttpRequest(
      {
        'userId': userId,
        'availabilities': availabilities
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual("Field userId isn't in the right type.\n Received: 3.2.\n Expected to be a number.")
  })
  it('Should return BadRequest: missing availabilities', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesUsecase(
      repo
    )

    const userId = 3
    const availabilities = undefined

    const controller = new UpdateAvailabilitiesController(usecase)
    const httpRequest = new HttpRequest(
      {
        'userId': userId,
        'availabilities': availabilities
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual('Field availabilities is missing')
  })
  it('Should return BadRequest: availabilities with wrong type', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesUsecase(
      repo
    )

    const userId = 3
    const availabilities = {
      startTime: 460,
      endTime: 560,
      weekDay: 'FRI'
    }

    const controller = new UpdateAvailabilitiesController(usecase)
    const httpRequest = new HttpRequest(
      {
        'userId': userId,
        'availabilities': availabilities
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual("Field availabilities isn't in the right type.\n Received: [object Object].\n Expected to be a array.")
  })
  it('Should return BadRequest: missing startTime', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesUsecase(
      repo
    )

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
        endTime: 670,
        weekDay: 'FRI'
      }
    ]

    const controller = new UpdateAvailabilitiesController(usecase)
    const httpRequest = new HttpRequest(
      {
        'userId': userId,
        'availabilities': availabilities
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual('Field startTime is missing')
  })
  it('Should return BadRequest: startTime with wrong type', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesUsecase(
      repo
    )

    const userId = 3
    const availabilities = [
      {
        startTime: 460,
        endTime: 560,
        weekDay: 'FRI'
      },
      {
        startTime: '7h40',
        endTime: 560,
        weekDay: 'SAT'
      },
      {
        startTime: 570,
        endTime: 670,
        weekDay: 'FRI'
      }
    ]

    const controller = new UpdateAvailabilitiesController(usecase)
    const httpRequest = new HttpRequest(
      {
        'userId': userId,
        'availabilities': availabilities
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual("Field startTime isn't in the right type.\n Received: 7h40.\n Expected to be a string as MAUA_START_TIME.")
  })
  it('Should return BadRequest: missing endTime', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesUsecase(
      repo
    )

    const userId = 3
    const availabilities = [
      {
        startTime: 460,
        endTime: 560,
        weekDay: 'FRI'
      },
      {
        startTime: 460,
        weekDay: 'SAT'
      },
      {
        startTime: 570,
        endTime: 670,
        weekDay: 'FRI'
      }
    ]

    const controller = new UpdateAvailabilitiesController(usecase)
    const httpRequest = new HttpRequest(
      {
        'userId': userId,
        'availabilities': availabilities
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual('Field endTime is missing')
  })
  it('Should return BadRequest: endTime with wrong type', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesUsecase(
      repo
    )

    const userId = 3
    const availabilities = [
      {
        startTime: 460,
        endTime: 560,
        weekDay: 'FRI'
      },
      {
        startTime: 460,
        endTime: '9h30',
        weekDay: 'SAT'
      },
      {
        startTime: 570,
        endTime: 670,
        weekDay: 'FRI'
      }
    ]

    const controller = new UpdateAvailabilitiesController(usecase)
    const httpRequest = new HttpRequest(
      {
        'userId': userId,
        'availabilities': availabilities
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual("Field endTime isn't in the right type.\n Received: 9h30.\n Expected to be a string as MAUA_END_TIME.")
  })
  it('Should return BadRequest: missing weekDay', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesUsecase(
      repo
    )

    const userId = 3
    const availabilities = [
      {
        startTime: 460,
        endTime: 560,
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

    const controller = new UpdateAvailabilitiesController(usecase)
    const httpRequest = new HttpRequest(
      {
        'userId': userId,
        'availabilities': availabilities
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual('Field weekDay is missing')
  })
  it('Should return BadRequest: weekDay with wrong type', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesUsecase(
      repo
    )

    const userId = 3
    const availabilities = [
      {
        startTime: 460,
        endTime: 560,
        weekDay: 'friday'
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

    const controller = new UpdateAvailabilitiesController(usecase)
    const httpRequest = new HttpRequest(
      {
        'userId': userId,
        'availabilities': availabilities
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual("Field weekDay isn't in the right type.\n Received: friday.\n Expected to be a string as WEEK_DAY.")
  })
  it('Should return NotFound: user does not exists', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesUsecase(
      repo
    )

    const userId = await repo.getUsersLength() + 1
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

    const controller = new UpdateAvailabilitiesController(usecase)
    const httpRequest = new HttpRequest(
      {
        'userId': userId,
        'availabilities': availabilities
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(404)
    expect(response?.body).toEqual('No items found for userId')
  })
  it('Should return Forbidden: user is not a professor', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesUsecase(
      repo
    )

    const userId = await 1
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

    const controller = new UpdateAvailabilitiesController(usecase)
    const httpRequest = new HttpRequest(
      {
        'userId': userId,
        'availabilities': availabilities
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(403)
    expect(response?.body).toEqual('Invalid role. Expected PROFESSOR or COORDINATOR but received STAFF')
  })
  it('Should return BadRequest: invalid availability on param', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesUsecase(
      repo
    )

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
        endTime: 560,
        weekDay: 'FRI'
      }
    ]

    const controller = new UpdateAvailabilitiesController(usecase)
    const httpRequest = new HttpRequest(
      {
        'userId': userId,
        'availabilities': availabilities
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(500)
    expect(response?.body).toEqual(`startTime and endTime are not equal`)
  })

})
