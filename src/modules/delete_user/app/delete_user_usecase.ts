import { IUserRepository } from '../../../shared/domain/repositories/user_repository_interface'
import { EntityError } from '../../../shared/helpers/errors/domain_errors'

export class DeleteUserUsecase {
  constructor(private repo: IUserRepository) {}

  async execute(id: number) {
    if (typeof id !== 'number') {
      throw new EntityError('id')
    }

    const user = await this.repo.deleteUser(id)

    return user
  }
}