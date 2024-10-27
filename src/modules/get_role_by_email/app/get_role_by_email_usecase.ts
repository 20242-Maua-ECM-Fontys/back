import { IScheduleRepository } from '../../../shared/domain/repositories/schedule_repository_interface'
import { NoItemsFound } from '../../../shared/helpers/errors/usecase_errors'

export class GetRoleByEmailUsecase {
  constructor(private repo: IScheduleRepository) {}

  async execute(email: string): Promise<string> {
    const user = await this.repo.getUserByEmail(email); 
    if (!user) {
      throw new NoItemsFound('email'); 
    }
    return user.role; 
  }
}

