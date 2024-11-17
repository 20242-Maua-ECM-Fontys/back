import {
  MissingParameters,
  WrongTypeParameters,
} from '../../../shared/helpers/errors/controller_errors'
import { IRequest } from '../../../shared/helpers/external_interfaces/external_interface'
import { UpdateAvailabilitiesFullfilledUsecase } from './update_availabilities_fullfilled_usecase'
import {
  BadRequest,
  OK,
  InternalServerError,
  NotFound,
  Forbidden,
  Conflict,
} from '../../../shared/helpers/external_interfaces/http_codes'
import {
  NoItemsFound as NoItemsFoundRepo,
  ViolateDataRule,
} from '../../../shared/helpers/errors/repo_error'
import { EntityError } from '../../../shared/helpers/errors/domain_errors'
import { DuplicatedId, InvalidReferenceToScheduleId, InvalidRole, ProfessorAlreadyAssignToOtherSchedule, ProfessorCannotTeachClass, ProfessorDoesntHaveAvailability } from '../../../shared/helpers/errors/usecase_errors'
import { UpdateAvailabilitiesFullfilledViewmodel } from './update_availabilities_fullfilled_viewmodel'

export class UpdateAvailabilitiesFullfilledController {
  constructor(private usecase: UpdateAvailabilitiesFullfilledUsecase) {}

  async execute(request: IRequest) {
    try {
      // check scheduleId
      if (request.data.scheduleId === undefined) {
        throw new MissingParameters('scheduleId')
      }
      if (typeof request.data.scheduleId !== 'string') {
        throw new WrongTypeParameters('scheduleId', 'string', request.data.scheduleId)
      }
      const scheduleId = request.data.scheduleId

      // check availabilitiesFullfilled
      const availabilitiesFullfilled = [];
      if (request.data.availabilitiesFullfilled === undefined) {
        throw new MissingParameters('availabilitiesFullfilled')
      }
      if (!Array.isArray(request.data.availabilitiesFullfilled)) {
        throw new WrongTypeParameters('availabilitiesFullfilled', 'array', request.data.availabilitiesFullfilled)
      }
      for (const avFullfilled of request.data.availabilitiesFullfilled) {
        // check userId
        if (avFullfilled.userId === undefined) {
          throw new MissingParameters('userId')
        }
        if (typeof avFullfilled.userId !== 'number') {
          throw new WrongTypeParameters('userId', 'number', avFullfilled.userId)
        }

        // check classId
        if (avFullfilled.classId === undefined) {
          throw new MissingParameters('classId')
        }
        if (typeof avFullfilled.classId !== 'string') {
          throw new WrongTypeParameters('classId', 'string', avFullfilled.classId)
        }

        // check possibilityId
        if (avFullfilled.possibilityId === undefined) {
          throw new MissingParameters('possibilityId')
        }
        if (typeof avFullfilled.possibilityId !== 'string') {
          throw new WrongTypeParameters('possibilityId', 'string', avFullfilled.possibilityId)
        }

        availabilitiesFullfilled.push({
          userId: avFullfilled.userId,
          classId: avFullfilled.classId,
          possibilityId: avFullfilled.possibilityId,
        })
      }

      await this.usecase.execute(scheduleId, availabilitiesFullfilled)

      const viewmodel = new UpdateAvailabilitiesFullfilledViewmodel().toJSON()

      const response = new OK(viewmodel)

      return response
    } catch (error: unknown) {
      if (error instanceof MissingParameters) {
        return new BadRequest(error.message)
      }
      if (error instanceof WrongTypeParameters) {
        return new BadRequest(error.message)
      }
      if (error instanceof DuplicatedId) {
        return new BadRequest(error.message)
      }
      if (error instanceof InvalidReferenceToScheduleId) {
        return new BadRequest(error.message)
      }
      if (error instanceof ProfessorAlreadyAssignToOtherSchedule) {
        return new Conflict(error.message)
      }
      if (error instanceof ProfessorCannotTeachClass) {
        return new Forbidden(error.message)
      }
      if (error instanceof ViolateDataRule) {
        return new Forbidden(error.message)
      }
      if (error instanceof ProfessorDoesntHaveAvailability) {
        return new Conflict(error.message)
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
