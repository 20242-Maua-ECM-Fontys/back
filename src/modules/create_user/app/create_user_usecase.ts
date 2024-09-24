import { User } from '../../../shared/domain/entities/user'
import { STATE } from '../../../shared/domain/enums/state_enum'
import { IUserRepository } from '../../../shared/domain/repositories/user_repository_interface'
import { EntityError } from '../../../shared/helpers/errors/domain_errors'

export class CreateUserUsecase {
  constructor(private repo: IUserRepository) {}

  async execute(id: number, name: string, email: string) {
    if (User.validateName(name) === false) {
      throw new EntityError('name')
    }
    if (User.validateEmail(email) === false) {
      throw new EntityError('email')
    }

    const user = new User({id, name, email, state: STATE.PENDING})
    return this.repo.createUser(user)

  }
}