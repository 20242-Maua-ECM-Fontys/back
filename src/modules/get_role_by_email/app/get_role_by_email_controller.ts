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
import { NoItemsFound } from '../../../shared/helpers/errors/repo_error';
import { User } from '../../../shared/domain/entities/user';
import { EntityError } from '../../../shared/helpers/errors/domain_errors'
import { GetRoleByEmailViewModel } from './get_role_by_email_viewmodel';

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

      const userData = await this.usecase.execute(email);
      const viewModel = new GetRoleByEmailViewModel(userData);
      return new OK(viewModel.toJSON());
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
