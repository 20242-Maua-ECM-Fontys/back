import { Availability } from './availability'
import { Possibility } from './possibility'
import { Class } from './class'
import { EntityError } from '../../helpers/errors/domain_errors'

export type AvFullfilledProps = {
  availabilityId: string
  possibilityId: string
  classId: string
}

export type JsonProps = {
  availabilityId: string
  possibilityId: string
  classId: string
}

export class AvFullfilled {
  constructor(public props: AvFullfilledProps) {
    if (!AvFullfilled.validateAvailabilityId(props.availabilityId)) {
      throw new EntityError('availabilityId')
    }
    this.props.availabilityId = props.availabilityId

    if (!AvFullfilled.validatePossibilityId(props.possibilityId)) {
      throw new EntityError('possibilityId')
    }
    this.props.possibilityId = props.possibilityId

    if (!AvFullfilled.validateClassId(props.classId)) {
      throw new EntityError('classId')
    }
    this.props.classId = props.classId
  }

  static validateAvailabilityId(id: string): boolean {
    return Availability.validateId(id)
  }

  static validatePossibilityId(id: string): boolean {
    return Possibility.validateId(id)
  }

  static validateClassId(id: string): boolean {
    return Class.validateId(id)
  }

  static fromJSON(json: JsonProps) {
    return new AvFullfilled({
      availabilityId: json.availabilityId,
      possibilityId: json.possibilityId,
      classId: json.classId,
    })
  }

  toJSON() {
    return {
      availabilityId: this.props.availabilityId,
      possibilityId: this.props.possibilityId,
      classId: this.props.classId,
    }
  }

  get availabilityId(): string {
    return this.props.availabilityId
  }

  get possibilityId(): string {
    return this.props.possibilityId
  }

  get classId(): string {
    return this.props.classId
  }

  set availabilityId(id: string) {
    if (!AvFullfilled.validateAvailabilityId(id)) {
      throw new EntityError('availabilityId')
    }
    this.props.availabilityId = id
  }

  set possibilityId(id: string) {
    if (!AvFullfilled.validatePossibilityId(id)) {
      throw new EntityError('possibilityId')
    }
    this.props.possibilityId = id
  }

  set classId(id: string) {
    if (!AvFullfilled.validateClassId(id)) {
      throw new EntityError('classId')
    }
    this.props.classId = id
  }
}
