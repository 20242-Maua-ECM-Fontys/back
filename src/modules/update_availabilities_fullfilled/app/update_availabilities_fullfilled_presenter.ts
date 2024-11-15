import { UpdateAvailabilitiesController } from './update_availabilities_fullfilled_controller'
import { UpdateAvailabilitiesUsecase } from './update_availabilities_fullfilled_usecase'
import { HttpResponse } from '../../../shared/helpers/external_interfaces/http_models'
import { IRequest } from '../../../shared/helpers/external_interfaces/external_interface'
import { IScheduleRepository } from '../../../shared/domain/repositories/schedule_repository_interface'

export async function UpdateAvailabilitiesPresenter(
  event: IRequest,
  repo: IScheduleRepository,
): Promise<HttpResponse> {
  const usecase = new UpdateAvailabilitiesUsecase(repo)
  const controller = new UpdateAvailabilitiesController(usecase)
  const response = await controller.execute(event)
  const httpResponse = new HttpResponse(response?.statusCode, response?.body)

  return httpResponse
}
