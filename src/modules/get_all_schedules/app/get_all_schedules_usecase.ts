
import { Schedule } from '../../../shared/domain/entities/schedule'
import { IScheduleRepository } from '../../../shared/domain/repositories/schedule_repository_interface'


export class GetAllSchedulesUsecase {
  constructor(private repo: IScheduleRepository) {}

  async execute(): Promise<Schedule[]> {
    return this.repo.getAllSchedules()
  }
}
