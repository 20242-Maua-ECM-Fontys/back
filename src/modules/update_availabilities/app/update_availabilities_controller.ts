import {
  MissingParameters,
  WrongTypeParameters,
} from '../../../shared/helpers/errors/controller_errors'
import { IRequest } from '../../../shared/helpers/external_interfaces/external_interface'
import { UpdateAvailabilitiesUsecase } from './update_availabilities_usecase'
import {
  BadRequest,
  OK,
  InternalServerError,
  NotFound,
  Forbidden,
} from '../../../shared/helpers/external_interfaces/http_codes'
import {
  NoItemsFound as NoItemsFoundRepo,
} from '../../../shared/helpers/errors/repo_error'
import { EntityError } from '../../../shared/helpers/errors/domain_errors'
import { InvalidRole } from '../../../shared/helpers/errors/usecase_errors'
import { toEnum as startTimeToEnum } from '../../../shared/domain/enums/maua_start_time_enum'
import { toEnum as endTimeToEnum } from '../../../shared/domain/enums/maua_end_time_enum'
import { toEnum as weekDayToEnum } from '../../../shared/domain/enums/week_day_enum'
import { UpdateAvailabilitiesViewmodel } from './update_availabilities_viewmodel'

export class UpdateAvailabilitiesController {
  constructor(private usecase: UpdateAvailabilitiesUsecase) {}

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

      // check availabilities
      const availabilities = [];
      if (request.data.availabilities === undefined) {
        throw new MissingParameters('availabilities')
      }
      if (!Array.isArray(request.data.availabilities)) {
        throw new WrongTypeParameters('availabilities', 'array', request.data.availabilities)
      }
      for (const availability of request.data.availabilities) {
        // check startTime
        if (availability.startTime === undefined) {
          throw new MissingParameters('startTime')
        }
        let startTime;
        try{
          startTime = startTimeToEnum(availability.startTime)
        }
        catch (error: unknown) {
          throw new WrongTypeParameters('startTime', 'string as MAUA_START_TIME', availability.startTime)
        }

        // check endTime
        if (availability.endTime === undefined) {
          throw new MissingParameters('endTime')
        }
        let endTime;
        try{
          endTime = endTimeToEnum(availability.endTime)
        }
        catch (error: unknown) {
          throw new WrongTypeParameters('endTime', 'string as MAUA_END_TIME', availability.endTime)
        }

        // check weekDay
        if (availability.weekDay === undefined) {
          throw new MissingParameters('weekDay')
        }
        let weekDay;
        try{
          weekDay = weekDayToEnum(availability.weekDay)
        }
        catch (error: unknown) {
          throw new WrongTypeParameters('weekDay', 'string as WEEK_DAY', availability.weekDay)
        }

        availabilities.push({
          startTime,
          endTime,
          weekDay
        })
      }

      await this.usecase.execute(userId, availabilities)

      const viewmodel = new UpdateAvailabilitiesViewmodel().toJSON()

      const response = new OK(viewmodel)

      return response
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
