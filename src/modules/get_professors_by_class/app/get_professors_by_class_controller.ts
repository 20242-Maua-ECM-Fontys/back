
import { MissingParameters, WrongTypeParameters } from '../../../shared/helpers/errors/controller_errors';
import { IRequest, IResponse } from '../../../shared/helpers/external_interfaces/external_interface';
import { GetProfessorsByClassUsecase } from './get_professors_by_class_usecase';
import { OK, BadRequest, NotFound ,  InternalServerError,} from '../../../shared/helpers/external_interfaces/http_codes';
import { NoItemsFound } from '../../../shared/helpers/errors/repo_error';
import { GetProfessorsByClassViewmodel } from './get_professors_by_class_viewmodel';
import { Class} from '../../../shared/domain/entities/class'
import { EntityError} from '../../../shared/helpers/errors/domain_errors'

export class GetProfessorsByClassController {
  constructor(private usecase: GetProfessorsByClassUsecase) {}

  async execute(request: IRequest): Promise<IResponse> {
    try {
      const classId = request.data.classId as string;
      
      if (!classId) {
        throw new MissingParameters('classId');
      }

      if (!Class.validateId(classId)) {
        throw new EntityError('classId');
      }

      const professors = await this.usecase.execute(classId);
      return new OK(new GetProfessorsByClassViewmodel(professors).toJSON());
    } catch (error: unknown) {
      if (error instanceof NoItemsFound) {
        return new NotFound(error.message);
      }
      if (error instanceof MissingParameters) {
        return new BadRequest(error.message);
      }
      if (error instanceof WrongTypeParameters) {
        return new BadRequest(error.message);
      }
      if (error instanceof EntityError) {
        return new BadRequest(error.message);
      }
      return new InternalServerError('Unexpected error');
    }
  }
}
