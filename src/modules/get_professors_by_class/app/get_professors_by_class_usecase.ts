
import { IScheduleRepository } from '../../../shared/domain/repositories/schedule_repository_interface';
import { NoItemsFound } from '../../../shared/helpers/errors/usecase_errors'

export class GetProfessorsByClassUsecase {
  constructor(private repo: IScheduleRepository) {}

  async execute(classId: string) {
    const professors = await this.repo.getProfessorsByClass(classId);
    if (!professors.length) {
      throw new NoItemsFound('classId');
    }
    return professors;
  }
}
