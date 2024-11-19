import { describe, it, expect } from 'vitest'

import { AvailabilitiesFullfilledParam, UpdateAvailabilitiesFullfilledUsecase } from '../../../../src/modules/update_availabilities_fullfilled/app/update_availabilities_fullfilled_usecase'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'

describe('Assert UpdateAvailabilitiesFullfilledUsecase is correct at all', () => {
  it('Should activate usecase correctly: creating 3 avsFullfilled, deleting 1 (first one) and mantaining 1 (second one)', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesFullfilledUsecase(repo)
    const scheduleId = "2S-4CM-D5@2024(SCS)"
    const avsFullfilledParam : AvailabilitiesFullfilledParam[] = [
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

    await usecase.execute(scheduleId, avsFullfilledParam)

    const avsFullfiled = await repo.getAllAvsFullfilled()
    expect(avsFullfiled.length).toEqual(4)

    const expectedAvsFullfilled = [
      {
        availabilityId: "0a8c5357-1f07-5b24-9845-9318c4000009",
        possibilityId: "b63e4567-e89b-12d3-a456-426614174001",
        classId: "0a8c5357-1f07-5b24-9845-9318c47ac925",
        roomCode: undefined,
      },
      {
        availabilityId: "0a8c5357-1f07-5b24-9845-9318c4000008",
        possibilityId: "124e4567-e89b-12d3-a456-426614174000",
        classId: "0a8c5357-1f07-5b24-9845-9318c47ac926",
        roomCode: undefined,
      },
      {
        availabilityId: "0a8c5357-1f07-5b24-9845-9318c4000001",
        possibilityId: "123e4567-e89b-12d3-a456-426614174001",
        classId: "0a8c5357-1f07-5b24-9845-9318c47ac927",
        roomCode: undefined,
      },
      {
        availabilityId: "0a8c5357-1f07-5b24-9845-9318c4000000",
        possibilityId: "113e4567-e89b-12d3-a456-426614174000",
        classId: "0a8c5357-1f07-5b24-9845-9318c47ac924",
        roomCode: undefined,
      },
    ]

    for(let i = 0; i < 4; i++){
      expect(avsFullfiled[i].availabilityId).toEqual(expectedAvsFullfilled[i].availabilityId)
      expect(avsFullfiled[i].possibilityId).toEqual(expectedAvsFullfilled[i].possibilityId)
      expect(avsFullfiled[i].classId).toEqual(expectedAvsFullfilled[i].classId)
      expect(avsFullfiled[i].roomCode).toEqual(expectedAvsFullfilled[i].roomCode)
    }


  })
  it('Should activate usecase correctly: creating 0 avsFullfilled, deleting 1 (first one) and mantaining 1 (second one)', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesFullfilledUsecase(repo)
    const scheduleId = "2S-4CM-D5@2024(SCS)"
    const avsFullfilledParam : AvailabilitiesFullfilledParam[] = [
    ]

    await usecase.execute(scheduleId, avsFullfilledParam)

    const avsFullfiled = await repo.getAllAvsFullfilled()
    expect(avsFullfiled.length).toEqual(1)

    const expectedAvsFullfilled = [
      {
        availabilityId: "0a8c5357-1f07-5b24-9845-9318c4000009",
        possibilityId: "b63e4567-e89b-12d3-a456-426614174001",
        classId: "0a8c5357-1f07-5b24-9845-9318c47ac925",
        roomCode: undefined,
      },
    ]

    for(let i = 0; i < 1; i++){
      expect(avsFullfiled[i].availabilityId).toEqual(expectedAvsFullfilled[i].availabilityId)
      expect(avsFullfiled[i].possibilityId).toEqual(expectedAvsFullfilled[i].possibilityId)
      expect(avsFullfiled[i].classId).toEqual(expectedAvsFullfilled[i].classId)
      expect(avsFullfiled[i].roomCode).toEqual(expectedAvsFullfilled[i].roomCode)
    }


  })
  it('Should activate usecase correctly: two updates to delete all database', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesFullfilledUsecase(repo)
    const scheduleId1 = "2S-4CM-D5@2024(SCS)"
    const scheduleId2 = "2S-3CM-D5@2024(SCS)"
    const avsFullfilledParam : AvailabilitiesFullfilledParam[] = [
    ]

    await usecase.execute(scheduleId1, avsFullfilledParam)
    await usecase.execute(scheduleId2, avsFullfilledParam)

    const avsFullfiled = await repo.getAllAvsFullfilled()
    expect(avsFullfiled.length).toEqual(0)


  })
  it('Should activate usecase correctly: creating 0 avsFullfilled, deleting 0 (first one) and mantaining 2 (second one)', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesFullfilledUsecase(repo)
    const scheduleId1 = "2S-4CM-D5@2024(SCS)"
    const scheduleId2 = "2S-3CM-D5@2024(SCS)"
    const avsFullfilledParam1 : AvailabilitiesFullfilledParam[] = [
      {
        userId: 4,
        possibilityId: '113e4567-e89b-12d3-a456-426614174000',
        classId: '0a8c5357-1f07-5b24-9845-9318c47ac924',
      }
    ]

    const avsFullfilledParam2 : AvailabilitiesFullfilledParam[] = [
      {
        userId: 3,
        possibilityId: 'b63e4567-e89b-12d3-a456-426614174001',
        classId: '0a8c5357-1f07-5b24-9845-9318c47ac925',
      }
    ]

    await usecase.execute(scheduleId1, avsFullfilledParam1)
    await usecase.execute(scheduleId2, avsFullfilledParam2)

    const avsFullfiled = await repo.getAllAvsFullfilled()
    expect(avsFullfiled.length).toEqual(2)

    const expectedAvsFullfilled = [
      {
        availabilityId: "0a8c5357-1f07-5b24-9845-9318c400000a",
        possibilityId: "113e4567-e89b-12d3-a456-426614174000",
        classId: "0a8c5357-1f07-5b24-9845-9318c47ac924",
        roomCode: undefined,
      },
      {
        availabilityId: "0a8c5357-1f07-5b24-9845-9318c4000009",
        possibilityId: "b63e4567-e89b-12d3-a456-426614174001",
        classId: "0a8c5357-1f07-5b24-9845-9318c47ac925",
        roomCode: undefined,
      },
  ]

    for(let i = 0; i < 2; i++){
      expect(avsFullfiled[i].availabilityId).toEqual(expectedAvsFullfilled[i].availabilityId)
      expect(avsFullfiled[i].possibilityId).toEqual(expectedAvsFullfilled[i].possibilityId)
      expect(avsFullfiled[i].classId).toEqual(expectedAvsFullfilled[i].classId)
      expect(avsFullfiled[i].roomCode).toEqual(expectedAvsFullfilled[i].roomCode)
    }


  })
  it('Should raise error: scheduleId not found', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesFullfilledUsecase(repo)
    const scheduleId = "2S-4CM-D5@2000(SCS)"
    const avsFullfilledParam : AvailabilitiesFullfilledParam[] = [
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

    const lengthUserAvsFullfilledBefore = await repo.getAvsFullfilledLength() 

    await expect(usecase.execute(scheduleId, avsFullfilledParam)).rejects.toThrowError(
      'No items found for scheduleId',
    )

    const lengthUserAvsFullfilledAfter = await repo.getAvsFullfilledLength()

    expect(lengthUserAvsFullfilledBefore).toEqual(lengthUserAvsFullfilledAfter)
  })
  it('Should raise error: duplicated classId', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesFullfilledUsecase(repo)
    const scheduleId = "2S-4CM-D5@2024(SCS)"
    const avsFullfilledParam : AvailabilitiesFullfilledParam[] = [
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

    const lengthUserAvsFullfilledBefore = await repo.getAvsFullfilledLength() 

    await expect(usecase.execute(scheduleId, avsFullfilledParam)).rejects.toThrowError(
      'Duplicated item on list of class ids',
    )

    const lengthUserAvsFullfilledAfter = await repo.getAvsFullfilledLength()

    expect(lengthUserAvsFullfilledBefore).toEqual(lengthUserAvsFullfilledAfter)
  })
  it('Should raise error: classId not found', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesFullfilledUsecase(repo)
    const scheduleId = "2S-4CM-D5@2024(SCS)"
    const avsFullfilledParam : AvailabilitiesFullfilledParam[] = [
      {
        userId:3,
        classId:"0a8c5357-1f07-5b24-9845-9318c47ac926",
        possibilityId:"124e4567-e89b-12d3-a456-426614174000"
      },
      {
        userId:3,
        possibilityId:"123e4567-e89b-12d3-a456-426614174001",
        classId:"0a8c5357-9090-5b24-9845-9318c47ac927"
      },
      {
        userId: 3,
        possibilityId: '113e4567-e89b-12d3-a456-426614174000',
        classId: '0a8c5357-1f07-5b24-9845-9318c47ac924',
      }
    ]

    const lengthUserAvsFullfilledBefore = await repo.getAvsFullfilledLength() 

    await expect(usecase.execute(scheduleId, avsFullfilledParam)).rejects.toThrowError(
      'No items found for classId',
    )

    const lengthUserAvsFullfilledAfter = await repo.getAvsFullfilledLength()

    expect(lengthUserAvsFullfilledBefore).toEqual(lengthUserAvsFullfilledAfter)
  })
  it('Should raise error: userId not found', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesFullfilledUsecase(repo)
    const scheduleId = "2S-4CM-D5@2024(SCS)"
    const avsFullfilledParam : AvailabilitiesFullfilledParam[] = [
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

    const lengthUserAvsFullfilledBefore = await repo.getAvsFullfilledLength() 

    await expect(usecase.execute(scheduleId, avsFullfilledParam)).rejects.toThrowError(
      'No items found for userId',
    )

    const lengthUserAvsFullfilledAfter = await repo.getAvsFullfilledLength()

    expect(lengthUserAvsFullfilledBefore).toEqual(lengthUserAvsFullfilledAfter)
  })
  it('Should raise error: user must be a professor', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesFullfilledUsecase(repo)
    const scheduleId = "2S-4CM-D5@2024(SCS)"
    const avsFullfilledParam : AvailabilitiesFullfilledParam[] = [
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

    const lengthUserAvsFullfilledBefore = await repo.getAvsFullfilledLength() 

    await expect(usecase.execute(scheduleId, avsFullfilledParam)).rejects.toThrowError(
      'The data rule "user must be a professor" was violated',
    )

    const lengthUserAvsFullfilledAfter = await repo.getAvsFullfilledLength()

    expect(lengthUserAvsFullfilledBefore).toEqual(lengthUserAvsFullfilledAfter)
  })
  it('Should raise error: duplicated possibility', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesFullfilledUsecase(repo)
    const scheduleId = "2S-4CM-D5@2024(SCS)"
    const avsFullfilledParam : AvailabilitiesFullfilledParam[] = [
      {
        userId:3,
        classId:"0a8c5357-1f07-5b24-9845-9318c47ac926",
        possibilityId:"124e4567-e89b-12d3-a456-426614174000"
      },
      {
        userId:3,
        possibilityId:"124e4567-e89b-12d3-a456-426614174000",
        classId:"0a8c5357-1f07-5b24-9845-9318c47ac927"
      },
      {
        userId: 3,
        possibilityId: '113e4567-e89b-12d3-a456-426614174000',
        classId: '0a8c5357-1f07-5b24-9845-9318c47ac924',
      }
    ]

    const lengthUserAvsFullfilledBefore = await repo.getAvsFullfilledLength() 

    await expect(usecase.execute(scheduleId, avsFullfilledParam)).rejects.toThrowError(
      'Duplicated item on list of possibility ids',
    )

    const lengthUserAvsFullfilledAfter = await repo.getAvsFullfilledLength()

    expect(lengthUserAvsFullfilledBefore).toEqual(lengthUserAvsFullfilledAfter)
  })
  it('Should raise error: possibilityId not found', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesFullfilledUsecase(repo)
    const scheduleId = "2S-4CM-D5@2024(SCS)"
    const avsFullfilledParam : AvailabilitiesFullfilledParam[] = [
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
        possibilityId: '113e4567-0102-12d3-a456-426614174000',
        classId: '0a8c5357-1f07-5b24-9845-9318c47ac924',
      }
    ]

    const lengthUserAvsFullfilledBefore = await repo.getAvsFullfilledLength() 

    await expect(usecase.execute(scheduleId, avsFullfilledParam)).rejects.toThrowError(
      'No items found for possibilityId',
    )

    const lengthUserAvsFullfilledAfter = await repo.getAvsFullfilledLength()

    expect(lengthUserAvsFullfilledBefore).toEqual(lengthUserAvsFullfilledAfter)
  })
  it('Should raise error: possibility do not refeer to scheduleId specified', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesFullfilledUsecase(repo)
    const scheduleId = "2S-4CM-D5@2024(SCS)"
    const avsFullfilledParam : AvailabilitiesFullfilledParam[] = [
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

    const lengthUserAvsFullfilledBefore = await repo.getAvsFullfilledLength() 

    await expect(usecase.execute(scheduleId, avsFullfilledParam)).rejects.toThrowError(
      "The entity possibility with id a13e4567-e89b-12d3-a456-426614174000 doesn't refeers to scheduleId 2S-4CM-D5@2024(SCS)",
    )

    const lengthUserAvsFullfilledAfter = await repo.getAvsFullfilledLength()

    expect(lengthUserAvsFullfilledBefore).toEqual(lengthUserAvsFullfilledAfter)
  })
  it('Should raise error: class do not refeer to scheduleId specified', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesFullfilledUsecase(repo)
    const scheduleId = "2S-4CM-D5@2024(SCS)"
    const avsFullfilledParam : AvailabilitiesFullfilledParam[] = [
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

    const lengthUserAvsFullfilledBefore = await repo.getAvsFullfilledLength() 

    await expect(usecase.execute(scheduleId, avsFullfilledParam)).rejects.toThrowError(
      "The entity class with id 0a8c5357-1f07-5b24-9845-9318c47ac925 doesn't refeers to scheduleId 2S-4CM-D5@2024(SCS)",
    )

    const lengthUserAvsFullfilledAfter = await repo.getAvsFullfilledLength()

    expect(lengthUserAvsFullfilledBefore).toEqual(lengthUserAvsFullfilledAfter)
  })
  it('Should raise error: professor does not have suitability for certain class', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesFullfilledUsecase(repo)
    const scheduleId = "2S-4CM-D5@2024(SCS)"
    const avsFullfilledParam : AvailabilitiesFullfilledParam[] = [
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

    const lengthUserAvsFullfilledBefore = await repo.getAvsFullfilledLength() 

    await expect(usecase.execute(scheduleId, avsFullfilledParam)).rejects.toThrowError(
      'The professor with id 4 cannot teach the class with id 0a8c5357-1f07-5b24-9845-9318c47ac926',
    )

    const lengthUserAvsFullfilledAfter = await repo.getAvsFullfilledLength()

    expect(lengthUserAvsFullfilledBefore).toEqual(lengthUserAvsFullfilledAfter)
  })
  it('Should raise error: professor does not have availability for certain possibility', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesFullfilledUsecase(repo)
    const scheduleId = "2S-4CM-D5@2024(SCS)"
    const avsFullfilledParam : AvailabilitiesFullfilledParam[] = [
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

    const lengthUserAvsFullfilledBefore = await repo.getAvsFullfilledLength() 

    await expect(usecase.execute(scheduleId, avsFullfilledParam)).rejects.toThrowError(
      "The professor with id 4 doesn't have availability from 460 to 560",
    )

    const lengthUserAvsFullfilledAfter = await repo.getAvsFullfilledLength()

    expect(lengthUserAvsFullfilledBefore).toEqual(lengthUserAvsFullfilledAfter)
  })
  it('Should raise error: professor already have classes on certain time into other schedule', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateAvailabilitiesFullfilledUsecase(repo)
    const scheduleId = "2S-4CM-D5@2024(SCS)"
    const avsFullfilledParam : AvailabilitiesFullfilledParam[] = [
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

    const lengthUserAvsFullfilledBefore = await repo.getAvsFullfilledLength() 

    await expect(usecase.execute(scheduleId, avsFullfilledParam)).rejects.toThrowError(
      'The professor with id 3 is already assigned to schedule with id 2S-3CM-D5@2024(SCS)',
    )

    const lengthUserAvsFullfilledAfter = await repo.getAvsFullfilledLength()

    expect(lengthUserAvsFullfilledBefore).toEqual(lengthUserAvsFullfilledAfter)
  })
})
