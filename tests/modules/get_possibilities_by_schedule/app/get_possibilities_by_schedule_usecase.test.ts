import { describe, it, expect } from 'vitest'
import { EntityError } from '../../../../src/shared/helpers/errors/domain_errors'
import { NoItemsFound } from '../../../../src/shared/helpers/errors/repo_error'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'
import { GetPossibilitiesByScheduleUsecase } from '../../../../src/modules/get_possibilities_by_schedule/app/get_possibilities_by_schedule_usecase'

describe('GetPossibilitiesByScheduleUsecase tests', () => {
  it('Should return a list of possibilities', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetPossibilitiesByScheduleUsecase(repo)
    const response = await usecase.execute('2S-4CM-D5@2024(SCS)', 1)
    expect(response.length).toEqual(18)
  })
  it('Should throw an error if scheduleId is invalid', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetPossibilitiesByScheduleUsecase(repo)
    await expect(usecase.execute('invalid', 1)).rejects.toThrow(EntityError)
  })

  it('Should return an empty possibilities list', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetPossibilitiesByScheduleUsecase(repo)
    const response = await usecase.execute('1S-2CIC-D4@2024(SCS)', 1)

    expect(response.length).toEqual(0)
  })
  it('Should return error if no possibilities are found', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetPossibilitiesByScheduleUsecase(repo)
    await expect(usecase.execute('4S-2CIC-D4@2024(SCS)', 1)).rejects.toThrow(
      NoItemsFound,
    )
  })
})
