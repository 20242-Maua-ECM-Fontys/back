/* eslint-disable @typescript-eslint/no-explicit-any */
import { MissingParameters, WrongTypeParameters } from '../../../shared/helpers/errors/controller_errors'
import { EntityError } from '../../../shared/helpers/errors/domain_errors'
import { NoItemsFound } from '../../../shared/helpers/errors/usecase_errors'
import { IRequest } from '../../../shared/helpers/external_interfaces/external_interface'
import { BadRequest, InternalServerError, NotFound, OK } from '../../../shared/helpers/external_interfaces/http_codes'
import { UpdateUserUsecase } from './update_user_usecase'
import { UpdateUserViewmodel } from './update_user_viewmodel'

export class UpdateUserController {
  constructor(private usecase: UpdateUserUsecase) {}

  async handle(request: IRequest) {
    try {
      if (request.data.id === undefined) {
        throw new MissingParameters('id')
      }
      if (request.data.name === undefined) {
        throw new MissingParameters('name')
      }
      if (request.data.email === undefined) {
        throw new MissingParameters('email')
      }
      if (typeof request.data.id !== 'string') {
        throw new WrongTypeParameters('id', 'string', typeof request.data.id)
      }
      if (typeof request.data.name !== 'string') {
        throw new WrongTypeParameters('name', 'string', typeof request.data.name)
      }
      if (typeof request.data.email !== 'string') {
        throw new WrongTypeParameters('email', 'string', typeof request.data.email)
      }

      const user = await this.usecase.execute(Number(request.data.id), request.data.name, request.data.email)

      const viewmodel = new UpdateUserViewmodel(user)

      const response = new OK(viewmodel.toJSON())

      return response
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