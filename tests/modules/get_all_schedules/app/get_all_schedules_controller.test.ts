import { describe, it, expect } from 'vitest'
import { GetAllSchedulesController } from '../../../../src/modules/get_all_schedules/app/get_all_schedules_controller'
import { GetAllSchedulesUsecase } from '../../../../src/modules/get_all_schedules/app/get_all_schedules_usecase'
import { HttpRequest } from '../../../../src/shared/helpers/external_interfaces/http_models'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'

describe('Assert GetAllSchedulesController is correct', () => {
  it('Should activate usecase correctly and return schedules', async () => {

    const repo = new ScheduleRepositoryMock()
    const usecase = new GetAllSchedulesUsecase(repo)
    const controller = new GetAllSchedulesController(usecase)
    const httpRequest = new HttpRequest(undefined, undefined, {}, undefined)

    const response = await controller.execute(httpRequest)


    expect(response?.statusCode).toEqual(200)
    expect(response?.body.message).toEqual('schedules returned')
    expect(response?.body.courses).toEqual({
      "Compute Engineering": [
        {
          "scheduleId": "2S-4CM-D5@2024(SCS)",
          "courseGrade": 4,
          "schedulePeriod": "ANNUAL",
        },
        {
          "scheduleId": "2S-2CM-D5@2024(SCS)",
          "courseGrade": 2,
          "schedulePeriod": "ANNUAL",
        },
        {
          "scheduleId": "2S-3CM-D5@2024(SCS)",
          "courseGrade": 3,
          "schedulePeriod": "ANNUAL",
        },
      ],
      "Cience Coputing": [
        {
          "scheduleId": "1S-2CIC-D4@2024(SCS)",
          "courseGrade": 2,
          "schedulePeriod": "1SEM",
        },
      ],
    })
  })


})
