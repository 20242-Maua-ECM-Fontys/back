import { it, expect, describe } from 'vitest'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'
import { GetAllSchedulesUsecase } from '../../../../src/modules/get_all_schedules/app/get_all_schedules_usecase'

describe('Assert GetAllSchedulesUsecase is correct', () => {
  it('Should return all schedules', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetAllSchedulesUsecase(repo)

    const schedules = await usecase.execute()

    expect(schedules).toEqual(await repo.getAllSchedules())
  })

})
