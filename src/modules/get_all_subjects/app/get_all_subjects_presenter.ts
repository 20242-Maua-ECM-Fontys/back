
import { GetAllSubjectsController } from './get_all_subjects_controller'
import { GetAllSubjectsUsecase } from './get_all_subjects_usecase'
import { HttpResponse } from '../../../shared/helpers/external_interfaces/http_models'
import { IRequest } from '../../../shared/helpers/external_interfaces/external_interface'
import { IScheduleRepository } from '../../../shared/domain/repositories/schedule_repository_interface'

export async function GetAllSubjectsPresenter(
  event: IRequest,
  repo: IScheduleRepository,
): Promise<HttpResponse> {
  const usecase = new GetAllSubjectsUsecase(repo)
  const controller = new GetAllSubjectsController(usecase)
  const response = await controller.execute(event)
  const httpResponse = new HttpResponse(response?.statusCode, response?.body)

  return httpResponse
}
