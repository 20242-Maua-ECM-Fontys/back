import { UserProps } from '../../../shared/domain/entities/user'
import { ROLE } from '../../../shared/domain/enums/role_enum'

export class CreateUserViewmodel {
  private id: number
  private name: string
  private email: string
  private role: ROLE
  private RA: string
  private password: string

  constructor(props: UserProps) {
    this.id = props.id
    this.name = props.name
    this.email = props.email
    this.role = props.role as ROLE
    this.RA = props.RA
    this.password = props.password
  }

  toJSON() {
    return {
      'id': this.id,
      'name': this.name,
      'email': this.email,
      'role': this.role,
      'RA':this.RA,
      'password':this.password,
      'message': 'The user was created successfully'
    }
  }
}