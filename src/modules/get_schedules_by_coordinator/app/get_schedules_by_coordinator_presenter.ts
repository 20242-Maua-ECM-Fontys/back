import { GetSchedulesByCoordinatorController } from './get_schedules_by_coordinator_controller'
import { GetSchedulesByCoordinatorUsecase } from './get_schedules_by_coordinator_usecase'
import { HttpResponse } from '../../../shared/helpers/external_interfaces/http_models'
import { IRequest } from '../../../shared/helpers/external_interfaces/external_interface'
import { IScheduleRepository } from '../../../shared/domain/repositories/schedule_repository_interface'

export async function GetSchedulesByCoordinatorPresenter(
  event: IRequest,
  repo: IScheduleRepository,
): Promise<HttpResponse> {
  const usecase = new GetSchedulesByCoordinatorUsecase(repo)
  const controller = new GetSchedulesByCoordinatorController(usecase)
  const response = await controller.execute(event)
  const httpResponse = new HttpResponse(response?.statusCode, response?.body)

  return httpResponse
}
