import { Availability } from './availability'
import { Possibility } from './possibility'
import { Class } from './class'
import { EntityError } from '../../helpers/errors/domain_errors'

export type AvFullfilledProps = {
  availabilityId: string
  possibilityId: string
  classId: string
  roomCode?: string
}

export type JsonProps = {
  availabilityId: string
  possibilityId: string
  classId: string
  roomCode?: string
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

    if (!AvFullfilled.validateRoomCode(props.roomCode)) {
      throw new EntityError('roomCode')
    }
    this.props.roomCode = props.roomCode
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

  static validateRoomCode(roomCode: string | undefined): boolean {
    if (roomCode === null || roomCode === undefined) {
      return true
    } else if (!roomCode.match(/^[A-Z]\d{2,3}$/)) {
      return false
    } else if (typeof roomCode != 'string') {
      return false
    }
    return true
  }

  toJSON() {
    return {
      availabilityId: this.props.availabilityId,
      possibilityId: this.props.possibilityId,
      classId: this.props.classId,
      roomCode: this.props.roomCode,
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
