import { IRequest } from '../../../shared/helpers/external_interfaces/external_interface'
import {
  BadRequest,
  OK,
  InternalServerError,
} from '../../../shared/helpers/external_interfaces/http_codes'
import { EntityError } from '../../../shared/helpers/errors/domain_errors'
import { GetAllProfessorsUsecase } from './get_all_professors_usecase'
import { GetAllProfessorsViewmodel } from './get_all_professors_viewmodel'
import { NoItemsFound } from '../../../shared/helpers/errors/repo_error'

export class GetAllProfessorsController {
  constructor(private usecase: GetAllProfessorsUsecase) {}

  async execute(request: IRequest) {
    try {
      const professors = await this.usecase.execute()
      const viewmodel = new GetAllProfessorsViewmodel(professors)
      const response = new OK(viewmodel)

      return response
    } catch (error: unknown) {
      if (error instanceof NoItemsFound) {
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
