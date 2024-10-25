import {
  HttpRequest,
  HttpResponse,
} from '../../../shared/helpers/external_interfaces/http_models';
import { GetRoleByEmailController } from './get_role_by_email_controller';
import { GetRoleByEmailUsecase } from './get_role_by_email_usecase';
import { IScheduleRepository } from '../../../shared/domain/repositories/schedule_repository_interface'
import { IRequest } from '../../../shared/helpers/external_interfaces/external_interface';

export async function GetRoleByEmailPresenter(
  httpRequest: IRequest, repo: IScheduleRepository
): Promise<HttpResponse> {
  const usecase = new GetRoleByEmailUsecase(repo);
  const controller = new GetRoleByEmailController(usecase);
  const response = await controller.handle(httpRequest);
  return new HttpResponse(
    response?.statusCode,
    response?.body,
    response?.headers,
  );
}
