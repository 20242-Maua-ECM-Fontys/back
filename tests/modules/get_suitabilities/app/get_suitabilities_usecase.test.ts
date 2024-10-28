import { GetSuitabilitiesUsecase } from '../../../../src/modules/get_suitabilities/app/get_suitabilities_usecase'
import { EntityError } from '../../../../src/shared/helpers/errors/domain_errors'
import { NoItemsFound } from '../../../../src/shared/helpers/errors/usecase_errors'
import { describe, it, expect } from 'vitest'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'

describe('GetSuitabilitiesUsecase tests', () => {
  it('Should return a list of suitabilities', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetSuitabilitiesUsecase(repo)
    const response = await usecase.execute(4)
    expect(response.length).toEqual(2)
  })
  it('Should throw an error if userId is invalid', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetSuitabilitiesUsecase(repo)
    await expect(usecase.execute(-1)).rejects.toThrow(EntityError)
  })

  it('Should throw an error if no suitabilities are found', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetSuitabilitiesUsecase(repo)
    await expect(usecase.execute(1)).rejects.toThrow(NoItemsFound)
  })

  it('Should throw an error if user does not exist', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetSuitabilitiesUsecase(repo)
    const id = repo.getUsersLength() + 1
    await expect(usecase.execute(id)).rejects.toThrow(
      'No items found for userId',
    )
  })
})
