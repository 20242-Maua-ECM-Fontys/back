
import { MissingParameters, WrongTypeParameters } from '../../../shared/helpers/errors/controller_errors'
import { EntityError } from '../../../shared/helpers/errors/domain_errors'
import { IRequest } from '../../../shared/helpers/external_interfaces/external_interface'
import { BadRequest, InternalServerError, OK, NotFound } from '../../../shared/helpers/external_interfaces/http_codes'
import { LoginUserUsecase } from './login_user_usecase'
import { LoginUserViewmodel } from './login_user_viewmodel'
import { NoItemsFound } from '../../../shared/helpers/errors/usecase_errors'

export class LoginUserController {
  constructor(private usecase: LoginUserUsecase) {}

  async handle(request: IRequest) {
    try {
      const { email, password } = request.data as { email: string, password: string }
      if (!email && !password) {
        throw new MissingParameters('email and password')
      }
      if (!email) {
        throw new MissingParameters('email')
      }
      if (!password) {
        throw new MissingParameters('password')
      }

      const user = await this.usecase.execute(email, password)

      const viewmodel = new LoginUserViewmodel(user)

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
}}
