import { EntityError } from '../../helpers/errors/domain_errors'

export type RoomProps = {
  block: string
  roomNumber: string
  id: string
  capacity: number
}

export type JsonProps = {
  block: string
  roomNumber: string
  roomId: string
  capacity: number
}

export class Room {
  constructor(public props: RoomProps) {
    if (!Room.validateBlock(props.block)) {
      throw new EntityError('Invalid block')
    }
    if (!Room.validateRoomNumber(props.roomNumber)) {
      throw new EntityError('Invalid roomNumber')
    }
    if (!Room.validateId(props.id)) {
      throw new EntityError('Invalid id')
    }
    if (props.block + props.roomNumber != props.id) {
      throw new EntityError('Invalid id')
    }
    if (!Room.validateCapacity(props.capacity)) {
      throw new EntityError('Invalid capacity')
    }
    this.props.block = props.block
    this.props.roomNumber = props.roomNumber
    this.props.id = props.id
    this.props.capacity = props.capacity
  }

  static validateBlock(block: string): boolean {
    if (block == null) {
      return false
    } else if (typeof block != 'string') {
      return false
    } else if (block.length != 1) {
      return false
    } else if (block.toUpperCase() != block) {
      return false
    }
    return true
  }

  static validateRoomNumber(roomNumber: string): boolean {
    if (roomNumber === null) {
      return false
    } else if (typeof roomNumber != 'string') {
      return false
    } else if (roomNumber.length > 4 || roomNumber.length < 1) {
      return false
    }
    return true
  }

  static validateId(id: string): boolean {
    if (id === null || !id.match(/^[a-zA-Z]\d*$/)) {
      return false
    } else if (typeof id != 'string') {
      return false
    }
    return true
  }

  static validateCapacity(capacity: number): boolean {
    if (capacity === null) {
      return false
    } else if (typeof capacity != 'number') {
      return false
    } else if (capacity < 0) {
      return false
    }
    return true
  }

  get block() {
    return this.props.block
  }

  set block(block: string) {
    if (!Room.validateBlock(block)) {
      throw new EntityError('Invalid block')
    }
    this.props.block = block
  }

  get roomNumber() {
    return this.props.roomNumber
  }

  set roomNumber(roomNumber: string) {
    if (!Room.validateRoomNumber(roomNumber)) {
      throw new EntityError('Invalid roomNumber')
    }
    this.props.roomNumber = roomNumber
  }

  get id() {
    return this.props.id
  }

  set id(id: string) {
    if (!Room.validateId(id)) {
      throw new EntityError('Invalid id')
    }
    this.props.id = id
  }

  get capacity() {
    return this.props.capacity
  }

  set capacity(capacity: number) {
    if (!Room.validateCapacity(capacity)) {
      throw new EntityError('Invalid capacity')
    }
    this.props.capacity = capacity
  }

  static fromJSON(json: JsonProps) {
    return new Room({
      block: json.block,
      roomNumber: json.roomNumber,
      id: json.roomId,
      capacity: json.capacity,
    })
  }

  toJSON() {
    return {
      block: this.props.block,
      roomNumber: this.props.roomNumber,
      roomId: this.props.id,
      capacity: this,
    }
  }
}
