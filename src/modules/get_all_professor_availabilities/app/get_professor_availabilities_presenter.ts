import { GetProfessorAvailabilityController } from './get_professor_availabilities_controller';
import { GetProfessorAvailabilityUsecase } from './get_professor_availabilities_usecase';
import { HttpResponse } from '../../../shared/helpers/external_interfaces/http_models';
import { IRequest } from '../../../shared/helpers/external_interfaces/external_interface';
import { IScheduleRepository } from '../../../shared/domain/repositories/schedule_repository_interface';

export async function GetProfessorAvailabilityPresenter(
    event: IRequest,
    repo: IScheduleRepository,
): Promise<HttpResponse> {
    const usecase = new GetProfessorAvailabilityUsecase(repo);
    const controller = new GetProfessorAvailabilityController(usecase);
    const response = await controller.execute(event);
    const httpResponse = new HttpResponse(response?.statusCode, response?.body);

    return httpResponse;
}
