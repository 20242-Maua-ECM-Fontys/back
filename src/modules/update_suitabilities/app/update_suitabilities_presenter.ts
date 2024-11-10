import { UpdateSuitabilitiesController } from './update_suitabilities_controller'
import { UpdateSuitabilitiesUsecase } from './update_suitabilities_usecase'
import { HttpResponse } from '../../../shared/helpers/external_interfaces/http_models'
import { IRequest } from '../../../shared/helpers/external_interfaces/external_interface'
import { IScheduleRepository } from '../../../shared/domain/repositories/schedule_repository_interface'

export async function UpdateSuitabilitiesPresenter(
  event: IRequest,
  repo: IScheduleRepository,
): Promise<HttpResponse> {
  const usecase = new UpdateSuitabilitiesUsecase(repo)
  const controller = new UpdateSuitabilitiesController(usecase)
  const response = await controller.execute(event)
  const httpResponse = new HttpResponse(response?.statusCode, response?.body)

  return httpResponse
}
