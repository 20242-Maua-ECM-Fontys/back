import { GetSuitabilitiesByProfessorUsecase } from '../../../../src/modules/get_suitabilities_by_professor/app/get_suitabilities_by_professor_usecase'
import { EntityError } from '../../../../src/shared/helpers/errors/domain_errors'
import { describe, it, expect } from 'vitest'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'

describe('GetSuitabilitiesByProfessorUsecase tests', () => {
  it('Should return a list of suitabilities', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetSuitabilitiesByProfessorUsecase(repo)
    const response = await usecase.execute(4)
    expect(response.length).toEqual(2)
  })
  it('Should throw an error if userId is invalid', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetSuitabilitiesByProfessorUsecase(repo)
    await expect(usecase.execute(-1)).rejects.toThrow(EntityError)
  })

  it('Should return an empty suitabilities list', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetSuitabilitiesByProfessorUsecase(repo)
    const response = await usecase.execute(5)

    expect(response.length).toEqual(0)
  })
  it('Should return error if user is not a professor', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetSuitabilitiesByProfessorUsecase(repo)
    await expect(usecase.execute(1)).rejects.toThrow(
      'Invalid role. Expected PROFESSOR or COORDINATOR but received STAFF',
    )
  })
 
  it('Should throw an error if user does not exist', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetSuitabilitiesByProfessorUsecase(repo)
    const id = repo.getUsersLength() + 1
    await expect(usecase.execute(id)).rejects.toThrow(
      'No items found for userId',
    )
  })
})
