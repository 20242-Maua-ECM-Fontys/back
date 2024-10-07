import { EntityError } from '../../helpers/errors/domain_errors'
import { PERIOD, toEnum } from '../enums/period_enum'

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

    if (!Subject.validatePeriod(props.period as PERIOD)) {
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

  static validatePeriod(period: PERIOD | undefined): boolean {
  // Se undefined for um valor aceitável, retorne true aqui
  if (period === undefined) {
    return true;
  }

  // Caso contrário, continua com as verificações de PERIOD
  if (period === null) {
    return false;
  }

  if (!Object.values(PERIOD).includes(period)) {
    return false;
  }

  return true;
}


  static fromJSON(json: JsonProps) {
    return new Subject({
      code: json.subjectCode,
      name: json.name,
      period: toEnum(json.period as string),
    })
  }

  // getter and setters
  get code() {
    return this.props.code
  }

  get name() {
    return this.props.name
  }

  get period() {
    return this.props.period
  }

  set code(code: string) {
    if (!Subject.validateCode(code)) {
      throw new EntityError('code')
    }
    this.props.code = code
  } 

  set name(name: string) {
    if (!Subject.validateName(name)) {
      throw new EntityError('name')
    }
    this.props.name = name
  }

  set period(period: PERIOD) {
    if (!Subject.validatePeriod(period)) {
      throw new EntityError('period')
    }
    this.props.period = period
  }

  toJSON() {
    return {
      code: this.props.code,
      name: this.props.name,
      period: this.props.period,
    }
  }
}
