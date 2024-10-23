import { IScheduleRepository } from '../../../shared/domain/repositories/schedule_repository_interface'

export class UploadCSVUsecase {
  constructor(private repo: IScheduleRepository) {}

  async execute(): Promise<string> {
  }
}
