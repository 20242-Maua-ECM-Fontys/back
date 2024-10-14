import { UploadCSVController } from './upload_csv_controller'
import { UploadCSVUsecase } from './upload_csv_usecase'
import { HttpResponse } from '../../../shared/helpers/external_interfaces/http_models'
import { IRequest } from '../../../shared/helpers/external_interfaces/external_interface'
import { IScheduleRepository } from '../../../shared/domain/repositories/schedule_repository_interface'


export async function UploadCSVPresenter(event: IRequest, repo: IScheduleRepository): Promise<HttpResponse> {
  const usecase = new UploadCSVUsecase(repo)
  const controller = new UploadCSVController(usecase)
  const response = await controller.execute(event)
  const httpResponse = new HttpResponse(response?.statusCode, response?.body)

  return httpResponse
}
