import { User } from '../../../shared/domain/entities/user'
import { STATE } from '../../../shared/domain/enums/state_enum'

export class UserViewmodel {
  private id: number
  private name: string
  private email: string
  private state: STATE

  constructor(user: User) {
    this.id = user.id
    this.name = user.name
    this.email = user.email
    this.state = user.state as STATE
  }

  toJSON() {
    return {
      'id': this.id,
      'name': this.name,
      'email': this.email,
      'state': this.state,
    }
  }
}

export class GetAllUsersViewmodel {
  private users: UserViewmodel[]

  constructor(users: User[]) {
    this.users = users.map((user) => new UserViewmodel(user))
  }

  toJSON() {
    return {
      'users': this.users.map((user) => user.toJSON()),
      'message': 'All users have been retrieved successfully',
    }
  }
}