import { EntityError } from '../../../shared/helpers/errors/domain_errors'
import { WEEK_DAY, toEnum as WeekDayToEnum } from '../enums/week_day_enum'
import {
  MAUA_START_TIME,
  toEnum as StartTimeToEnum,
} from '../enums/maua_start_time_enum'
import {
  MAUA_END_TIME,
  toEnum as EndTimeToEnum,
} from '../enums/maua_end_time_enum'
import { Schedule } from './schedule'

export type PossibilityProps = {
  id: string
  weekDay: WEEK_DAY
  startTime: MAUA_START_TIME
  endTime: MAUA_END_TIME
  scheduleId: string
}

export type JsonProps = {
  possibilityId: string
  weekDay: string
  startTime: number
  endTime: number
  scheduleId: string
}

export class Possibility {
  constructor(public props: PossibilityProps) {
    if (!Possibility.validateId(props.id)) {
      throw new EntityError('props.id')
    }
    this.props.id = props.id

    if (!Possibility.validateWeekDay(props.weekDay as WEEK_DAY)) {
      throw new EntityError('props.weekDay')
    }
    this.props.weekDay = props.weekDay

    if (!Possibility.validateStartEndTime(props.startTime, props.endTime)) {
      throw new EntityError('props.startTime')
    }
    this.props.startTime = props.startTime
    this.props.endTime = props.endTime

    if (!Possibility.validateScheduleId(props.scheduleId)) {
      throw new EntityError('props.scheduleId')
    }
  }

  private static validateId(id: string): boolean {
    if (typeof id !== 'string') {
      return false
    }
    if (id.length !== 36) {
      return false
    }
    return true
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
    if (!(MAUA_START_TIME[startTime] === MAUA_END_TIME[endTime])) {
      return false
    }
    return true
  }

  private static validateScheduleId(scheduleId: string): boolean {
    if (!Schedule.validateScheduleId(scheduleId)) {
      return false
    }
    return true
  }

  static fromJSON(json: JsonProps): Possibility {
    return new Possibility({
      id: json.possibilityId,
      weekDay: WeekDayToEnum(json.weekDay),
      startTime: StartTimeToEnum(json.startTime),
      endTime: EndTimeToEnum(json.endTime),
      scheduleId: json.scheduleId,
    })
  }

  toJSON(): JsonProps {
    return {
      possibilityId: this.props.id,
      weekDay: this.props.weekDay,
      startTime: this.props.startTime,
      endTime: this.props.endTime,
      scheduleId: this.props.scheduleId,
    }
  }

  get id(): string {
    return this.props.id
  }

  get weekDay(): WEEK_DAY {
    return this.props.weekDay
  }

  get startTime(): MAUA_START_TIME {
    return this.props.startTime
  }

  get endTime(): MAUA_END_TIME {
    return this.props.endTime
  }

  get scheduleId(): string {
    return this.props.scheduleId
  }

  set weekDay(weekDay: WEEK_DAY) {
    if (!Possibility.validateWeekDay(weekDay)) {
      throw new EntityError('weekDay')
    }
    this.props.weekDay = weekDay
  }

  set startTime(startTime: MAUA_START_TIME) {
    if (!Possibility.validateStartEndTime(startTime, this.endTime)) {
      throw new EntityError('startTime')
    }
    this.props.startTime = startTime
  }

  set endTime(endTime: MAUA_END_TIME) {
    if (!Possibility.validateStartEndTime(this.startTime, endTime)) {
      throw new EntityError('endTime')
    }
    this.props.endTime = endTime
  }

  set scheduleId(scheduleId: string) {
    if (!Possibility.validateScheduleId(scheduleId)) {
      throw new EntityError('scheduleId')
    }
    this.props.scheduleId = scheduleId
  }
}
