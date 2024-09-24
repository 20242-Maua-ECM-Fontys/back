/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Environments } from '../../../shared/environments'
import { LambdaHttpRequest, LambdaHttpResponse } from '../../../shared/helpers/external_interfaces/http_lambda_requests'
import { GetAllUsersController } from './get_all_users_controller'
import { GetAllUsersUsecase } from './get_all_users_usecase'

const repo = Environments.getUserRepo()
const usecase = new GetAllUsersUsecase(repo)
const controller = new GetAllUsersController(usecase)

export async function getAllUsersPresenter(event: Record<string, any>) {
  const httpRequest = new LambdaHttpRequest(event)
  const response = await controller.handle(httpRequest)
  const httpResponse = new LambdaHttpResponse(response?.body, response?.statusCode, response?.headers)

  return httpResponse.toJSON()
}

export async function handler(event: any, context: any) {
  const response = await getAllUsersPresenter(event)
  return response
}