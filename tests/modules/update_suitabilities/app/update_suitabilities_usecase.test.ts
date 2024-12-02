import { UpdateSuitabilitiesUsecase } from '../../../../src/modules/update_suitabilities/app/update_suitabilities_usecase'
import { describe, it, expect } from 'vitest'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'

describe('Tests for UpdateSuitabilitiesUsecase', () => {
  it('Should activate usecase correctly', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateSuitabilitiesUsecase(repo)
    const userId = 3
    const subjects = ['ECM256', 'EFB207']

    await usecase.execute(userId, subjects)

    const suitabilitiesForUser = await repo.getSuitabilitiesByUserId(userId)

    expect(suitabilitiesForUser.length).toEqual(2)

    expect(suitabilitiesForUser[0].codeSubject).toEqual('ECM256')
    expect(suitabilitiesForUser[0].userId).toEqual(userId)

    expect(suitabilitiesForUser[1].codeSubject).toEqual('EFB207')
    expect(suitabilitiesForUser[1].userId).toEqual(userId)
  })

  it('Should activate usecase correctly for user without suitabilities', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateSuitabilitiesUsecase(repo)
    const userId = 3
    const subjects = []

    await usecase.execute(userId, subjects)

    const suitabilitiesForUser = await repo.getSuitabilitiesByUserId(userId)

    expect(suitabilitiesForUser.length).toEqual(0)
  })

  it('Should throw error for invalid subject code', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateSuitabilitiesUsecase(repo)
    const userId = 3
    const subjects = ['MC']

    try {
      await usecase.execute(userId, subjects)
    } catch (error) {
      expect(error.message).toEqual('Field codeSubject is not valid')
    }
  })

  it('Should throw error for invalid role', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateSuitabilitiesUsecase(repo)
    const userId = 1
    const subjects = ['EMC102', 'EMC202']

    try {
      await usecase.execute(userId, subjects)
    } catch (error) {
      expect(error.message).toEqual(
        'Invalid role. Expected PROFESSOR or COORDINATOR but received STAFF',
      )
    }
  })

  it('Should throw error for user not found', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new UpdateSuitabilitiesUsecase(repo)
    const userId = repo.getUsersLength() + 1
    const subjects = ['MC102', 'MC202']

    try {
      await usecase.execute(userId, subjects)
    } catch (error) {
      expect(error.message).toEqual('No items found for userId')
    }
  })
})
