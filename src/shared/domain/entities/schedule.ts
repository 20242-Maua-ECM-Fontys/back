import { EntityError } from '../../helpers/errors/domain_errors'
import { ACADEMIC_PERIOD, toEnum } from '../enums/academic_period_enum'

export type ScheduleProps = {
  scheduleId: string
  courseName: string
  groupNumber: number
  userId: number
  academicPeriod: ACADEMIC_PERIOD
  courseGrade: number
}

export type JsonProps = {
  scheduleId: string
  courseName: string
  groupNumber: number
  userId: number
  academicPeriod: string
  courseGrade: number
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

    if (!Schedule.validateAcademicPeriod(props.academicPeriod)) {
      throw new EntityError('props.academicPeriod')
    }
    this.props.academicPeriod = props.academicPeriod

    if (!Schedule.validateCourseGrade(props.courseGrade)) {
      throw new EntityError('props.courseGrade')
    }
    this.props.courseGrade = props.courseGrade

    if (parseInt(Schedule.getCourseNameFromScheduleId(this.props.scheduleId)!) != this.props.courseGrade) { // scheduleId must contains the correct courseGrade
      throw new EntityError('props.courseGrade must be equal to courseGrade in scheduleId')
    }
  }

  static fromJSON(json: JsonProps) {
    return new Schedule({
      scheduleId: json.scheduleId,
      courseName: json.courseName,
      groupNumber: json.groupNumber,
      userId: json.userId,
      academicPeriod: toEnum(json.academicPeriod),
      courseGrade: json.courseGrade,
    })
  }

  static getCourseNameFromScheduleId(scheduleId: string): string {
    return scheduleId.charAt(3)
  }

  toJSON() {
    return {
      scheduleId: this.scheduleId,
      courseName: this.courseName,
      groupNumber: this.groupNumber,
      userId: this.userId,
      academicPeriod: this.academicPeriod,
      courseGrade: this.courseGrade,
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

  get academicPeriod() {
    return this.props.academicPeriod
  }

  get courseGrade() {
    return this.props.courseGrade
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

  set academicPeriod(academicPeriod: ACADEMIC_PERIOD) {
    if (!Schedule.validateAcademicPeriod(academicPeriod)) {
      throw new EntityError('academicPeriod')
    }
    this.props.academicPeriod = academicPeriod
  }

  set courseGrade(courseGrade: number) {
    if (!Schedule.validateCourseGrade(courseGrade)) {
      throw new EntityError('courseGrade')
    }
    this.props.courseGrade = courseGrade
  }

  static validateScheduleId(scheduleId: string): boolean {
    const scheduleIdRegex = /^[0-9]+S-.+-[DN][2-6]@[0-9]{4}\(SCS\)$/
    return scheduleId !== undefined && typeof scheduleId === 'string' && scheduleIdRegex.test(scheduleId)
  }

  static validateCourseName(courseName: string): boolean {
    return courseName !== undefined && typeof courseName === 'string' && courseName.length > 0
  }

  static validateGroupNumber(groupNumber: number): boolean {
    return groupNumber !== undefined && typeof groupNumber === 'number' && groupNumber > 0
  }

  static validateUserId(userId: number): boolean {
    return userId != null && typeof userId === 'number' && userId >= 0
  }

  static validateAcademicPeriod(academicPeriod: ACADEMIC_PERIOD): boolean {
    return Object.values(ACADEMIC_PERIOD).includes(academicPeriod)
  }

  static validateCourseGrade(courseGrade: number): boolean {
    return courseGrade >= 1 && courseGrade <= 6
  }
}
