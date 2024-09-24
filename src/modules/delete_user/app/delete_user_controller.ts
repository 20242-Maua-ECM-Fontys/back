/* eslint-disable @typescript-eslint/no-explicit-any */
import { MissingParameters, WrongTypeParameters } from '../../../shared/helpers/errors/controller_errors'
import { EntityError } from '../../../shared/helpers/errors/domain_errors'
import { NoItemsFound } from '../../../shared/helpers/errors/usecase_errors'
import { IRequest } from '../../../shared/helpers/external_interfaces/external_interface'
import { BadRequest, InternalServerError, NotFound, OK } from '../../../shared/helpers/external_interfaces/http_codes'
import { DeleteUserUsecase } from './delete_user_usecase'
import { DeleteUserViewmodel } from './delete_user_viewmodel'

export class DeleteUserController {
  constructor(private usecase: DeleteUserUsecase) {}

  async handle(request: IRequest) {
    try {
      if (request.data.id === undefined) {
        throw new MissingParameters('id')
      }
      if (typeof request.data.id !== 'string') {
        throw new WrongTypeParameters('id', 'string', typeof request.data.id)
      }

      const user = await this.usecase.execute(Number(request.data.id))

      const viewmodel = new DeleteUserViewmodel(user)

      return new OK(viewmodel.toJSON())
    } catch (error: any) {
      if (error instanceof NoItemsFound) {
        return new NotFound(error.message)
      }
      if (error instanceof EntityError) {
        return new BadRequest(error.message)
      }
      if (error instanceof MissingParameters) {
        return new BadRequest(error.message)
      }
      if (error instanceof WrongTypeParameters) {
        return new BadRequest(error.message)
      }
      if (error instanceof Error) {
        return new InternalServerError(error.message)
      }
    }
  }
}