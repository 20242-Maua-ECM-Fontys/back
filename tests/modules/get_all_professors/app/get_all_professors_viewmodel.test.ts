import { it, expect, describe } from 'vitest'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'
import { GetAllProfessorsUsecase } from '../../../../src/modules/get_all_professors/app/get_all_professors_usecase'
import { GetAllProfessorsViewmodel } from '../../../../src/modules/get_all_professors/app/get_all_professors_viewmodel'

describe('Assert GetAllProfessorsViewmodel is correct', () => {
  it('Should correctly transform user data to viewmodel', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetAllProfessorsUsecase(repo)
    const professors = await usecase.execute()
    const getAllProfessorsViewmodel = new GetAllProfessorsViewmodel(
      professors,
    ).toJSON()

    const expectedProfessors = {
      message: "professors with his availabilities and suitabilities returned",
      professors: {
        "2": {
          name: "Pedro Henrique de Sousa Matumoto",
          email: "pedromatumoto@gmail.com",
          availabilities: [
          ],
          suitabilities: [
          ],
        },
        "3": {
          name: "user3",
          email: "user3@gmail.com",
          availabilities: [
            {
              startTime: 460,
              endTime: 560,
              weekDay: "MON",
            },
            {
              startTime: 570,
              endTime: 670,
              weekDay: "MON",
            },
            {
              startTime: 460,
              endTime: 560,
              weekDay: "TUE",
            },
            {
              startTime: 570,
              endTime: 670,
              weekDay: "TUE",
            },
            {
              startTime: 460,
              endTime: 560,
              weekDay: "WED",
            },
            {
              startTime: 570,
              endTime: 670,
              weekDay: "WED",
            },
            {
              startTime: 460,
              endTime: 560,
              weekDay: "THU",
            },
            {
              startTime: 570,
              endTime: 670,
              weekDay: "THU",
            },
            {
              startTime: 460,
              endTime: 560,
              weekDay: "FRI",
            },
            {
              startTime: 570,
              endTime: 670,
              weekDay: "FRI",
            },
          ],
          suitabilities: [
            {
              codeSubject: "EFB207",
              subjectName: "Physics I",
            },
            {
              codeSubject: "ECM256",
              subjectName: "Programming Languages II",
            },
          ],
        },
        "4": {
          name: "user4",
          email: "user4@gmail.com",
          availabilities: [
            {
              startTime: 460,
              endTime: 560,
              weekDay: "MON",
            },
            {
              startTime: 570,
              endTime: 670,
              weekDay: "MON",
            },
            {
              startTime: 680,
              endTime: 780,
              weekDay: "MON",
            },
            {
              startTime: 790,
              endTime: 890,
              weekDay: "MON",
            },
            {
              startTime: 900,
              endTime: 1000,
              weekDay: "MON",
            },
            {
              startTime: 1010,
              endTime: 1110,
              weekDay: "MON",
            },
            {
              startTime: 1140,
              endTime: 1240,
              weekDay: "MON",
            },
            {
              startTime: 1250,
              endTime: 1350,
              weekDay: "MON",
            },
          ],
          suitabilities: [
            {
              codeSubject: "ECM256",
              subjectName: "Programming Languages II",
            },
          ],
        },
        "5": {
          name: "user5",
          email: "user5@gmail.com",
          availabilities: [
          ],
          suitabilities: [
          ],
        },
        "6": {
          name: "Keith Thompson",
          email: "udibon@tisim.sy",
          availabilities: [
          ],
          suitabilities: [
          ],
        },
        "7": {
          name: "Austin Green",
          email: "viraw@mon.cm",
          availabilities: [
            {
              startTime: 460,
              endTime: 560,
              weekDay: "MON",
            },
            {
              startTime: 570,
              endTime: 670,
              weekDay: "MON",
            },
          ],
          suitabilities: [
            {
              codeSubject: "ECM256",
              subjectName: "Programming Languages II",
            },
            {
              codeSubject: "EFB207",
              subjectName: "Physics I",
            },
          ],
        },
      },
    }
    expect(getAllProfessorsViewmodel).toEqual(expectedProfessors)
  })
})
