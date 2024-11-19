import { describe, it, expect } from 'vitest'
import { UpdateAvailabilitiesFullfilledController } from '../../../../src/modules/update_availabilities_fullfilled/app/update_availabilities_fullfilled_controller'
import { AvailabilitiesFullfilledParam, UpdateAvailabilitiesFullfilledUsecase } from '../../../../src/modules/update_availabilities_fullfilled/app/update_availabilities_fullfilled_usecase'
import { HttpRequest } from '../../../../src/shared/helpers/external_interfaces/http_models'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'

describe('Assert UpdateAvailabilitiesFullfilledController is correct at all', () => {
  it('Should activate controller correctly', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesFullfilledUsecase(
      repo
    )

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

    const controller = new UpdateAvailabilitiesFullfilledController(usecase)
    const httpRequest = new HttpRequest(
      {
        'scheduleId': scheduleId,
        'availabilitiesFullfilled': availabilitiesFullfilled
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.body.message).toEqual('availabilities fullfilled updated')
    expect(response?.statusCode).toEqual(200)
    expect((await repo.getAvsFullfilledLength())).toEqual(4)

  })
  it('Should activate controller correctly: empty list of availabilitiesFullfilled for scheduleId specified', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesFullfilledUsecase(
      repo
    )

    const scheduleId = "2S-4CM-D5@2024(SCS)"
    const availabilitiesFullfilled : AvailabilitiesFullfilledParam[] = [
    ]

    const controller = new UpdateAvailabilitiesFullfilledController(usecase)
    const httpRequest = new HttpRequest(
      {
        'scheduleId': scheduleId,
        'availabilitiesFullfilled': availabilitiesFullfilled
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.body.message).toEqual('availabilities fullfilled updated')
    expect(response?.statusCode).toEqual(200)
    const avsFullfilled = await repo.getAllAvsFullfilled()
    for (const avFullfilled of avsFullfilled) {
      const avFullfilledClass = await repo.getClass(avFullfilled.classId)
      expect(avFullfilledClass.scheduleId != scheduleId).toEqual(true)
    }

  })
  it('Should return BadRequest: missing scheduleId', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesFullfilledUsecase(
      repo
    )

    const availabilitiesFullfilled : AvailabilitiesFullfilledParam[] = [
    ]

    const controller = new UpdateAvailabilitiesFullfilledController(usecase)
    const httpRequest = new HttpRequest(
      {
        'availabilitiesFullfilled': availabilitiesFullfilled
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual('Field scheduleId is missing')
  })
  it('Should return BadRequest: wrong type of scheduleId', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesFullfilledUsecase(
      repo
    )

    const scheduleId = 11
    const availabilitiesFullfilled : AvailabilitiesFullfilledParam[] = [
    ]

    const controller = new UpdateAvailabilitiesFullfilledController(usecase)
    const httpRequest = new HttpRequest(
      {
        'scheduleId': scheduleId,
        'availabilitiesFullfilled': availabilitiesFullfilled
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual("Field scheduleId isn't in the right type.\n Received: 11.\n Expected to be a string.")
  })
  it('Should return BadRequest: missing availabilitiesFullfilled', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesFullfilledUsecase(
      repo
    )

    const scheduleId = "2S-4CM-D5@2024(SCS)"

    const controller = new UpdateAvailabilitiesFullfilledController(usecase)
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
    expect(response?.body).toEqual('Field availabilitiesFullfilled is missing')
  })
  it('Should return BadRequest: wrong type of availabilitiesFullfilled', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesFullfilledUsecase(
      repo
    )

    const scheduleId = "2S-4CM-D5@2024(SCS)"

    const controller = new UpdateAvailabilitiesFullfilledController(usecase)
    const httpRequest = new HttpRequest(
      {
        'scheduleId': scheduleId,
        'availabilitiesFullfilled': 123
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual("Field availabilitiesFullfilled isn't in the right type.\n Received: 123.\n Expected to be a array.")
  })
  it('Should return BadRequest: missing userId', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesFullfilledUsecase(
      repo
    )

    const scheduleId = "2S-4CM-D5@2024(SCS)"
    const availabilitiesFullfilled : AvailabilitiesFullfilledParam[] = [
      {
        userId:3,
        classId:"0a8c5357-1f07-5b24-9845-9318c47ac926",
        possibilityId:"124e4567-e89b-12d3-a456-426614174000"
      },
      {
        possibilityId:"123e4567-e89b-12d3-a456-426614174001",
        classId:"0a8c5357-1f07-5b24-9845-9318c47ac927"
      },
      {
        userId: 3,
        possibilityId: '113e4567-e89b-12d3-a456-426614174000',
        classId: '0a8c5357-1f07-5b24-9845-9318c47ac924',
      }
    ]

    const controller = new UpdateAvailabilitiesFullfilledController(usecase)
    const httpRequest = new HttpRequest(
      {
        'scheduleId': scheduleId,
        'availabilitiesFullfilled': availabilitiesFullfilled
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual('Field userId is missing')
  })
  it('Should return BadRequest: wrong type of userId', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesFullfilledUsecase(
      repo
    )

    const scheduleId = "2S-4CM-D5@2024(SCS)"
    const availabilitiesFullfilled : AvailabilitiesFullfilledParam[] = [
      {
        userId:3,
        classId:"0a8c5357-1f07-5b24-9845-9318c47ac926",
        possibilityId:"124e4567-e89b-12d3-a456-426614174000"
      },
      {
        userId:"124e4567-e89b-12d3-a456-426614174000",
        possibilityId:"123e4567-e89b-12d3-a456-426614174001",
        classId:"0a8c5357-1f07-5b24-9845-9318c47ac927"
      },
      {
        userId: 3,
        possibilityId: '113e4567-e89b-12d3-a456-426614174000',
        classId: '0a8c5357-1f07-5b24-9845-9318c47ac924',
      }
    ]

    const controller = new UpdateAvailabilitiesFullfilledController(usecase)
    const httpRequest = new HttpRequest(
      {
        'scheduleId': scheduleId,
        'availabilitiesFullfilled': availabilitiesFullfilled
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual("Field userId isn't in the right type.\n Received: 124e4567-e89b-12d3-a456-426614174000.\n Expected to be a number.")
  })
  it('Should return BadRequest: missing classId', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesFullfilledUsecase(
      repo
    )

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
      },
      {
        userId: 3,
        possibilityId: '113e4567-e89b-12d3-a456-426614174000',
        classId: '0a8c5357-1f07-5b24-9845-9318c47ac924',
      }
    ]

    const controller = new UpdateAvailabilitiesFullfilledController(usecase)
    const httpRequest = new HttpRequest(
      {
        'scheduleId': scheduleId,
        'availabilitiesFullfilled': availabilitiesFullfilled
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual('Field classId is missing')
  })
  it('Should return BadRequest: wrong type of classId', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesFullfilledUsecase(
      repo
    )

    const scheduleId = "2S-4CM-D5@2024(SCS)"
    const availabilitiesFullfilled : AvailabilitiesFullfilledParam[] = [
      {
        userId:3,
        classId:1,
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

    const controller = new UpdateAvailabilitiesFullfilledController(usecase)
    const httpRequest = new HttpRequest(
      {
        'scheduleId': scheduleId,
        'availabilitiesFullfilled': availabilitiesFullfilled
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual("Field classId isn't in the right type.\n Received: 1.\n Expected to be a string.")
  })
  it('Should return BadRequest: missing possibilityId', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesFullfilledUsecase(
      repo
    )

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
        classId: '0a8c5357-1f07-5b24-9845-9318c47ac924',
      }
    ]

    const controller = new UpdateAvailabilitiesFullfilledController(usecase)
    const httpRequest = new HttpRequest(
      {
        'scheduleId': scheduleId,
        'availabilitiesFullfilled': availabilitiesFullfilled
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual('Field possibilityId is missing')
  })
  it('Should return BadRequest: wrong type of possibilityId', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesFullfilledUsecase(
      repo
    )

    const scheduleId = "2S-4CM-D5@2024(SCS)"
    const availabilitiesFullfilled : AvailabilitiesFullfilledParam[] = [
      {
        userId:3,
        classId:"0a8c5357-1f07-5b24-9845-9318c47ac926",
        possibilityId:"124e4567-e89b-12d3-a456-426614174000"
      },
      {
        userId:3,
        possibilityId:23,
        classId:"0a8c5357-1f07-5b24-9845-9318c47ac927"
      },
      {
        userId: 3,
        possibilityId: '113e4567-e89b-12d3-a456-426614174000',
        classId: '0a8c5357-1f07-5b24-9845-9318c47ac924',
      }
    ]

    const controller = new UpdateAvailabilitiesFullfilledController(usecase)
    const httpRequest = new HttpRequest(
      {
        'scheduleId': scheduleId,
        'availabilitiesFullfilled': availabilitiesFullfilled
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual("Field possibilityId isn't in the right type.\n Received: 23.\n Expected to be a string.")
  })
  it('Should return NotFound: scheduleId not found', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesFullfilledUsecase(
      repo
    )

    const scheduleId = "2S-4CM-D5@2002(SCS)"
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

    const controller = new UpdateAvailabilitiesFullfilledController(usecase)
    const httpRequest = new HttpRequest(
      {
        'scheduleId': scheduleId,
        'availabilitiesFullfilled': availabilitiesFullfilled
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(404)
    expect(response?.body).toEqual('No items found for scheduleId')
  })
  it('Should return BadRequest: duplicated classId', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesFullfilledUsecase(
      repo
    )

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
        classId: '0a8c5357-1f07-5b24-9845-9318c47ac926',
      }
    ]

    const controller = new UpdateAvailabilitiesFullfilledController(usecase)
    const httpRequest = new HttpRequest(
      {
        'scheduleId': scheduleId,
        'availabilitiesFullfilled': availabilitiesFullfilled
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual('Duplicated item on list of class ids')
  })
  it('Should return NotFound: classId not found', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesFullfilledUsecase(
      repo
    )

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
        classId:"0a8c5357-1f07-2222-9845-9318c47ac927"
      },
      {
        userId: 3,
        possibilityId: '113e4567-e89b-12d3-a456-426614174000',
        classId: '0a8c5357-1f07-5b24-9845-9318c47ac924',
      }
    ]

    const controller = new UpdateAvailabilitiesFullfilledController(usecase)
    const httpRequest = new HttpRequest(
      {
        'scheduleId': scheduleId,
        'availabilitiesFullfilled': availabilitiesFullfilled
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(404)
    expect(response?.body).toEqual('No items found for classId')
  })
  it('Should return NotFound: userId not found', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesFullfilledUsecase(
      repo
    )

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
        userId: await repo.getUsersLength() + 1,
        possibilityId: '113e4567-e89b-12d3-a456-426614174000',
        classId: '0a8c5357-1f07-5b24-9845-9318c47ac924',
      }
    ]

    const controller = new UpdateAvailabilitiesFullfilledController(usecase)
    const httpRequest = new HttpRequest(
      {
        'scheduleId': scheduleId,
        'availabilitiesFullfilled': availabilitiesFullfilled
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(404)
    expect(response?.body).toEqual('No items found for userId')
  })
  it('Should return Forbidden: user must be a professor', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesFullfilledUsecase(
      repo
    )

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

    const controller = new UpdateAvailabilitiesFullfilledController(usecase)
    const httpRequest = new HttpRequest(
      {
        'scheduleId': scheduleId,
        'availabilitiesFullfilled': availabilitiesFullfilled
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(403)
    expect(response?.body).toEqual('The data rule "user must be a professor" was violated')
  })
  it('Should return BadRequest: duplicated possibility', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesFullfilledUsecase(
      repo
    )

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
        possibilityId: '123e4567-e89b-12d3-a456-426614174001',
        classId: '0a8c5357-1f07-5b24-9845-9318c47ac924',
      }
    ]

    const controller = new UpdateAvailabilitiesFullfilledController(usecase)
    const httpRequest = new HttpRequest(
      {
        'scheduleId': scheduleId,
        'availabilitiesFullfilled': availabilitiesFullfilled
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual('Duplicated item on list of possibility ids')
  })
  it('Should return NotFound: possibilityId not found', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesFullfilledUsecase(
      repo
    )

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
        possibilityId: '113e4567-1313-12d3-a456-426614174000',
        classId: '0a8c5357-1f07-5b24-9845-9318c47ac924',
      }
    ]

    const controller = new UpdateAvailabilitiesFullfilledController(usecase)
    const httpRequest = new HttpRequest(
      {
        'scheduleId': scheduleId,
        'availabilitiesFullfilled': availabilitiesFullfilled
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(404)
    expect(response?.body).toEqual('No items found for possibilityId')
  })
  it('Should return BadRequest: possibility do not refeer to scheduleId specified', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesFullfilledUsecase(
      repo
    )

    const scheduleId = "2S-4CM-D5@2024(SCS)"
    const availabilitiesFullfilled : AvailabilitiesFullfilledParam[] = [
      {
        userId:3,
        classId:"0a8c5357-1f07-5b24-9845-9318c47ac926",
        possibilityId:"a13e4567-e89b-12d3-a456-426614174000"
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

    const controller = new UpdateAvailabilitiesFullfilledController(usecase)
    const httpRequest = new HttpRequest(
      {
        'scheduleId': scheduleId,
        'availabilitiesFullfilled': availabilitiesFullfilled
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual("The entity possibility with id a13e4567-e89b-12d3-a456-426614174000 doesn't refeers to scheduleId 2S-4CM-D5@2024(SCS) and groupNumber 1")
  })
  it('Should return BadRequest: class do not refeer to scheduleId specified', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesFullfilledUsecase(
      repo
    )

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
        classId: '0a8c5357-1f07-5b24-9845-9318c47ac925',
      }
    ]

    const controller = new UpdateAvailabilitiesFullfilledController(usecase)
    const httpRequest = new HttpRequest(
      {
        'scheduleId': scheduleId,
        'availabilitiesFullfilled': availabilitiesFullfilled
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual("The entity class with id 0a8c5357-1f07-5b24-9845-9318c47ac925 doesn't refeers to scheduleId 2S-4CM-D5@2024(SCS) and groupNumber 1")
  })
  it('Should return Forbidden: professor does not have suitability for certain class', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesFullfilledUsecase(
      repo
    )

    const scheduleId = "2S-4CM-D5@2024(SCS)"
    const availabilitiesFullfilled : AvailabilitiesFullfilledParam[] = [
      {
        userId:4,
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

    const controller = new UpdateAvailabilitiesFullfilledController(usecase)
    const httpRequest = new HttpRequest(
      {
        'scheduleId': scheduleId,
        'availabilitiesFullfilled': availabilitiesFullfilled
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(403)
    expect(response?.body).toEqual("The professor with id 4 cannot teach the class with id 0a8c5357-1f07-5b24-9845-9318c47ac926")
  })
  it('Should return Conflict: professor does not have availability for certain possibility', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesFullfilledUsecase(
      repo
    )

    const scheduleId = "2S-4CM-D5@2024(SCS)"
    const availabilitiesFullfilled : AvailabilitiesFullfilledParam[] = [
      {
        userId:3,
        classId:"0a8c5357-1f07-5b24-9845-9318c47ac926",
        possibilityId:"124e4567-e89b-12d3-a456-426614174000"
      },
      {
        userId:4,
        possibilityId:"143e4567-e89b-12d3-a456-426614174000",
        classId:"0a8c5357-1f07-5b24-9845-9318c47ac927"
      },
      {
        userId: 3,
        possibilityId: '113e4567-e89b-12d3-a456-426614174000',
        classId: '0a8c5357-1f07-5b24-9845-9318c47ac924',
      }
    ]

    const controller = new UpdateAvailabilitiesFullfilledController(usecase)
    const httpRequest = new HttpRequest(
      {
        'scheduleId': scheduleId,
        'availabilitiesFullfilled': availabilitiesFullfilled
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(409)
    expect(response?.body).toEqual("The professor with id 4 doesn't have availability from 460 to 560")
  })
  it('Should return Conflict: professor already have classes on certain time into other schedule', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesFullfilledUsecase(
      repo
    )

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

    const controller = new UpdateAvailabilitiesFullfilledController(usecase)
    const httpRequest = new HttpRequest(
      {
        'scheduleId': scheduleId,
        'availabilitiesFullfilled': availabilitiesFullfilled
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(409)
    expect(response?.body).toEqual("The professor with id 3 is already assigned to schedule with id 2S-3CM-D5@2024(SCS)")
  })
  it('Should return BadRequest: invalid classId format', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesFullfilledUsecase(
      repo
    )

    const scheduleId = "2S-4CM-D5@2024(SCS)"
    const availabilitiesFullfilled : AvailabilitiesFullfilledParam[] = [
      {
        userId:3,
        classId:"0a8c5357-1f079845-9318c47ac926",
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

    const controller = new UpdateAvailabilitiesFullfilledController(usecase)
    const httpRequest = new HttpRequest(
      {
        'scheduleId': scheduleId,
        'availabilitiesFullfilled': availabilitiesFullfilled
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual('Field classId is not valid')
  })
  it('Should return BadRequest: invalid possibilityId format', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesFullfilledUsecase(
      repo
    )

    const scheduleId = "2S-4CM-D5@2024(SCS)"
    const availabilitiesFullfilled : AvailabilitiesFullfilledParam[] = [
      {
        userId:3,
        classId:"0a8c5357-1f07-5b24-9845-9318c47ac926",
        possibilityId:"124e4567-e89b-12d3-a456-426614174000"
      },
      {
        userId:3,
        possibilityId:"123123e4567-e89b-12d3-a456-426614174001",
        classId:"0a8c5357-1f07-5b24-9845-9318c47ac927"
      },
      {
        userId: 3,
        possibilityId: '113e4567-e89b-12d3-a456-426614174000',
        classId: '0a8c5357-1f07-5b24-9845-9318c47ac924',
      }
    ]

    const controller = new UpdateAvailabilitiesFullfilledController(usecase)
    const httpRequest = new HttpRequest(
      {
        'scheduleId': scheduleId,
        'availabilitiesFullfilled': availabilitiesFullfilled
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual('Field possibilityId is not valid')
  })
  it('Should return BadRequest: invalid userId format', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesFullfilledUsecase(
      repo
    )

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
        userId: -3,
        possibilityId: '113e4567-e89b-12d3-a456-426614174000',
        classId: '0a8c5357-1f07-5b24-9845-9318c47ac924',
      }
    ]

    const controller = new UpdateAvailabilitiesFullfilledController(usecase)
    const httpRequest = new HttpRequest(
      {
        'scheduleId': scheduleId,
        'availabilitiesFullfilled': availabilitiesFullfilled
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toEqual('Field userId is not valid')
  })

})