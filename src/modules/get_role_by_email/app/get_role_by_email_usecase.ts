import { IScheduleRepository } from '../../../shared/domain/repositories/schedule_repository_interface'
import { NoItemsFound } from '../../../shared/helpers/errors/usecase_errors'

export type GetRoleByEmailUsecaseResponse = {
  role: string;
  userId: number;
}

export class GetRoleByEmailUsecase {
  constructor(private repo: IScheduleRepository) {}

  async execute(email: string): Promise<GetRoleByEmailUsecaseResponse> {
    const user = await this.repo.getUserByEmail(email);
    if (!user) {
      throw new NoItemsFound('email'); 
    }
    return {
      role: user.role.toString(),
      userId: user.id
    }; 
  }
}

