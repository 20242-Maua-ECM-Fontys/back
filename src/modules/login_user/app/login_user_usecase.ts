import { EntityError } from '../../../shared/helpers/errors/domain_errors'
import { NoItemsFound } from '../../../shared/helpers/errors/usecase_errors'
import { User } from '../../../../src/shared/domain/entities/user'
import { IScheduleRepository } from '@/shared/domain/repositories/schedule_repository_interface'

export class LoginUserUsecase {
  constructor(private repo: IScheduleRepository) {}

  async execute(email: string, password: string) {
    if (!User.validatePassword(password)) {
      throw new EntityError('password')
    }
    if (!User.validateEmail(email)) {
      throw new EntityError('email')
    }

    const user = await this.repo.loginUser(email, password)

    if (!user) {
      throw new NoItemsFound('email')
    }

    return user
  }
}
