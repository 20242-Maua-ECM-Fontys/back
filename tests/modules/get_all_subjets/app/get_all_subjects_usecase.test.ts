import { it, expect, describe } from 'vitest'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'
import { GetAllSubjectsUsecase } from '../../../../src/modules/get_all_subjects/app/get_all_subjects_usecase'
import { NoItemsFound } from '../../../../src/shared/helpers/errors/usecase_errors'

describe('Assert Get All Subjects usecase is correct', () => {
  it('Should return all subjects', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetAllSubjectsUsecase(repo)

    const subjects = await usecase.execute()

    expect(subjects).toEqual(await repo.getAllSubjects())
  })

})
