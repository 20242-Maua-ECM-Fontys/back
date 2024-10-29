import { GetSuitabilitiesByProfessorController } from './get_suitabilities_by_professor_controller'
import { GetSuitabilitiesByProfessorUsecase } from './get_suitabilities_by_professor_usecase'
import { HttpResponse } from '../../../shared/helpers/external_interfaces/http_models'
import { IRequest } from '../../../shared/helpers/external_interfaces/external_interface'
import { IScheduleRepository } from '../../../shared/domain/repositories/schedule_repository_interface'

export async function GetSuitabilitiesByProfessorPresenter(
  event: IRequest,
  repo: IScheduleRepository,
): Promise<HttpResponse> {
  const usecase = new GetSuitabilitiesByProfessorUsecase(repo)
  const controller = new GetSuitabilitiesByProfessorController(usecase)
  const response = await controller.execute(event)
  const httpResponse = new HttpResponse(response?.statusCode, response?.body)

  return httpResponse
}
