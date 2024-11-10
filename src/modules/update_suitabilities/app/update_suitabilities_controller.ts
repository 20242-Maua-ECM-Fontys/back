import {
  MissingParameters,
  WrongTypeParameters,
} from '../../../shared/helpers/errors/controller_errors'
import { IRequest } from '../../../shared/helpers/external_interfaces/external_interface'
import {
  BadRequest,
  OK,
  InternalServerError,
  NotFound,
  Forbidden,
} from '../../../shared/helpers/external_interfaces/http_codes'
import { NoItemsFound as NoItemsFoundRepo } from '../../../shared/helpers/errors/repo_error'
import { EntityError } from '../../../shared/helpers/errors/domain_errors'
import { InvalidRole } from '../../../shared/helpers/errors/usecase_errors'
import { UpdateSuitabilitiesUsecase } from './update_suitabilities_usecase'
import { UpdateSuitabilitiesViewmodel } from './update_suitabilities_viewmodel'

export class UpdateSuitabilitiesController {
  constructor(private usecase: UpdateSuitabilitiesUsecase) {
    this.usecase = usecase
  }

  async execute(request: IRequest) {
    try {
      // check userId
      if (request.data.userId === undefined) {
        throw new MissingParameters('userId')
      }
      if (typeof request.data.userId !== 'number') {
        throw new WrongTypeParameters(
          'userId',
          'number',
          typeof request.data.userId,
        )
      }
      const userId = request.data.userId

      if (request.data.subjectCodes === undefined) {
        throw new MissingParameters('subjectCodes')
      }

      if (!Array.isArray(request.data.subjectCodes)) {
        throw new WrongTypeParameters(
          'subjectCodes',
          'array',
          typeof request.data.subjectCodes,
        )
      }

      for (const subjectCode of request.data.subjectCodes) {
        if (typeof subjectCode !== 'string') {
          throw new WrongTypeParameters(
            'subjectCode',
            'string',
            typeof subjectCode,
          )
        }
      }

      const subjectCodes = request.data.subjectCodes

      await this.usecase.execute(userId, subjectCodes)

      const viewmodel = new UpdateSuitabilitiesViewmodel().toJSON()

      return new OK(viewmodel)
    } catch (error: unknown) {
      if (error instanceof MissingParameters) {
        return new BadRequest(error.message)
      }
      if (error instanceof WrongTypeParameters) {
        return new BadRequest(error.message)
      }
      if (error instanceof NoItemsFoundRepo) {
        return new NotFound(error.message)
      }
      if (error instanceof EntityError) {
        return new BadRequest(error.message)
      }
      if (error instanceof InvalidRole) {
        return new Forbidden(error.message)
      }
      if (error instanceof Error) {
        return new InternalServerError(error.message)
      }
    }
  }
}
