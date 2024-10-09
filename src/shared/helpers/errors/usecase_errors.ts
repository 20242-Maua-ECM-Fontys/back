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

export class InvalidCSVRowType extends BaseError {
  constructor(rowType: string) {
    super(`CSV file with invalid row type: ${rowType}`)
  }
}

export class ForbiddenAction extends BaseError {
  constructor(message: string) {
    super(`The action is forbidden for this ${message}`)
  }
}
