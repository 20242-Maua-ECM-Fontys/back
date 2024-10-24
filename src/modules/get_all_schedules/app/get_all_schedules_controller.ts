
import {
  MissingParameters,
  WrongTypeParameters,
} from '../../../shared/helpers/errors/controller_errors'
import { IRequest } from '../../../shared/helpers/external_interfaces/external_interface'
import { GetAllSchedulesUsecase } from './get_all_schedules_usecase'
import { GetAllSchedulesViewModel } from './get_all_schedules_viewmodel'
import {
  BadRequest,
  OK,
  InternalServerError,
} from '../../../shared/helpers/external_interfaces/http_codes'
import { EntityError } from '../../../shared/helpers/errors/domain_errors'
import {
  InvalidCSVRowType,
  InvalidCSVFormat,
} from '../../../shared/helpers/errors/usecase_errors'

export class GetAllSchedulesController {
  constructor(private usecase: GetAllSchedulesUsecase) {}

  async execute(request: IRequest) {
    try {
      const schedules = await this.usecase.execute()
      const viewmodel = new GetAllSchedulesViewModel(schedules)
      const response = new OK(viewmodel.toJSON())

      return response
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new InternalServerError(error.message)
      }
    }
  }
}
