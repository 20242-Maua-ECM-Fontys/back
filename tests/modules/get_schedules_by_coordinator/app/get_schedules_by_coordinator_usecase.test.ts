import { describe, it, expect } from 'vitest'
import { GetSchedulesByCoordinatorUsecase } from '../../../../src/modules/get_schedules_by_coordinator/app/get_schedules_by_coordinator_usecase'
import { EntityError } from '../../../../src/shared/helpers/errors/domain_errors'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'
import { InvalidRole } from '../../../../src/shared/helpers/errors/usecase_errors'

describe('GetSchedulesByCoordinatorUsecase tests', () => {
  it('Should return a list of schedules', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetSchedulesByCoordinatorUsecase(repo)
    const response = await usecase.execute(2)
    expect(response.length).toEqual(4)
    expect(response[0].schedule.scheduleId).toEqual('2S-4CM-D5@2024(SCS)')
    expect(response[0].classes.length).toEqual(2)
    expect(response[0].possibilities.length).toEqual(18)
  })

  it('Should return an empty list if user has no schedules', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetSchedulesByCoordinatorUsecase(repo)
    const response = await usecase.execute(6)
    expect(response.length).toEqual(0)
  })

  it('Should throw an error if coordinatorId is invalid', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetSchedulesByCoordinatorUsecase(repo)
    await expect(usecase.execute(-1)).rejects.toThrow(EntityError)
  })

  it('Should throw an error if user does not exist', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetSchedulesByCoordinatorUsecase(repo)
    const id = repo.getUsersLength() + 1
    await expect(usecase.execute(id)).rejects.toThrow(
      'No items found for userId',
    )
  })

  it('Should throw an error if user is not a coordinator', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetSchedulesByCoordinatorUsecase(repo)
    await expect(usecase.execute(1)).rejects.toThrow(InvalidRole)
  })
})
