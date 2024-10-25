import { GetRoleByEmailUsecase } from './get_role_by_email_usecase';
import { BadRequest, NotFound, OK } from '../../../shared/helpers/external_interfaces/http_codes';
import { IRequest, IResponse } from '../../../shared/helpers/external_interfaces/external_interface';
import { User } from '../../../shared/domain/entities/user';  // Importando o User para validação

export class GetRoleByEmailController {
  constructor(private readonly getRoleByEmailUsecase: GetRoleByEmailUsecase) {}

  async handle(request: IRequest): Promise<IResponse> {
    const email = request.data.email as string;

    // Verifica se o email está presente
    if (!email) {
      return new BadRequest({ message: 'Missing email parameter' });
    }

    // Valida o formato do email usando o método da entidade User
    if (!User.validateEmail(email)) {
      return new BadRequest({ message: 'Invalid email format' });
    }

    try {
      // Use case para buscar o papel (role) do usuário pelo email
      const role = await this.getRoleByEmailUsecase.execute(email);
      return new OK({ role });
    } catch (error) {
      if (error instanceof Error && error.message.includes('No items found')) {
        return new NotFound({ message: error.message });
      }
      throw error;
    }
  }
}
