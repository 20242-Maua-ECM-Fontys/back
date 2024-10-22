
import {
  MissingParameters,
  WrongTypeParameters,
} from '../../../shared/helpers/errors/controller_errors'
import { IRequest } from '../../../shared/helpers/external_interfaces/external_interface'
import { GetAllSubjectsUsecase } from './get_all_subjects_usecase'
import { GetAllSubjectsViewmodel } from './get_all_subjects_viewmodel'
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

export class GetAllSubjectsController {
  constructor(private usecase: GetAllSubjectsUsecase) {}

  async execute(request: IRequest) {
    try {
      const subjects = await this.usecase.execute()
      const viewmodel = new GetAllSubjectsViewmodel(subjects)
      const response = new OK(viewmodel.toJSON())

      return response
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new InternalServerError(error.message)
      }
    }
  }
}
