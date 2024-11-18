import { Possibility } from '../../../shared/domain/entities/possibility';
import { IScheduleRepository } from '../../../shared/domain/repositories/schedule_repository_interface'
import { MAUA_START_TIME, toEnum as startTimeToEnum } from '../../../shared/domain/enums/maua_start_time_enum';
import { MAUA_END_TIME, toEnum as endTimeToEnum } from '../../../shared/domain/enums/maua_end_time_enum';
import { toEnum as weekDayToEnum } from '../../../shared/domain/enums/week_day_enum';
import { v4 as uuidv4 } from 'uuid'
import { InvalidMauaTime } from '../../../shared/helpers/errors/usecase_errors';

export type DateUsecaseParam = {
  notEarlier: MAUA_START_TIME
  notLater: MAUA_END_TIME
}
export type DatesUsecaseParam = Record<string, DateUsecaseParam>

export class CreatePossibilitiesUsecase {
    constructor(private repo: IScheduleRepository) {}
  
    async execute(scheduleId: string, dates: DatesUsecaseParam): Promise<boolean> {
      
      // check if schedule exists
      await this.repo.getSchedule(scheduleId, 1)
  
      // create arrays to use in the logic
      const startTimes = Object.values(MAUA_START_TIME).filter((value) => typeof value === 'number') as number[]
      const endTimes =  Object.values(MAUA_END_TIME).filter((value) => typeof value === 'number') as number[]
      
      // create a list of possibilities
      const possibilities: Possibility[] = []

      // create possibilities
      for (const [dateKey, date] of Object.entries(dates) as [keyof DatesUsecaseParam, DateUsecaseParam][]) {
        if (date.notEarlier >= date.notLater) {
          throw new InvalidMauaTime(`notEarlier "${date.notEarlier}" must be earlier than notLater "${date.notLater}"`)
        }
        const startTimeIndex = startTimes.indexOf(date.notEarlier) 
        const endTimeIndex = endTimes.indexOf(date.notLater) 
        const dayOfWeek = weekDayToEnum(dateKey) // create validation of end time on controller (and upper() as well)
        for (let i = startTimeIndex; i <= endTimeIndex; i++) {
          possibilities.push(new Possibility({
            id: uuidv4(),
            weekDay: dayOfWeek,
            startTime: startTimeToEnum(startTimes[i]),
            endTime: endTimeToEnum(endTimes[i]),
            scheduleId: scheduleId,
          }))
        }
      }

      // save possibilities on database
      for (const possibility of possibilities) {
        await this.repo.createPossibility(possibility)
      }

      return true
  
    }
  }