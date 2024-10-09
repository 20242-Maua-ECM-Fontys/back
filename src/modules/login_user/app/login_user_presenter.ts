import { HttpRequest, HttpResponse } from '../../../shared/helpers/external_interfaces/http_models.js'
import { LoginUserController } from './login_user_controller'
import { LoginUserUsecase } from './login_user_usecase'
import { Environments } from '../../../shared/environments'

const repo = Environments.getUserRepo()
const usecase = new LoginUserUsecase(repo)
const controller = new LoginUserController(usecase)

export async function loginUserPresenter(httpRequest: HttpRequest): Promise<HttpResponse> {
    const response = await controller.handle(httpRequest)
    return new HttpResponse(response?.statusCode, response?.body, response?.headers)
}