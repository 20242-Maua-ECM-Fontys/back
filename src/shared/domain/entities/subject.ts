import { EntityError } from '@/shared/helpers/errors/domain_errors'
import { PERIOD, toEnum } from '@/shared/domain/enums/period_enum'

export type SubjectProps = {
  code: string
  name: string
  period: PERIOD
}

export type JsonProps = {
  subjectCode: string
  name: string
  period: string
}

export class Subject {
  constructor(public props: SubjectProps) {
    if (!Subject.validateCode(props.code)) {
      throw new EntityError('props.code')
    }
    this.props.code = props.code

    if (!Subject.validateName(props.name)) {
      throw new EntityError('props.name')
    }
    this.props.name = props.name

    if (!Subject.validatePeriod(props.period)) {
      throw new EntityError('props.period')
    }
    this.props.period = props.period
  }

  static validateCode(code: string): boolean {
    if (code === null || !code.match(/^[A-Z]{3}\d{3}$/)) {
      return false
    } else {
      return true
    }
  }

  static validateName(name: string): boolean {
    if (name == null) {
      return false
    } else if (typeof name != 'string') {
      return false
    } else if (name.length < 3) {
      return false
    }
    return true
  }

  static validatePeriod(period: PERIOD): boolean {
    if (period === null) {
      return false
    } else if (!toEnum(period)) {
      return false
    }
    return true
  }
}
