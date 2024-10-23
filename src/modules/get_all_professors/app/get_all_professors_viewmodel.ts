import { GetAllProfessorsUsecaseReturn } from './get_all_professors_usecase'

export class GetAllProfessorsViewmodel {
  private message: string;
  private professors: GetAllProfessorsUsecaseReturn[];

  constructor(professors: GetAllProfessorsUsecaseReturn[]) {
    this.message = 'professors with his availabilities and suitabilities returned';
    this.professors = professors;
  }

  toJSON() {
    return {
      message: this.message,
      professors: this.professors.reduce((acc, professorData) => {
        const { professor, availabilities, suitabilities } = professorData;

        acc[professor.id] = {
          name: professor.name,
          email: professor.email,
          availabilities: availabilities.map(avail => ({
            startTime: avail.startTime,
            endTime: avail.endTime,
            weekDay: avail.weekDay,
          })),
          suitabilities: suitabilities.map(suitability => ({
            codeSubject: suitability.codeSubject,
            subjectName: suitability.subjectName,
          }))
        };

        return acc;
      }, {} as Record<string, any>)
    };
  }
}

