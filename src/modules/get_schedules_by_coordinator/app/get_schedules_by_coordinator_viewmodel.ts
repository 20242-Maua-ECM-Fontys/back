/* eslint-disable @typescript-eslint/no-explicit-any */
import { completeSchedule } from './get_schedules_by_coordinator_usecase'

export class GetSchedulesByCoordinatorViewmodel {
  private message: string
  private schedules: completeSchedule[]

  constructor(schedules: completeSchedule[]) {
    this.message = 'schedules by coordinator returned'
    this.schedules = schedules
  }

  toJSON() {
    const schedulesById = this.schedules.reduce(
      (acc, schedule) => {
        const classesById = schedule.classes.reduce(
          (classAcc, class_) => {
            classAcc[class_.id] = {
              name: class_.name,
              subjectCode: class_.subjectCode,
              modality: class_.modality,
              classType: class_.classType,
              ...(class_.fullfilledData && {
                fullfilledData: class_.fullfilledData,
              }),
            }
            return classAcc
          },
          {} as Record<string, any>,
        )

        const possibilitiesById = schedule.possibilities.reduce(
          (possAcc, possibility) => {
            possAcc[possibility.id] = {
              weekDay: possibility.weekDay,
              startTime: possibility.startTime,
              endTime: possibility.endTime,
            }
            return possAcc
          },
          {} as Record<string, any>,
        )

        acc[schedule.schedule.scheduleId] = {
          academicPeriod: schedule.schedule.academicPeriod,
          courseName: schedule.schedule.courseName,
          groupNumber: schedule.schedule.groupNumber,
          courseGrade: schedule.schedule.courseGrade,
          possibilities: possibilitiesById,
          classes: classesById,
        }
        return acc
      },
      {} as Record<string, any>,
    )

    return {
      message: this.message,
      schedules: schedulesById,
    }
  }
}
