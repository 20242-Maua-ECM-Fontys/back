import { CreatePossibilitiesController } from './create_possibilities_controller'
import { CreatePossibilitiesUsecase } from './create_possibilities_usecase'
import { HttpResponse } from '../../../shared/helpers/external_interfaces/http_models'
import { IRequest } from '../../../shared/helpers/external_interfaces/external_interface'
import { IScheduleRepository } from '../../../shared/domain/repositories/schedule_repository_interface'

export async function CreatePossibilitiesPresenter(
    event: IRequest,
    repo: IScheduleRepository,
): Promise<HttpResponse> {
    const usecase = new CreatePossibilitiesUsecase(repo)
    const controller = new CreatePossibilitiesController(usecase)
    const response = await controller.execute(event)
    const httpResponse = new HttpResponse(response?.statusCode, response?.body)
  
    return httpResponse 

}