import { BaseError } from './base_error'

export class EntityError extends BaseError {
  constructor(message: string) {
    super(`Field ${message} is not valid`)
  }
}

export class NullError extends BaseError {
  constructor(message: string) {
    super(`Field ${message} is not valid`)
  }
}

export class AvailabilityTimeError extends BaseError {
  constructor() {
    super(`startTime and endTime are not equal`)
  }
}
