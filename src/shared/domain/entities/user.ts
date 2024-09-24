import { STATE, toEnum } from '../enums/state_enum'
import { EntityError } from '../../helpers/errors/domain_errors'

export type UserProps = {
  id: number;
  name: string;
  email: string;
  state?: STATE;
}

export type JsonProps = {
  user_id: number;
  name: string;
  email: string;
  state?: string;
}

export class User {
  constructor (public props: UserProps) {
    if (!User.validateId(props.id as number)) {
      throw new EntityError('props.id')
    }
    this.props.id = props.id

    if (!User.validateName(props.name)) {
      throw new EntityError('props.name')
    }
    this.props.name = props.name

    if (!User.validateEmail(props.email)) {
      throw new EntityError('props.email')
    }
    this.props.email = props.email

    if (!User.validateState(props.state as STATE)) {
      throw new EntityError('props.state')
    }
    this.props.state = props.state

  }

  get id() {
    return this.props.id
  }

  set setId(id: number) {
    if (!User.validateId(id)) {
      throw new EntityError('props.id')
    }
    this.props.id = id
  }

  get name() {
    return this.props.name
  }

  set setName(name: string) {
    if (!User.validateName(name)) {
      throw new EntityError('props.name')
    }
    this.props.name = name
  }

  get email() {
    return this.props.email
  }

  set setEmail(email: string) {
    if (!User.validateEmail(email)) {
      throw new EntityError('props.email')
    }
    this.props.email = email
  }

  get state() {
    return this.props.state
  }

  set setState(state: STATE) {
    if (!User.validateState(state)) {
      throw new EntityError('props.state')
    }
    this.props.state = state
  }
    
  static fromJSON(json: JsonProps) {
    return new User({
      id: json.user_id,
      name: json.name,
      email: json.email,
      state: toEnum(json.state as string)
    })
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      state: this.state
    }
  }

  static validateId(id: number): boolean {
    if (id == null) {
      return false
    } else if (typeof(id) != 'number') {
      return false
    }
    return true
  }

  static validateName(name: string): boolean {
    if (name == null) {
      return false
    } else if (typeof(name) != 'string') {
      return false
    } else if (name.length < 3) {
      return false
    }
    return true
  }

  static validateEmail(email: string): boolean {
    const regexp = '(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$)'

    if (email == null) {
      return false
    }
    if (typeof(email) != 'string') {
      return false
    }
    if (!email.match(regexp)) {
      return false
    }
    return true
  }

  static validateState(state: STATE): boolean {
    if (state == null) {
      return false
    } 
    if (Object.values(STATE).includes(state) == false) {
      return false
    }
    return true
  }

}