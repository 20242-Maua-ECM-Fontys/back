/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '../../domain/entities/user'
import { STATE } from '../../domain/enums/state_enum'

type UserDynamoDTOProps = {
  id: string
  name: string
  email: string
  state: STATE
}

export class UserDynamoDTO {
  private id: string
  private name: string
  private email: string
  private state: STATE

  constructor (props: UserDynamoDTOProps) {
    this.id = props.id
    this.name = props.name
    this.email = props.email
    this.state = props.state
  }

  static fromEntity(user: User): UserDynamoDTO {
    return new UserDynamoDTO({
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      state: user.state as STATE
    })
  }

  toDynamo() {
    return {
      'entity': 'user',
      'id': this.id,
      'name': this.name,
      'email': this.email,
      'state': this.state,
    }
  }

  static fromDynamo(userData: any) {
    const id = userData['id'] && userData['id']['S'] ? userData['id']['S'] : null
    const name = userData['name'] && userData['name']['S'] ? userData['name']['S'] : null
    const email = userData['email'] && userData['email']['S'] ? userData['email']['S'] : null
    const state = userData['state'] && userData['state']['S'] ? userData['state']['S'] : null
    return new UserDynamoDTO({
      id,
      name,
      email,
      state
    })
  }

  toEntity() {
    return new User({
      id: Number(this.id),
      name: this.name,
      email: this.email,
      state: this.state
    })
  }
}