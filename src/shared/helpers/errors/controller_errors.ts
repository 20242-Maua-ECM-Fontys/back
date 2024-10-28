import { BaseError } from './base_error'

export class MissingParameters extends BaseError {
  constructor(message: string) {
    super(`Field ${message} is missing`)
  }
}

export class WrongTypeParameters extends BaseError {
  constructor(fieldName: string, fieldTypeExpected: string, fieldDataReceived: any) {
    super(`Field ${fieldName} isn't in the right type.\n Received: ${fieldDataReceived}.\n Expected to be a ${fieldTypeExpected}.`)
  }
}