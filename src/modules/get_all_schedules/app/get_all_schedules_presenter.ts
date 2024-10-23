
import { GetAllSchedulesController } from './get_all_schedules_controller'
import { GetAllSchedulesUsecase } from './get_all_schedules_usecase'
import { HttpResponse } from '../../../shared/helpers/external_interfaces/http_models'
import { IRequest } from '../../../shared/helpers/external_interfaces/external_interface'
import { IScheduleRepository } from '../../../shared/domain/repositories/schedule_repository_interface'

export async function GetAllSchedulesPresenter(
  event: IRequest,
  repo: IScheduleRepository,
): Promise<HttpResponse> {
  const usecase = new GetAllSchedulesUsecase(repo)
  const controller = new GetAllSchedulesController(usecase)
  const response = await controller.execute(event)
  const httpResponse = new HttpResponse(response?.statusCode, response?.body)

  return httpResponse
}
