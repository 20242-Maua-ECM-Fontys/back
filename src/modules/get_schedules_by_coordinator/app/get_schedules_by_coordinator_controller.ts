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
} from '../../../shared/helpers/external_interfaces/http_codes'
import { NoItemsFound } from '../../../shared/helpers/errors/repo_error'
import { EntityError } from '../../../shared/helpers/errors/domain_errors'
import { InvalidRole } from '../../../shared/helpers/errors/usecase_errors'
import { GetSchedulesByCoordinatorUsecase } from './get_schedules_by_coordinator_usecase'
import { GetSchedulesByCoordinatorViewmodel } from './get_schedules_by_coordinator_viewmodel'

export class GetSchedulesByCoordinatorController {
  constructor(private usecase: GetSchedulesByCoordinatorUsecase) {}

  async execute(request: IRequest) {
    try {
      if (request.data.userId === undefined) {
        throw new MissingParameters('userId')
      }
      if (typeof request.data.userId !== 'string') {
        throw new WrongTypeParameters('userId', 'string', request.data.userId)
      }
      // check if string is numeric
      if (isNaN(Number(request.data.userId))) {
        throw new WrongTypeParameters('userId', 'numeric string', request.data.userId)
      }

      const userId = Number(request.data.userId)

      const schedules = await this.usecase.execute(userId)

      const viewmodel = new GetSchedulesByCoordinatorViewmodel(schedules)

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
      if (error instanceof InvalidRole) {
        return new BadRequest(error.message)
      }
      if (error instanceof Error) {
        return new InternalServerError(error.message)
      }
    }
  }
}
