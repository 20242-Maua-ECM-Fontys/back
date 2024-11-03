
import { HttpRequest, HttpResponse } from '../../../shared/helpers/external_interfaces/http_models';
import { IScheduleRepository } from '../../../shared/domain/repositories/schedule_repository_interface';
import { GetProfessorsByClassUsecase } from './get_professors_by_class_usecase';
import { GetProfessorsByClassController } from './get_professors_by_class_controller';
import { IRequest, IResponse } from '../../../shared/helpers/external_interfaces/external_interface';

export const GetProfessorsByClassPresenter = async (request: IRequest, repo: IScheduleRepository): Promise<HttpResponse> => {
  const usecase = new GetProfessorsByClassUsecase(repo);
  const controller = new GetProfessorsByClassController(usecase);
  const httpRequest = new HttpRequest(request.data);
  const response = await controller.execute(httpRequest);

  return new HttpResponse(response?.statusCode, response?.data);
};
