/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Environments } from '../../../shared/environments'
import { LambdaHttpRequest, LambdaHttpResponse } from '../../../shared/helpers/external_interfaces/http_lambda_requests'
import { UpdateUserController } from './update_user_controller'
import { UpdateUserUsecase } from './update_user_usecase'

const repo = Environments.getUserRepo()
const usecase = new UpdateUserUsecase(repo)
const controller = new UpdateUserController(usecase)

export async function updateUserPresenter(event: Record<string, any>) {
  const httpRequest = new LambdaHttpRequest(event)
  const response = await controller.handle(httpRequest)
  const httpResponse = new LambdaHttpResponse(response?.body, response?.statusCode, response?.headers)

  return httpResponse.toJSON()
}

export async function handler(event: any, context: any) {
  const response = await updateUserPresenter(event)
  return response
}
