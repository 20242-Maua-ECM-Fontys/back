import { GetPossibilitiesByScheduleController } from './get_possibilities_by_schedule_controller'
import { GetPossibilitiesByScheduleUsecase } from './get_possibilities_by_schedule_usecase'
import { HttpResponse } from '../../../shared/helpers/external_interfaces/http_models'
import { IRequest } from '../../../shared/helpers/external_interfaces/external_interface'
import { IScheduleRepository } from '../../../shared/domain/repositories/schedule_repository_interface'

export async function GetPossibilitiesBySchedulePresenter(
  event: IRequest,
  repo: IScheduleRepository,
): Promise<HttpResponse> {
  const usecase = new GetPossibilitiesByScheduleUsecase(repo)
  const controller = new GetPossibilitiesByScheduleController(usecase)
  const response = await controller.execute(event)
  const httpResponse = new HttpResponse(response?.statusCode, response?.body)

  return httpResponse
}
