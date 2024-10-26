import {
  MissingParameters,
  WrongTypeParameters,
} from '../../../shared/helpers/errors/controller_errors';
import { EntityError } from '../../../shared/helpers/errors/domain_errors';
import { IRequest, IResponse } from '../../../shared/helpers/external_interfaces/external_interface';
import {
  BadRequest,
  InternalServerError,
  OK,
  NotFound,
} from '../../../shared/helpers/external_interfaces/http_codes';
import { GetRoleByEmailUsecase } from './get_role_by_email_usecase';
import { NoItemsFound } from '../../../shared/helpers/errors/usecase_errors';
import { User } from '../../../shared/domain/entities/user';

export class GetRoleByEmailController {
  constructor(private usecase: GetRoleByEmailUsecase) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const { email } = request.data as { email: string };

      if (!email) {
        return new BadRequest('Missing email parameter');
      }

      if (!User.validateEmail(email)) {
        return new BadRequest('Invalid email format');
      }

      const role = await this.usecase.execute(email);
      return new OK({ role });
    } catch (error: any) {
      if (error instanceof NoItemsFound) {
        return new NotFound(error.message);
      }
      if (error instanceof MissingParameters || error instanceof WrongTypeParameters || error instanceof EntityError) {
        return new BadRequest(error.message);
      }
      if (error instanceof Error) {
        return new InternalServerError(error.message);
      }
    }
    // Retorno adicional para cobrir todos os fluxos
    return new InternalServerError('Unhandled error occurred');
  }
}
