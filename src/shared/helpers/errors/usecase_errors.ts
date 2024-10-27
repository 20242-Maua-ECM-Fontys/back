import { ROLE } from '../../../shared/domain/enums/role_enum'
import { BaseError } from './base_error'

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
