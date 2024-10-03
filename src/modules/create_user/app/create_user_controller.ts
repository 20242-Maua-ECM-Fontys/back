/* eslint-disable @typescript-eslint/no-explicit-any */
import { MissingParameters, WrongTypeParameters } from '../../../shared/helpers/errors/controller_errors'
import { EntityError } from '../../../shared/helpers/errors/domain_errors'
import { NoItemsFound } from '../../../shared/helpers/errors/usecase_errors'
import { IRequest } from '../../../shared/helpers/external_interfaces/external_interface'
import { BadRequest, Created, InternalServerError, NotFound } from '../../../shared/helpers/external_interfaces/http_codes'
import { CreateUserUsecase } from './create_user_usecase'
import { CreateUserViewmodel } from './create_user_viewmodel'
import { ROLE } from '../../../shared/domain/enums/role_enum'

export class CreateUserController {
  constructor(private usecase: CreateUserUsecase) {}

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
      if (request.data.RA === undefined) {
        throw new MissingParameters('RA')
      }
      if (request.data.password === undefined) {
        throw new MissingParameters('password')
      }
      if (request.data.role === undefined) {
        throw new MissingParameters('role')
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
      if (typeof request.data.password !== 'string') {
        throw new WrongTypeParameters('password', 'string', typeof request.data.name)
      }
      if (typeof request.data.RA !== 'string') {
        throw new WrongTypeParameters('RA', 'string', typeof request.data.email)
      }
      
      const user = await this.usecase.execute(Number(request.data.id), request.data.name, request.data.email,request.data.RA,request.data.password,request.data.role as ROLE)

      const viewmodel = new CreateUserViewmodel(user)

      const response = new Created(viewmodel.toJSON())

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