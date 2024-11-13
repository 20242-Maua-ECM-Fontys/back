import { GetProfessorsByClassViewmodel } from '../../../../src/modules/get_professors_by_class/app/get_professors_by_class_viewmodel'
import { User } from '../../../../src/shared/domain/entities/user'
import { it, expect, describe } from 'vitest'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'
import { GetProfessorsByClassUsecase } from '../../../../src/modules/get_professors_by_class/app/get_professors_by_class_usecase'

describe('GetProfessorsByClassViewmodel', () => {
  it('should correctly transform professors data to JSON format', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetProfessorsByClassUsecase(repo)

    const professors = await usecase.execute(
      '0a8c5357-1f07-5b24-9845-9318c47ab923',
    )
    const viewModel = new GetProfessorsByClassViewmodel(professors)
    const result = viewModel.toJSON()

    expect(result).toEqual({
      message: 'professors by class returned',
      data: {
        '4': {
          RA: '44.00000-4',
          email: 'user4@gmail.com',
          name: 'user4',
        },
        '7': {
          RA: '66.00000-6',
          email: 'viraw@mon.cm',
          name: 'Austin Green',
        },
      },
    })
  })

  it('should return an empty data object if no professors are provided', () => {
    const professors: User[] = []

    const viewModel = new GetProfessorsByClassViewmodel(professors)
    const result = viewModel.toJSON()

    expect(result).toEqual({
      message: 'professors by class returned',
      data: {},
    })
  })
})
