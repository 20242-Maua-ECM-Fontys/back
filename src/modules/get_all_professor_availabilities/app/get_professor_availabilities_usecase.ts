import { Availability } from '../../../shared/domain/entities/availability';
import { IScheduleRepository } from '../../../shared/domain/repositories/schedule_repository_interface';
import { User } from '../../../shared/domain/entities/user';
import { ROLE } from '../../../shared/domain/enums/role_enum';

export type GetProfessorAvailabilityUsecaseReturn = {
    professor: User;
    availabilities: Availability[];
};

export class GetProfessorAvailabilityUsecase {
    constructor(private repo: IScheduleRepository) { }

    async execute(professorId: number): Promise<GetProfessorAvailabilityUsecaseReturn> {
        const professor = await this.repo.getUser(professorId);
        if (!professor || professor.role !== ROLE.PROFESSOR) {
            throw new Error('Professor not found or invalid ID');
        }

        const availabilities: Availability[] = await this.repo.getAvailabilitiesByUserId(professor.id);

        return {
            professor: professor,
            availabilities: availabilities,
        };
    }
}
