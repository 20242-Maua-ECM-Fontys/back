import { it, expect, describe } from 'vitest'
import { GetAllSchedulesViewModel } from '../../../../src/modules/get_all_schedules/app/get_all_schedules_viewmodel'
import { GetAllSchedulesUsecase } from '../../../../src/modules/get_all_schedules/app/get_all_schedules_usecase'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'

describe('Assert GetAllSchedulesViewModel is correct', () => {
  it('Should correctly transform schedule data to viewmodel', async () => {

    const repo = new ScheduleRepositoryMock()
    const usecase = new GetAllSchedulesUsecase(repo)
    
    const schedules = await usecase.execute()
    const getAllSchedulesViewModel = new GetAllSchedulesViewModel(schedules).toJSON()

    expect(getAllSchedulesViewModel).toEqual({
      "message": "schedules returned",
      "courses": {
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
      },
    })
  })

  it('Should correctly transform schedule data to viewmodel if list is empty', async () => {
  
    const getAllSchedulesViewModel = new GetAllSchedulesViewModel([]).toJSON()

    expect(getAllSchedulesViewModel).toEqual({
      "message": "schedules returned",
      "courses": {},
    })
  })
})
