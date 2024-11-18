import {
  MissingParameters,
  WrongTypeParameters,
} from '../../../shared/helpers/errors/controller_errors'
import { IRequest } from '../../../shared/helpers/external_interfaces/external_interface'
import { CreatePossibilitiesUsecase, DatesUsecaseParam } from './create_possibilities_usecase'
import {
  BadRequest,
  InternalServerError,
  NotFound,
  Forbidden,
  Created,
} from '../../../shared/helpers/external_interfaces/http_codes'
import {
  NoItemsFound as NoItemsFoundRepo,
} from '../../../shared/helpers/errors/repo_error'
import { EntityError } from '../../../shared/helpers/errors/domain_errors'
import { InvalidMauaTime, InvalidRole } from '../../../shared/helpers/errors/usecase_errors'
import { CreatePossibilitiesViewmodel } from './create_possibilities_viewmodel'
import { MAUA_START_TIME, toEnum as startTimeToEnum } from '../../../shared/domain/enums/maua_start_time_enum';
import { MAUA_END_TIME, toEnum as endTimeToEnum } from '../../../shared/domain/enums/maua_end_time_enum';
import { WEEK_DAY, toEnum as weekDayToEnum } from '../../../shared/domain/enums/week_day_enum';

type DateControllerParam = {
  notEarlier: number
  notLater: number
}
type DatesControllerParam = {
  "mon"?: DateControllerParam
  "tue"?: DateControllerParam
  "web"?: DateControllerParam
  "thu"?: DateControllerParam
  "fri"?: DateControllerParam
  "sat"?: DateControllerParam
}

export class CreatePossibilitiesController {
  constructor(private usecase: CreatePossibilitiesUsecase) {}

  async execute(request: IRequest) {
    try{

      if (request.data.scheduleId === undefined) {
        throw new MissingParameters('scheduleId')
      }
      if (typeof request.data.scheduleId !== 'string') {
        throw new WrongTypeParameters('scheduleId', 'string', request.data.scheduleId)
      }
      const scheduleId: string = request.data.scheduleId
      
      if (request.data.dates === undefined || request.data.dates === null) {
        throw new MissingParameters('dates')
      }
      if (typeof request.data.dates != 'object') {
        throw new WrongTypeParameters('dates', 'object', request.data.dates)
      }
      const dates: DatesControllerParam = request.data.dates
      const usecaseDates: DatesUsecaseParam = {}
      for (const key of Object.keys(dates)) {
        try{
          weekDayToEnum(key.toUpperCase())
        }
        catch (error: unknown) {
          throw new WrongTypeParameters('weekDay', 'string as WEEK_DAY', key)
        }

        const dayData = dates[key as keyof DatesControllerParam]
        if (!dayData) {
          throw new MissingParameters(key);
        }
        if (typeof dayData !== 'object') {
          throw new WrongTypeParameters(key, 'object', dayData)
        }

        if (dayData.notEarlier === undefined) {
          throw new MissingParameters('notEarlier')
        }
        let notEarlier;
        try{
          notEarlier = startTimeToEnum(dayData.notEarlier)
        }
        catch (error: unknown) {
          throw new WrongTypeParameters('notEarlier', 'number as START_TIME', dayData.notEarlier)
        }
        
        if (dayData.notLater === undefined) {
          throw new MissingParameters('notLater')
        }
        let notLater;
        try{
          notLater = endTimeToEnum(dayData.notLater)
        }
        catch (error: unknown) {
          throw new WrongTypeParameters('notLater', 'number as END_TIME', dayData.notLater)
        }

        usecaseDates[key.toUpperCase()] = {
          notEarlier: notEarlier,
          notLater: notLater
        }
      }
      
      await this.usecase.execute(scheduleId, dates)

      const viewmodel = new CreatePossibilitiesViewmodel()
      return new Created(viewmodel.toJSON())  

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
      if (error instanceof InvalidMauaTime) {
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