import { completeSchedule } from './get_schedules_by_coordinator_usecase'

export class GetSchedulesByCoordinatorViewmodel {
  private message: string
  private schedules: completeSchedule[]

  constructor(schedules: completeSchedule[]) {
    this.message = 'schedules by coordinator returned'
    this.schedules = schedules
  }

  toJSON() {
    return {
      message: this.message,
      schedules: this.schedules.map((schedule) => ({
        schedule: {
          id: schedule.schedule.scheduleId,
          userId: schedule.schedule.userId,
          courseName: schedule.schedule.courseName,
          groupNumber: schedule.schedule.groupNumber,
          academicPeriod: schedule.schedule.academicPeriod,
          courseGrade: schedule.schedule.courseGrade,
          classes: schedule.classes.map((class_) => ({
            id: class_.id,
            name: class_.name,
            modality: class_.modality,
            classType: class_.classType,
            subjectCode: class_.subjectCode,
            scheduleId: class_.scheduleId,
          })),
          possibilities: schedule.possibilities.map((possibility) => ({
            id: possibility.id,
            weekDay: possibility.weekDay,
            startTime: possibility.startTime,
            endTime: possibility.endTime,
            scheduleId: possibility.scheduleId,
          })),
        },
      })),
    }
  }
}
