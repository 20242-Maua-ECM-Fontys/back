/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { MissingParameters, WrongTypeParameters } from '../../../shared/helpers/errors/controller_errors'
import { EntityError } from '../../../shared/helpers/errors/domain_errors'
import { NoItemsFound } from '../../../shared/helpers/errors/usecase_errors'
import { IRequest } from '../../../shared/helpers/external_interfaces/external_interface'
import { BadRequest, InternalServerError, NotFound, OK } from '../../../shared/helpers/external_interfaces/http_codes'
import { GetAllUsersUsecase } from './get_all_users_usecase'
import { GetAllUsersViewmodel } from './get_all_users_viewmodel'

export class GetAllUsersController {
  constructor(private usecase: GetAllUsersUsecase) {}

  async handle(request: IRequest) {
    try {
      const users = await this.usecase.execute()

      const viewmodel = new GetAllUsersViewmodel(users)

      return new OK(viewmodel.toJSON())
    } catch (error: any) {
      if (error instanceof NoItemsFound) {
        return new NotFound(error.message)
      }
      if (error instanceof MissingParameters) {
        return new BadRequest(error.message)
      }
      if (error instanceof WrongTypeParameters) {
        return new BadRequest(error.message)
      }
      if (error instanceof EntityError) {
        return new BadRequest(error.message)
      }
      if (error instanceof Error) {
        return new InternalServerError(error.message)
      }
    }
  }
}