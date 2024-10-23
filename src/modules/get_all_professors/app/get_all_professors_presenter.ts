import { GetAllProfessorsController } from './get_all_professors_controller'
import { GetAllProfessorsUsecase } from './get_all_professors_usecase'
import { HttpResponse } from '../../../shared/helpers/external_interfaces/http_models'
import { IRequest } from '../../../shared/helpers/external_interfaces/external_interface'
import { IScheduleRepository } from '../../../shared/domain/repositories/schedule_repository_interface'

export async function GetAllProfessorsPresenter(
  event: IRequest,
  repo: IScheduleRepository,
): Promise<HttpResponse> {
  const usecase = new GetAllProfessorsUsecase(repo)
  const controller = new GetAllProfessorsController(usecase)
  const response = await controller.execute(event)
  const httpResponse = new HttpResponse(response?.statusCode, response?.body)

  return httpResponse
}
