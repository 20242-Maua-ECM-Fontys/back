import { EntityError } from '../../helpers/errors/domain_errors'

export type SuitabilityProps = {
  userId: number
  codeSubject: string
}

export type JsonProps = {
  userId: number
  codeSubject: string
}
export class Suitability {
  constructor(public props: SuitabilityProps) {
    if (!Suitability.validateUserId(props.userId)) {
      throw new EntityError('props.userId')
    }
    this.props.userId = props.userId

    if (!Suitability.validateCodeSubject(props.codeSubject)) {
      throw new EntityError('props.codeSubject')
    }
    this.props.codeSubject = props.codeSubject
  }

  static validateUserId(id: number): boolean {
    return id != null && typeof id === 'number' && id >= 0
  }

  static validateCodeSubject(codeSubject: string): boolean {
    if (codeSubject === null || !codeSubject.match(/^[A-Z]{3}\d{3}$/)) {
      return false
    } else {
      return true
    }
  }

  static fromJSON(json: JsonProps) {
    return new Suitability({
      userId: json.userId,
      codeSubject: json.codeSubject,
    })
  }

  toJSON() {
    return {
      userId: this.userId,
      codeSubject: this.codeSubject,
    }
  }

  get userId() {
    return this.props.userId
  }

  get codeSubject() {
    return this.props.codeSubject
  }

  set userId(userId: number) {
    if (!Suitability.validateUserId(userId)) {
      throw new EntityError('userId')
    }
    this.props.userId = userId
  }

  set codeSubject(codeSubject: string) {
    if (!Suitability.validateCodeSubject(codeSubject)) {
      throw new EntityError('codeSubject')
    }
    this.props.codeSubject = codeSubject
  }
}
