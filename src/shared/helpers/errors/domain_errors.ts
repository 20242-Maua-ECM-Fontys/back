import { MAUA_END_TIME } from '@/shared/domain/enums/maua_end_time_enum'
import { BaseError } from './base_error'
import { MAUA_START_TIME } from '@/shared/domain/enums/maua_start_time_enum'

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
export class TimeError extends BaseError {
  constructor(startTime: MAUA_START_TIME, endTime: MAUA_END_TIME){
    super(`${startTime} can not be greater than or equal to ${endTime}`)
  }
}
