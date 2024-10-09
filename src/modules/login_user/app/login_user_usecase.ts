import { IUserRepository } from '../../../shared/domain/repositories/user_repository_interface'
import { EntityError } from '../../../shared/helpers/errors/domain_errors'
import { NoItemsFound } from '../../../shared/helpers/errors/usecase_errors'
import { User } from '../../../../src/shared/domain/entities/user'

export class LoginUserUsecase {
  constructor(private repo: IUserRepository) {}

  async execute(email: string, password: string) {

    if (!email || !password) {
      throw new EntityError('Email and password are required')
    }
    if (!User.validatePassword(password)) {
      throw new EntityError('Invalid password format')
    }
    if (!User.validateEmail(email)) {
      throw new EntityError('Invalid email format')
    }

    const user = await this.repo.loginUser(email, password)

    if (!user) {
      throw new NoItemsFound('Invalid email or password') 
    }

    return user
  }
}
