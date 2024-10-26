import { IScheduleRepository } from '../../../shared/domain/repositories/schedule_repository_interface'
import { NoItemsFound } from '../../../shared/helpers/errors/usecase_errors'

export class GetRoleByEmailUsecase {
  constructor(private readonly repo: IScheduleRepository) {}

  async execute(email: string): Promise<string> {
    const user = await this.repo.getUserByEmail(email); 
    if (!user) {
      throw new Error('No items found'); 
    }
    return user.role; 
  }
}

