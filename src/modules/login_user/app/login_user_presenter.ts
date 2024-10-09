import { Environments } from '../../../shared/environments'
import { LambdaHttpRequest, LambdaHttpResponse } from '../../../shared/helpers/external_interfaces/http_lambda_requests'
import { LoginUserController } from './login_user_controller'
import { LoginUserUsecase } from './login_user_usecase'

const repo = Environments.getUserRepo()
const usecase = new LoginUserUsecase(repo)
const controller = new LoginUserController(usecase)

export async function loginUserPresenter(event: Record<string, any>) {

    const httpRequest = new LambdaHttpRequest(event)
    const response = await controller.handle(httpRequest)
    const httpResponse = new LambdaHttpResponse(response?.body, response?.statusCode, response?.headers)

    return httpResponse.toJSON()
}

export async function handler(event: any, context: any) {
  const response = await loginUserPresenter(event)
  return response
}
