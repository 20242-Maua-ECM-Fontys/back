import { describe, it, expect } from 'vitest'
import { GetAllSubjectsController } from '../../../../src/modules/get_all_subjects/app/get_all_subjects_controller'
import { GetAllSubjectsUsecase } from '../../../../src/modules/get_all_subjects/app/get_all_subjects_usecase'
import { HttpRequest } from '../../../../src/shared/helpers/external_interfaces/http_models'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'

describe('Assert Upload CSV controller is correct at all', () => {
  it('Should activate usecase correctly', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetAllSubjectsUsecase(
      repo
    )
    const controller = new GetAllSubjectsController(usecase)
    const httpRequest = new HttpRequest(
      undefined,
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(200)
    expect(response?.body.message).toEqual('subjects returned')
  })
})
