import { BaseError } from './base_error'

export class EntityError extends BaseError {
  constructor(message: string) {
    super(`Field ${message} is not valid`)
  }
}
