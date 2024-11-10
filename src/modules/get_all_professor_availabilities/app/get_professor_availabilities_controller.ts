import { IRequest } from '../../../shared/helpers/external_interfaces/external_interface';
import { BadRequest, OK, InternalServerError, NotFound } from '../../../shared/helpers/external_interfaces/http_codes';
import { EntityError } from '../../../shared/helpers/errors/domain_errors';
import { GetProfessorAvailabilityUsecase } from './get_professor_availabilities_usecase';
import { GetProfessorAvailabilitiesViewmodel } from './get_professor_availabilities_viewmodel';
import { NoItemsFound } from '../../../shared/helpers/errors/repo_error';
import { MissingParameters, WrongTypeParameters } from '../../../shared/helpers/errors/controller_errors';
import { InvalidRole } from '../../../shared/helpers/errors/usecase_errors';

export class GetProfessorAvailabilityController {
    constructor(private usecase: GetProfessorAvailabilityUsecase) { }

    async execute(request: IRequest) {
        try {
            if(request.data.userId === undefined){
                throw new MissingParameters('userId')
            }
            if(typeof request.data.userId !== 'string'){
                throw new WrongTypeParameters('userId', 'string', request.data.userId)
            }
            if(!Number.isInteger(Number(request.data.userId))){
                throw new WrongTypeParameters('userId', 'numeric string', request.data.userId)
            }

            const userId = parseInt(request.data.userId);

            const availabilityData = await this.usecase.execute(userId);

            const viewmodel = new GetProfessorAvailabilitiesViewmodel(availabilityData);
            const response = new OK(viewmodel);

            return response;
        } catch (error: unknown) {
            if (error instanceof NoItemsFound) {
                return new NotFound(error.message);
            }
            if (error instanceof EntityError) {
                return new BadRequest(error.message);
            }
            if(error instanceof InvalidRole){
                return new BadRequest(error.message)
            }
            if(error instanceof MissingParameters){
                return new BadRequest(error.message)
            }
            if(error instanceof WrongTypeParameters){
                return new BadRequest(error.message)
            }
            if (error instanceof Error) {
                return new InternalServerError(error.message);
            }
            
            // Fallback error handling
            return new InternalServerError('An unexpected error occurred.');
        }
    }
}
