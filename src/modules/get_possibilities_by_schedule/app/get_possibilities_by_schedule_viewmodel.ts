import { Possibility } from '../../../shared/domain/entities/possibility'

export class GetPossibilitiesByScheduleViewmodel {
  private message: string
  private possibilities: Possibility[]

  constructor(possibilities: Possibility[]) {
    this.message = 'possibilities by schedule returned'
    this.possibilities = possibilities
  }

  toJSON() {
    return {
      message: this.message,
      possibilities: this.possibilities.map((possibility) => ({
        id: possibility.id,
        weekDay: possibility.weekDay,
        startTime: possibility.startTime,
        endTime: possibility.endTime,
        scheduleId: possibility.scheduleId,
      })),
    }
  }
}
