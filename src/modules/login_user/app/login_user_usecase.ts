import { IUserRepository } from '../../../shared/domain/repositories/user_repository_interface'
import { EntityError } from '../../../shared/helpers/errors/domain_errors'

export class LoginUserUsecase {
  constructor(private repo: IUserRepository) {}

  async execute(email: string, password: string) {
    if (!email || !password) {
      throw new EntityError('Email and password are required')
    }
    return await this.repo.loginUser(email, password)
  }
}
