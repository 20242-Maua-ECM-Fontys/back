/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Environments } from '../../../shared/environments'
import { LambdaHttpRequest, LambdaHttpResponse } from '../../../shared/helpers/external_interfaces/http_lambda_requests'
import { CreateUserController } from './create_user_controller'
import { CreateUserUsecase } from './create_user_usecase'

const repo = Environments.getUserRepo()
const usecase = new CreateUserUsecase(repo)
const controller = new CreateUserController(usecase)

export async function createUserPresenter(event: Record<string, any>) {
  const httpRequest = new LambdaHttpRequest(event)
  const response = await controller.handle(httpRequest)
  const httpResponse = new LambdaHttpResponse(response?.body, response?.statusCode, response?.headers)

  return httpResponse.toJSON()
}

export async function handler(event: any, context: any) {
  const response = await createUserPresenter(event)
  return response
}