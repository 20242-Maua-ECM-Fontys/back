import { it, expect, describe } from 'vitest'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'
import { GetAllSubjectsUsecase } from '../../../../src/modules/get_all_subjects/app/get_all_subjects_usecase'

describe('Assert GetAllSubjectsUsecase is correct', () => {
  it('Should return all subjects', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetAllSubjectsUsecase(repo)

    const subjects = await usecase.execute()

    expect(subjects).toEqual(await repo.getAllSubjects())
  })

})
