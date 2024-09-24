import { IUserRepository } from '../../../shared/domain/repositories/user_repository_interface'

export class GetAllUsersUsecase {
  constructor(private repo: IUserRepository) {}

  async execute() {
    const users = await this.repo.getAllUsers()
    return users
  }
}