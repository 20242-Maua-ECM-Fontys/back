import { describe, it, expect } from 'vitest'
import { HttpRequest } from '../../../../src/shared/helpers/external_interfaces/http_models'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'
import { GetAllProfessorsUsecase } from '../../../../src/modules/get_all_professors/app/get_all_professors_usecase'
import { GetAllProfessorsController } from '../../../../src/modules/get_all_professors/app/get_all_professors_controller'

describe('Assert GetAllProfessorsController is correct at all', () => {
  it('Should activate usecase correctly', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetAllProfessorsUsecase(
      repo
    )

    const controller = new GetAllProfessorsController(usecase)
    const httpRequest = new HttpRequest(
      undefined,
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(200)
    expect(response?.body.message).toEqual('professors with his availabilities and suitabilities returned')
  })
})
