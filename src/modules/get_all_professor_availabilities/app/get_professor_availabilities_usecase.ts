import { Availability } from '../../../shared/domain/entities/availability';
import { IScheduleRepository } from '../../../shared/domain/repositories/schedule_repository_interface';
import { User } from '../../../shared/domain/entities/user';
import { ROLE } from '../../../shared/domain/enums/role_enum';
import { InvalidRole } from '../../../shared/helpers/errors/usecase_errors';
import { EntityError } from '../../../shared/helpers/errors/domain_errors';



export class GetProfessorAvailabilityUsecase {
    constructor(private repo: IScheduleRepository) { }

    async execute(professorId: number): Promise<Availability[]> {
        if(!User.validateId(professorId)){
            throw new EntityError('userId')      
        }
        const professor = await this.repo.getUser(professorId);

        if (professor.role === ROLE.STAFF) {
            throw new InvalidRole(ROLE.PROFESSOR, professor.role);
        }
        
        const availabilities = await this.repo.getAvailabilitiesByUserId(professor.id);

        return availabilities;
    }
}       
