import { ROLE, toEnum, VALID_ROLES } from '../enums/role_enum'
import { EntityError } from '../../helpers/errors/domain_errors'

export type UserProps = {
  id: number
  name: string
  email: string
  role: ROLE
  RA: string
  password: string
}

export type JsonProps = {
  user_id: number
  name: string
  email: string
  role: string
  RA: string
  password: string
}

export class User {
  constructor(public props: UserProps) {
    if (!User.validateId(props.id)) {
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

    if (!User.validateRole(props.role as ROLE)) {
      throw new EntityError('props.role')
    }
    this.props.role = props.role

    if (!User.validateRA(props.RA)) {
      throw new EntityError('props.RA')
    }
    this.props.RA = props.RA

    if (!User.validatePassword(props.password)) {
      throw new EntityError('props.password')
    }
    this.props.password = props.password
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

  get role() {
    return this.props.role
  }

  set setRole(role: ROLE) {
    if (!User.validateRole(role)) {
      throw new EntityError('props.role')
    }
    this.props.role = role
  }

  get RA() {
    return this.props.RA
  }

  set setRA(RA: string) {
    if (!User.validateRA(RA)) {
      throw new EntityError('props.RA')
    }
    this.props.RA = RA
  }

  get password() {
    return this.props.password
  }

  set setPassword(password: string) {
    if (!User.validatePassword(password)) {
      throw new EntityError('props.password')
    }
    this.props.password = password
  }

  static fromJSON(json: JsonProps) {
    return new User({
      id: json.user_id,
      name: json.name,
      email: json.email,
      role: toEnum(json.role as string),
      RA: json.RA,
      password: json.password,
    })
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
      RA: this.RA,
      password: this.password,
    }
  }

  static validateId(id: number): boolean {
    return id != null && typeof id === 'number'
  }

  static validateName(name: string): boolean {
    return name != null && typeof name === 'string' && name.length >= 3
  }

  static validateEmail(email: string): boolean {
    const regexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return email != null && typeof email === 'string' && regexp.test(email)
  }

  static validateRole(role: ROLE): boolean {
    return role != null && Object.values(ROLE).includes(role as ROLE)
  }

  static validateRA(RA: string): boolean {
    return RA != null && typeof RA === 'string'
  }

  static validatePassword(password: string): boolean {
    const passwordRegexp =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return (
      password != null &&
      typeof password === 'string' &&
      passwordRegexp.test(password)
    )
  }
}
