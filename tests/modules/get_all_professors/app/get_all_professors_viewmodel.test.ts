import { it, expect, describe } from 'vitest'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'
import { GetAllProfessorsUsecase } from '../../../../src/modules/get_all_professors/app/get_all_professors_usecase'
import { GetAllProfessorsViewmodel } from '../../../../src/modules/get_all_professors/app/get_all_professors_viewmodel'

describe('Assert GetAllProfessorsViewmodel is correct', () => {
  it('Should correctly transform user data to viewmodel', async () => {

    const repo = new ScheduleRepositoryMock()
    const usecase = new GetAllProfessorsUsecase(repo)
    const professors = await usecase.execute()
    const getAllProfessorsViewmodel = new GetAllProfessorsViewmodel(professors).toJSON()

    const expectedProfessors = {
      "message": "professors with his availabilities and suitabilities returned",
      "professors": {
        "3": {
          "availabilities": [
           {
              "endTime": 560,
              "startTime": 460,
              "weekDay": "MON",
            },
           {
              "endTime": 670,
              "startTime": 570,
              "weekDay": "MON",
            },
           {
              "endTime": 560,
              "startTime": 460,
              "weekDay": "TUE",
            },
           {
              "endTime": 670,
              "startTime": 570,
              "weekDay": "TUE",
            },
           {
              "endTime": 560,
              "startTime": 460,
              "weekDay": "WED",
            },
           {
              "endTime": 670,
              "startTime": 570,
              "weekDay": "WED",
            },
           {
              "endTime": 560,
              "startTime": 460,
              "weekDay": "THU",
            },
           {
              "endTime": 670,
              "startTime": 570,
              "weekDay": "THU",
            },
           {
              "endTime": 560,
              "startTime": 460,
              "weekDay": "FRI",
            },
           {
              "endTime": 670,
              "startTime": 570,
              "weekDay": "FRI",
            },
          ],
          "email": "user3@gmail.com",
          "name": "user3",
          "suitabilities": [
           {
              "codeSubject": "EFB207",
              "subjectName": "Physics I",
            },
          ],
        },
        "4": {
          "availabilities": [
           {
              "endTime": 560,
              "startTime": 460,
              "weekDay": "MON",
            },
           {
              "endTime": 670,
              "startTime": 570,
              "weekDay": "MON",
            },
           {
              "endTime": 780,
              "startTime": 680,
              "weekDay": "MON",
            },
           {
              "endTime": 890,
              "startTime": 790,
              "weekDay": "MON",
            },
           {
              "endTime": 1000,
              "startTime": 900,
              "weekDay": "MON",
            },
           {
              "endTime": 1110,
              "startTime": 1010,
              "weekDay": "MON",
            },
           {
              "endTime": 1240,
              "startTime": 1140,
              "weekDay": "MON",
            },
           {
              "endTime": 1350,
              "startTime": 1250,
              "weekDay": "MON",
            },
          ],
          "email": "user4@gmail.com",
          "name": "user4",
          "suitabilities": [
           {
              "codeSubject": "ECM256",
              "subjectName": "Programming Languages II",
            },
           {
              "codeSubject": "ECM256",
              "subjectName": "Programming Languages II",
            },
          ],
        },
        "5": {
          "availabilities": [],
          "email": "user5@gmail.com",
          "name": "user5",
          "suitabilities": [],
        },
      },
    }
    expect(getAllProfessorsViewmodel).toEqual(expectedProfessors)
  })

})
