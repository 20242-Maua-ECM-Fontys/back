import { HttpResponse,HttpRequest } from '../../../shared/helpers/external_interfaces/http_models';
import { GetRoleByEmailController } from './get_role_by_email_controller';
import { GetRoleByEmailUsecase } from './get_role_by_email_usecase';
import { IScheduleRepository } from '../../../shared/domain/repositories/schedule_repository_interface';
import { IRequest, IResponse } from '../../../shared/helpers/external_interfaces/external_interface';
export const GetRoleByEmailPresenter = async (request: IRequest, repo: IScheduleRepository): Promise<HttpResponse> => {

  const usecase = new GetRoleByEmailUsecase(repo);
  const controller = new GetRoleByEmailController(usecase);
  
  const httpRequest = new HttpRequest(request.data);
  const response = await controller.execute(httpRequest);

  return new HttpResponse(
    response?.statusCode,
    response?.data 
  );
}
