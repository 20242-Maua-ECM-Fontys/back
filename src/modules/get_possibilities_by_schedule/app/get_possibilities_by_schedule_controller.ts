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
import { GetPossibilitiesByScheduleUsecase } from './get_possibilities_by_schedule_usecase'
import { GetPossibilitiesByScheduleViewmodel } from './get_possibilities_by_schedule_viewmodel'

export class GetPossibilitiesByScheduleController {
  constructor(private usecase: GetPossibilitiesByScheduleUsecase) {
    this.usecase = usecase
  }

  async execute(request: IRequest) {
    try {
      if (request.data.scheduleId === undefined) {
        throw new MissingParameters('scheduleId')
      }
      if (typeof request.data.scheduleId !== 'string') {
        throw new WrongTypeParameters(
          'scheduleId',
          'string',
          typeof request.data.scheduleId,
        )
      }

      if (request.data.groupNumber === undefined) {
        throw new MissingParameters('groupNumber')
      }
      if (typeof request.data.groupNumber !== 'number') {
        throw new WrongTypeParameters(
          'groupNumber',
          'number',
          typeof request.data.groupNumber,
        )
      }

      const scheduleId = request.data.scheduleId
      const groupNumber = request.data.groupNumber

      const possibilities = await this.usecase.execute(scheduleId, groupNumber)

      const viewmodel = new GetPossibilitiesByScheduleViewmodel(possibilities)

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
