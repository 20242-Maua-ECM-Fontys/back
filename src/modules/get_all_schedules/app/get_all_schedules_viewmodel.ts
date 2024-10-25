import { Schedule } from '../../../shared/domain/entities/schedule';

export class GetAllSchedulesViewModel {
  private message: string;
  private courses: Record<string, { scheduleId: string; courseGrade: number; schedulePeriod: string }[]>;

  constructor(schedules: Schedule[]) {
    this.message = 'schedules returned';

    this.courses = schedules.reduce((result, schedule) => {
      const period = schedule.academicPeriod; 
      if (!result[schedule.courseName]) {
        result[schedule.courseName] = [];
      }

      result[schedule.courseName].push({
        scheduleId: schedule.scheduleId,
        courseGrade: schedule.courseGrade,
        schedulePeriod: period,
      });

      return result;
    }, {} as Record<string, { scheduleId: string; courseGrade: number; schedulePeriod: string }[]>);
  }

  toJSON() {
    return {
      message: this.message,
      courses: this.courses,
    };
  }
}
