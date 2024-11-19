import { MAUA_START_TIME } from '../../../shared/domain/enums/maua_start_time_enum'
import { ROLE } from '../../../shared/domain/enums/role_enum'
import { BaseError } from './base_error'
import { MAUA_END_TIME } from '../../../shared/domain/enums/maua_end_time_enum'

export class NoItemsFound extends BaseError {
  constructor(message: string) {
    super(`No items found for ${message}`)
  }
}

export class DuplicatedItem extends BaseError {
  constructor(message: string) {
    super(`The item already exists for this ${message}`)
  }
}

export class DuplicatedId extends BaseError {
  constructor(entity: string) {
    super(`Duplicated item on list of ${entity} ids`)
  }
}

export class InvalidCSVFormat extends BaseError {
  constructor() {
    super('CSV file with invalid format')
  }
}

export class InvalidRole extends BaseError {
  constructor(roleExpected: string, roleReceived: ROLE) {
    super(`Invalid role. Expected ${roleExpected} but received ${roleReceived}`)
  }
}

export class InvalidCSVRowType extends BaseError {
  constructor(rowType: string, rowNumber: number) {
    super(`CSV file with invalid row type: ${rowType} at row ${rowNumber}`)
  }
}

export class ForbiddenAction extends BaseError {
  constructor(message: string) {
    super(`The action is forbidden for this ${message}`)
  }
}

export class InvalidMauaTime extends BaseError {
  constructor(message: string) {
    super(`Invalid time: ${message}`)
  }
}

export class InvalidReferenceToScheduleId extends BaseError {
  constructor(entity: string, id: string, scheduleId: string, groupNumber: number) {
    super(`The entity ${entity} with id ${id} doesn't refeers to scheduleId ${scheduleId} and groupNumber ${groupNumber}`)
  }
}

export class ProfessorCannotTeachClass extends BaseError {
  constructor(userId: number, classId: string) {
    super(`The professor with id ${userId} cannot teach the class with id ${classId}`)
  }
}

export class ProfessorDoesntHaveAvailability extends BaseError {
  constructor(userId: number, startTime: MAUA_START_TIME, endTime: MAUA_END_TIME) {
    super(`The professor with id ${userId} doesn't have availability from ${startTime} to ${endTime}`)
  }
}

export class ProfessorAlreadyAssignToOtherSchedule extends BaseError {
  constructor(userId: number, scheduleId: string) {
    super(`The professor with id ${userId} is already assigned to schedule with id ${scheduleId}`)
  }
}


