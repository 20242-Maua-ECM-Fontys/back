import { BaseError } from "./base_error";

export class DuplicatedItem extends BaseError {
  constructor(entity: string) {
    super(`${entity} already exists`)
  }
}

export class ViolateDataRule extends BaseError {
  constructor(data_rule: string) {
    super(`The data rule "${data_rule}" was violated`)
  }
}

export class NoItemsFound extends BaseError {
  constructor(message: string) {
    super(`No items found for ${message}`)
  }
}