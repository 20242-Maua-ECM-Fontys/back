import { UserProps } from '../../../shared/domain/entities/user'

export class LoginUserViewmodel {
  private message: string
  private type: string

  constructor(props: UserProps) {
    this.message = 'the login was successful'
    this.type = props.role
  }

  toJSON() {
    return {
      message: this.message,
      type: this.type,
    }
  }
}
