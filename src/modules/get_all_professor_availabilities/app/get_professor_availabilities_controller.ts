import { IRequest } from '../../../shared/helpers/external_interfaces/external_interface';
import { BadRequest, OK, InternalServerError } from '../../../shared/helpers/external_interfaces/http_codes';
import { EntityError } from '../../../shared/helpers/errors/domain_errors';
import { GetProfessorAvailabilityUsecase } from './get_professor_availabilities_usecase';
import { GetProfessorAvailabilitiesViewmodel } from './get_professor_availabilities_viewmodel';
import { NoItemsFound } from '../../../shared/helpers/errors/repo_error';

export class GetProfessorAvailabilityController {
    constructor(private usecase: GetProfessorAvailabilityUsecase) { }

    async execute(request: IRequest) {
        try {
            const professorId = parseInt((request as any).params.professorId, 10);
            const availabilityData = await this.usecase.execute(professorId);

            const viewmodel = new GetProfessorAvailabilitiesViewmodel(availabilityData);
            const response = new OK(viewmodel);

            return response;
        } catch (error: unknown) {
            if (error instanceof NoItemsFound) {
                return new BadRequest(error.message);
            }
            if (error instanceof EntityError) {
                return new BadRequest(error.message);
            }
            if (error instanceof Error) {
                return new InternalServerError(error.message);
            }
            // Fallback error handling
            return new InternalServerError('An unexpected error occurred.');
        }
    }
}
