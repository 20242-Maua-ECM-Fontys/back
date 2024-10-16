import {
  MAUA_START_TIME,
  toEnum as StartTimeToEnum,
} from '../enums/maua_start_time_enum'
import {
  MAUA_END_TIME,
  toEnum as EndTimeToEnum,
} from '../enums/maua_end_time_enum'
import { WEEK_DAY, toEnum as WeekDayToEnum } from '../enums/week_day_enum'
import { EntityError } from '../../helpers/errors/domain_errors'
import { User } from './user'

export type AvailabilityProps = {
  id: string
  userId: number
  startTime: MAUA_START_TIME
  endTime: MAUA_END_TIME
  isTaken: boolean
  weekDay: WEEK_DAY
}

export type JsonProps = {
  availabilityId: string
  userId: number
  startTime: MAUA_START_TIME
  endTime: MAUA_END_TIME
  isTaken: boolean
  weekDay: WEEK_DAY
}

const AVAILABILITY_ID_LENGTH = 36

export class Availability {
  constructor(public props: AvailabilityProps) {
    if (!Availability.validateAvailabilityId(props.id)) {
      throw new EntityError('id')
    }
    this.props.id = props.id

    if (!Availability.validateUserId(props.userId)) {
      throw new EntityError('userId')
    }
    this.props.userId = props.userId

    if (!Availability.validateStartEndTime(props.startTime, props.endTime)) {
      throw new EntityError('startTime')
    }
    this.props.startTime = props.startTime
    this.props.endTime = props.endTime

    if (!Availability.validateIsTaken(props.isTaken)) {
      throw new EntityError('isTaken')
    }
    this.props.isTaken = props.isTaken

    if (!Availability.validateWeekDay(props.weekDay)) {
      throw new EntityError('weekDay')
    }
    this.props.weekDay = props.weekDay
  }

  static validateAvailabilityId(id: string): boolean {
    if (id === null) {
      return false
    }
    if (id.length !== AVAILABILITY_ID_LENGTH) {
      return false
    }
    return true
  }

  static validateUserId(id: number): boolean {
    return User.validateId(id)
  }

  private static validateWeekDay(weekDay: WEEK_DAY): boolean {
    return Object.values(WEEK_DAY).includes(weekDay)
  }

  private static validateStartEndTime(
    startTime: MAUA_START_TIME,
    endTime: MAUA_END_TIME,
  ): boolean {
    if (!Object.values(MAUA_START_TIME).includes(startTime)) {
      return false
    }
    if (!Object.values(MAUA_END_TIME).includes(endTime)) {
      return false
    }
    if (startTime >= endTime) {
      return false
    }
    if (!(MAUA_START_TIME[startTime] === MAUA_END_TIME[endTime])) {
      return false
    }
    return true
  }

  private static validateIsTaken(isTaken: boolean): boolean {
    return typeof isTaken === 'boolean'
  }

  static fromJSON(json: JsonProps) {
    return new Availability({
      id: json.availabilityId,
      userId: json.userId,
      startTime: StartTimeToEnum(json.startTime),
      endTime: EndTimeToEnum(json.endTime),
      isTaken: json.isTaken,
      weekDay: WeekDayToEnum(json.weekDay),
    })
  }

  toJSON() {
    return {
      availabilityId: this.props.id,
      userId: this.props.userId,
      startTime: MAUA_START_TIME[this.props.startTime],
      endTime: MAUA_END_TIME[this.props.endTime],
      isTaken: this.props.isTaken,
      weekDay: WEEK_DAY[this.props.weekDay],
    }
  }

  get availabilityId(): string {
    return this.props.id
  }

  get userId(): string {
    return this.props.userId
  }

  get startTime(): MAUA_START_TIME {
    return this.props.startTime
  }

  get endTime(): MAUA_END_TIME {
    return this.props.endTime
  }

  get isTaken(): boolean {
    return this.props.isTaken
  }

  get weekDay(): WEEK_DAY {
    return this.props.weekDay
  }

  set availabilityId(id: string) {
    if (!Availability.validateAvailabilityId(id)) {
      throw new EntityError('availabilityId')
    }
    this.props.id = id
  }

  set userId(userId: string) {
    if (!Availability.validateUserId(userId)) {
      throw new EntityError('userId')
    }
    this.props.userId = userId
  }

  set startTime(startTime: MAUA_START_TIME) {
    if (!Availability.validateStartEndTime(startTime, this.props.endTime)) {
      throw new EntityError('startTime')
    }
    this.props.startTime = startTime
  }

  set endTime(endTime: MAUA_END_TIME) {
    if (!Availability.validateStartEndTime(this.props.startTime, endTime)) {
      throw new EntityError('endTime')
    }
    this.props.endTime = endTime
  }

  set isTaken(isTaken: boolean) {
    if (!Availability.validateIsTaken(isTaken)) {
      throw new EntityError('isTaken')
    }
    this.props.isTaken = isTaken
  }

  set weekDay(weekDay: WEEK_DAY) {
    if (!Availability.validateWeekDay(weekDay)) {
      throw new EntityError('weekDay')
    }
    this.props.weekDay = weekDay
  }
}
