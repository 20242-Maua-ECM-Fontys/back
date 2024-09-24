import { IUserRepository } from '../../../shared/domain/repositories/user_repository_interface'
import { EntityError } from '../../../shared/helpers/errors/domain_errors'

export class UpdateUserUsecase {
  constructor(private repo: IUserRepository) {}

  async execute(id: number, newName: string, newEmail: string) {
    if (typeof id !== 'number') {
      throw new EntityError('id')
    }

    if (typeof newName !== 'string' || newName === '') {
      throw new EntityError('name')
    }

    if (typeof newEmail !== 'string' || newEmail === '') {
      throw new EntityError('email')
    }

    const user = await this.repo.updateUser(id, newName, newEmail)

    return user
  }
}