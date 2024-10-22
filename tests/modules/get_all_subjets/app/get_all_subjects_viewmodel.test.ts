
import { it, expect, describe } from 'vitest'
import { GetAllSubjectsViewmodel } from '../../../../src/modules/get_all_subjects/app/get_all_subjects_viewmodel'
import { GetAllSubjectsUsecase } from '../../../../src/modules/get_all_subjects/app/get_all_subjects_usecase'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'

describe('Assert GetAllSubjectsViewmodel is correct', () => {
  it('Should correctly transform user data to viewmodel', async () => {

    const repo = new ScheduleRepositoryMock()
    const usecase = new GetAllSubjectsUsecase(repo)
    const subjects = await usecase.execute()
    const getAllSubjectsViewmodel = new GetAllSubjectsViewmodel(subjects).toJSON()

    expect(getAllSubjectsViewmodel).toEqual({
      "message": "subjects returned",
      "subjects":  [
        {
          "codeSubject": "ECM256",
          "period": "MORNING",
          "subjectName": "Programming Languages II",
        },
        {
          "codeSubject": "EFB207",
          "period": "AFTERNOON",
          "subjectName": "Physics I",
        },
      ],
    })
  })
  it('Should correctly transform user data to viewmodel if list is empty', async () => {

      const getAllSubjectsViewmodel = new GetAllSubjectsViewmodel([]).toJSON()
  
      expect(getAllSubjectsViewmodel).toEqual({
        "message": "subjects returned",
        "subjects":  [
        ],
      })
  })
})

  
