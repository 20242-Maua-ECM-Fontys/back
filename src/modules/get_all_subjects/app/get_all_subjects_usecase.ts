
import { Subject } from '../../../shared/domain/entities/subject'
import { IScheduleRepository } from '../../../shared/domain/repositories/schedule_repository_interface'


export class GetAllSubjectsUsecase {
  constructor(private repo: IScheduleRepository) {}

  async execute(): Promise<Subject[]> {
    return this.repo.getAllSubjects()
  }
}
