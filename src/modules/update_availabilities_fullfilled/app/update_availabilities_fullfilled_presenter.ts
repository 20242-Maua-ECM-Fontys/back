import { UpdateAvailabilitiesFullfilledController } from './update_availabilities_fullfilled_controller'
import { UpdateAvailabilitiesFullfilledUsecase } from './update_availabilities_fullfilled_usecase'
import { HttpResponse } from '../../../shared/helpers/external_interfaces/http_models'
import { IRequest } from '../../../shared/helpers/external_interfaces/external_interface'
import { IScheduleRepository } from '../../../shared/domain/repositories/schedule_repository_interface'

export async function UpdateAvailabilitiesFullfilledPresenter(
  event: IRequest,
  repo: IScheduleRepository,
): Promise<HttpResponse> {
  const usecase = new UpdateAvailabilitiesFullfilledUsecase(repo)
  const controller = new UpdateAvailabilitiesFullfilledController(usecase)
  const response = await controller.execute(event)
  const httpResponse = new HttpResponse(response?.statusCode, response?.body)

  return httpResponse
}
