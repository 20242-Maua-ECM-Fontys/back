/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Environments } from '../../../shared/environments'
import { LambdaHttpRequest, LambdaHttpResponse } from '../../../shared/helpers/external_interfaces/http_lambda_requests'
import { DeleteUserController } from './delete_user_controller'
import { DeleteUserUsecase } from './delete_user_usecase'

const repo = Environments.getUserRepo()
const usecase = new DeleteUserUsecase(repo)
const controller = new DeleteUserController(usecase)

export async function deleteUserPresenter(event: Record<string, any>) {
  const httpRequest = new LambdaHttpRequest(event)
  const response = await controller.handle(httpRequest)
  const httpResponse = new LambdaHttpResponse(response?.body, response?.statusCode, response?.headers)

  return httpResponse.toJSON()
}

export async function handler(event: any, context: any) {
  const response = await deleteUserPresenter(event)
  return response
}