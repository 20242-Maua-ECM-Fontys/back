import {
  MissingParameters,
  WrongTypeParameters,
} from '../../../shared/helpers/errors/controller_errors';
import { IRequest, IResponse } from '../../../shared/helpers/external_interfaces/external_interface';
import { GetRoleByEmailUsecase } from './get_role_by_email_usecase';
import {
  BadRequest,
  InternalServerError,
  OK,
  NotFound,
} from '../../../shared/helpers/external_interfaces/http_codes';
import { NoItemsFound } from '../../../shared/helpers/errors/usecase_errors';
import { User } from '../../../shared/domain/entities/user';
import { EntityError } from '../../../shared/helpers/errors/domain_errors'
export class GetRoleByEmailController {
  constructor(private usecase: GetRoleByEmailUsecase) {}

  async execute(request: IRequest): Promise<IResponse> {
    try {

      const { email } = request.data as { email: string };
      if (email === undefined) {
        throw new MissingParameters('email');
      }
      if (typeof email !== 'string') {
        throw new WrongTypeParameters('email', 'string', email);
      }

      if (!User.validateEmail(email)) {
        return new BadRequest('Invalid email format');
      }

      const role = await this.usecase.execute(email);
      return new OK({ role });
    } catch (error: unknown) {
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
    return new InternalServerError('Unhandled error occurred');
  }
}
