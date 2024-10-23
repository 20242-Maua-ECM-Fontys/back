import {
  HttpRequest,
  HttpResponse,
} from '../../../shared/helpers/external_interfaces/http_models.js'
import { LoginUserController } from './login_user_controller'
import { LoginUserUsecase } from './login_user_usecase'
import { IScheduleRepository } from '../../../shared/domain/repositories/schedule_repository_interface.js'
import { IRequest } from '../../../shared/helpers/external_interfaces/external_interface.js'


export async function loginUserPresenter(
  httpRequest: IRequest, repo: IScheduleRepository
): Promise<HttpResponse> {
  const usecase = new LoginUserUsecase(repo)
  const controller = new LoginUserController(usecase)
  const response = await controller.handle(httpRequest)
  return new HttpResponse(
    response?.statusCode,
    response?.body,
    response?.headers,
  )
}
