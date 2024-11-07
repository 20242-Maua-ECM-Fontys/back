import { IScheduleRepository } from '../../../shared/domain/repositories/schedule_repository_interface';
import { NoItemsFound } from '../../../../src/shared/helpers/errors/repo_error';
import { User } from '../../../shared/domain/entities/user';
import { Availability } from '../../../shared/domain/entities/availability';

export type GetProfessorByClassUsecaseResponse = {
  id: string;
  name: string;
  email: string;
  RA: string;
  availabilities: Availability[];
};

export class GetProfessorsByClassUsecase {
  constructor(private repo: IScheduleRepository) {}

  async execute(classId: string): Promise<GetProfessorByClassUsecaseResponse[]> {
    const professors = await this.repo.getProfessorsByClass(classId);

    if (!professors) {
      throw new NoItemsFound(`No professors found for classId: ${classId}`);
    }


    const uniqueProfessors = professors.filter(
      (professor, index, self) =>
        index === self.findIndex((p) => p.id === professor.id)
    );


    const professorsWithAvailabilities = await Promise.all(
      uniqueProfessors.map(async (professor: User) => ({
        id: professor.props.id.toString(),
        name: professor.props.name,
        email: professor.props.email,
        RA: professor.props.RA,
        availabilities: await this.repo.getAvailabilitiesByUserId(professor.id),
      }))
    );

    return professorsWithAvailabilities;
  }
}
