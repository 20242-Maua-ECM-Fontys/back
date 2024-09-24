import { UserProps } from '../../../shared/domain/entities/user'
import { STATE } from '../../../shared/domain/enums/state_enum'

export class GetUserViewmodel {
  private id: number
  private name: string
  private email: string
  private state: STATE

  constructor(props: UserProps) {
    this.id = props.id
    this.name = props.name
    this.email = props.email
    this.state = props.state as STATE
  }

  toJSON() {
    return {
      'id': this.id,
      'name': this.name,
      'email': this.email,
      'state': this.state,
      'message': 'The user was retrieved successfully'
    }
  }
}