/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '../../domain/entities/user'
import { ROLE } from '../../domain/enums/role_enum'

type userDynamoDTOProps = {
  id: string
  name: string
  email: string
  role: ROLE
  RA: string
}

export class UserDynamoDTO {
  private id: string
  private name: string
  private email: string
  private role: ROLE
  private RA: string

  constructor(props: userDynamoDTOProps) {
    this.id = props.id
    this.name = props.name
    this.email = props.email
    this.role = props.role
    this.RA = props.RA
  }

  static fromEntity(user: User): UserDynamoDTO {
    return new UserDynamoDTO({
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      role: user.role as ROLE,
      RA: user.RA,
    })
  }

  toDynamo() {
    return {
      'entity': 'user',
      'id': this.id,
      'name': this.name,
      'email': this.email,
      'role': this.role,
      'RA': this.RA,
    }
  }

  static fromDynamo(data: any) {
    const id = data['id'] && data['id']['S'] ? data['id']['S'] : null
    const name = data['name'] && data['name']['S'] ? data['name']['S'] : null
    const email =
      data['email'] && data['email']['S'] ? data['email']['S'] : null
    const role = data['role'] && data['role']['S'] ? data['role']['S'] : null
    const RA = data['RA'] && data['RA']['S'] ? data['RA']['S'] : null
    return new UserDynamoDTO({
      id: id,
      name: name,
      email: email,
      role: role as ROLE,
      RA: RA,
    })
  }

  toEntity(): User {
    return new User({
      id: Number(this.id),
      name: this.name,
      email: this.email,
      role: this.role,
      RA: this.RA,
    })
  }
}
