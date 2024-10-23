import { Availability } from '../../../shared/domain/entities/availability';
import { IScheduleRepository } from '../../../shared/domain/repositories/schedule_repository_interface';
import { User } from '../../../shared/domain/entities/user';
import { ROLE } from '../../../shared/domain/enums/role_enum';
import { Suitability } from '../../../shared/domain/entities/suitability';

type ProfessorAvailability = {
  professor: User;
  availabilities: Availability[];
  suitabilities: {
    codeSubject: string;
    subjectName: string;
  }[];
}

export class GetAllProfessorsUsecase {
  constructor(private repo: IScheduleRepository) {}

  async execute(): Promise<ProfessorAvailability[]> {
    const professors = await this.repo.getUsersByRole(ROLE.PROFESSOR);
    const response: ProfessorAvailability[] = professors.map((professor) => {
      return {
        professor: professor,
        availabilities: [], 
        suitabilities: [],
      };
    });
  
    for (let i = 0; i < response.length; i++) {
      const professor = response[i].professor;
      
      const availabilities: Availability[] = await this.repo.getAvailabilitiesByUserId(professor.id);
      response[i].availabilities = availabilities;
  
      const suitabilities: Suitability[] = await this.repo.getSuitabilitiesByUserId(professor.id);
      
      for (const suitability of suitabilities) {
        const subject = await this.repo.getSubject(suitability.codeSubject);
        response[i].suitabilities.push({
          codeSubject: suitability.codeSubject,
          subjectName: subject.name, 
        });
      }
    }
  
    return response; 
  }
}
