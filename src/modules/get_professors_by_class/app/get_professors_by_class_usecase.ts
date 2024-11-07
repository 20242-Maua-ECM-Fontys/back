import { IScheduleRepository } from '../../../shared/domain/repositories/schedule_repository_interface';
import { NoItemsFound } from '../../../../src/shared/helpers/errors/repo_error';
import { User } from '../../../shared/domain/entities/user';
import { Availability } from '../../../shared/domain/entities/availability';

export class GetProfessorsByClassUsecase {
  constructor(private repo: IScheduleRepository) {}

  async execute(classId: string) {
    const professors = await this.repo.getProfessorsByClass(classId);
    
    if (!professors ) {
      throw new NoItemsFound('No items found for classId');
    }
    const uniqueProfessors = professors.filter(
      (professor, index, self) =>
        index === self.findIndex((p) => p.id === professor.id)
    );

    const professorsWithAvailabilities = await Promise.all(
      uniqueProfessors.map(async (professor: User) => {
        const availabilities = await this.repo.getAvailabilitiesByUserId(professor.id);
        return { ...professor, availabilities };
      })
    );

    return professorsWithAvailabilities;
  }
}
