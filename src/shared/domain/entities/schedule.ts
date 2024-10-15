import { EntityError } from '../../helpers/errors/domain_errors'

export type ScheduleProps = {
  scheduleId: string
  courseName: string
  groupNumber: number
  userId: number
}

export type JsonProps = {
  scheduleId: string
  courseName: string
  groupNumber: number
  userId: number
}

export class Schedule {
  constructor(public props: ScheduleProps) {
    if (!Schedule.validateScheduleId(props.scheduleId)) {
      throw new EntityError('props.scheduleId')
    }
    this.props.scheduleId = props.scheduleId

    if (!Schedule.validateCourseName(props.courseName)) {
      throw new EntityError('props.courseName')
    }
    this.props.courseName = props.courseName

    if (!Schedule.validateGroupNumber(props.groupNumber)) {
      throw new EntityError('props.groupNumber')
    }
    this.props.groupNumber = props.groupNumber

    if (!Schedule.validateUserId(props.userId)) {
      throw new EntityError('props.userId')
    }
    this.props.userId = props.userId
  }

  static fromJSON(json: JsonProps) {
    return new Schedule({
      scheduleId: json.scheduleId,
      courseName: json.courseName,
      groupNumber: json.groupNumber,
      userId: json.userId,
    })
  }

  toJSON() {
    return {
      scheduleId: this.scheduleId,
      courseName: this.courseName,
      groupNumber: this.groupNumber,
      userId: this.userId,
    }
  }

  get scheduleId() {
    return this.props.scheduleId
  }

  get courseName() {
    return this.props.courseName
  }

  get groupNumber() {
    return this.props.groupNumber
  }

  get userId() {
    return this.props.userId
  }

  set scheduleId(scheduleId: string) {
    if (!Schedule.validateScheduleId(scheduleId)) {
      throw new EntityError('scheduleId')
    }
    this.props.scheduleId = scheduleId
  }

  set courseName(courseName: string) {
    if (!Schedule.validateCourseName(courseName)) {
      throw new EntityError('courseName')
    }
    this.props.courseName = courseName
  }

  set groupNumber(groupNumber: number) {
    if (!Schedule.validateGroupNumber(groupNumber)) {
      throw new EntityError('groupNumber')
    }
    this.props.groupNumber = groupNumber
  }

  set userId(userId: number) {
    if (!Schedule.validateUserId(userId)) {
      throw new EntityError('userId')
    }
    this.props.userId = userId
  }

  static validateScheduleId(scheduleId: string): boolean {
    if (scheduleId === undefined) {
      return false;
    }
    if (typeof scheduleId !== 'string') {
      return false;
    }
  
    const scheduleIdRegex = /^[0-9]+S-.+-[DN][2-6]@[0-9]{4}\(SCS\)$/;
  
    if (!scheduleIdRegex.test(scheduleId)) {
      return false;
    }
  
    return true;
  }
  

  static validateCourseName(courseName: string) {
    if (courseName === undefined) {
      return false
    }
    if (typeof courseName !== 'string') {
      return false
    }
    if (courseName.length < 1) {
      return false
    }
    return true
  }

  static validateGroupNumber(groupNumber: number) {
    if (groupNumber === undefined) {
      return false
    }
    if (typeof groupNumber !== 'number') {
      return false
    }
    if (groupNumber <= 0) {
      return false
    }
    return true
  }

  static validateUserId(userId: number) {
    return userId != null && typeof userId === 'number' && userId >= 0
  }

}
