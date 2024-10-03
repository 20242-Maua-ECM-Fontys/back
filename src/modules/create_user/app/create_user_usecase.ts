import { User } from '../../../shared/domain/entities/user'
import { ROLE } from '../../../shared/domain/enums/role_enum'
import { IUserRepository } from '../../../shared/domain/repositories/user_repository_interface'
import { EntityError } from '../../../shared/helpers/errors/domain_errors'
import { DuplicatedItem } from '../../../shared/helpers/errors/usecase_errors'

export class CreateUserUsecase {
  constructor(private repo: IUserRepository) {}

  async execute(id: number, name: string, email: string, RA: string,password: string,role: ROLE) {
    if (User.validateName(name) === false) {
      throw new EntityError('name')
    }
    if (User.validateEmail(email) === false) {
      throw new EntityError('email')
    }
   if (User.validateRA(RA) === false) {
      throw new EntityError('RA')
    }

  if (User.validatePassword(password) === false) {
    throw new EntityError('password')
  }
  if (User.validateRole(role) === false) {
    throw new EntityError('role')
  }
  
    const user = new User({id:id, name:name, email:email, role:role,RA:RA,password:password})


    return this.repo.createUser(user)

  }
}