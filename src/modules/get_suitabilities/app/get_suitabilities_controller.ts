import {
  MissingParameters,
  WrongTypeParameters,
} from '../../../shared/helpers/errors/controller_errors'
import { IRequest } from '../../../shared/helpers/external_interfaces/external_interface'
import { GetSuitabilitiesUsecase } from './get_suitabilities_usecase'
import {
  BadRequest,
  OK,
  InternalServerError,
  NotFound,
} from '../../../shared/helpers/external_interfaces/http_codes'
import { NoItemsFound } from '../../../shared/helpers/errors/repo_error'
import { EntityError } from '../../../shared/helpers/errors/domain_errors'
import { GetSuitabilitiesViewmodel } from './get_suitabilities_viewmodel'

export class GetSuitabilitiesController {
  constructor(private usecase: GetSuitabilitiesUsecase) {}

  async execute(request: IRequest) {
    try {
      // check userId
      if (request.data.userId === undefined) {
        throw new MissingParameters('userId')
      }
      if (typeof request.data.userId !== 'number') {
        throw new WrongTypeParameters('userId', 'number', request.data.userId)
      }
      const userId = request.data.userId

      const suitabilities = await this.usecase.execute(userId)

      const viewmodel = new GetSuitabilitiesViewmodel(suitabilities)

      return new OK(viewmodel)
    } catch (error: unknown) {
      if (error instanceof MissingParameters) {
        return new BadRequest(error.message)
      }
      if (error instanceof WrongTypeParameters) {
        return new BadRequest(error.message)
      }
      if (error instanceof NoItemsFound) {
        return new NotFound(error.message)
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
