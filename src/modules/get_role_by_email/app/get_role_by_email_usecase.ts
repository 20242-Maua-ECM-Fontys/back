import { IScheduleRepository } from '../../../shared/domain/repositories/schedule_repository_interface'
import { NoItemsFound } from '../../../shared/helpers/errors/usecase_errors'

export class GetRoleByEmailUsecase {
  constructor(private repo: IScheduleRepository) {}

  async execute(email: string): Promise<string> {
    const role = await this.repo.getRoleByEmail(email); 
    if (!role) {
      throw new NoItemsFound('email'); 
    }
    return role.toString(); 
  }
}

