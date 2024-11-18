import { GetProfessorByClassUsecaseResponse } from './get_professors_by_class_usecase';

export class GetProfessorsByClassViewmodel {
  private professors: GetProfessorByClassUsecaseResponse[];

  constructor(professorsData: GetProfessorByClassUsecaseResponse[]) {
    this.professors = professorsData;
  }

  toJSON() {
    return {
      message: "professors by class returned",
      professors: this.professors.reduce((result, professor) => {
        result[professor.id] = {
          name: professor.name,
          email: professor.email,
          RA: professor.RA,
          availabilities: professor.availabilities.reduce((availabilitiesMap, availability) => {
            availabilitiesMap[availability.availabilityId] = {
              weekDay: availability.weekDay,
              startTime: availability.startTime,
              endTime: availability.endTime,
              isTaken: availability.isTaken,
            };
            return availabilitiesMap;
          }, {} as { [availabilityId: string]: { weekDay: string; startTime: number; endTime: number; isTaken: boolean } }),
        };
        return result;
      }, {} as { [userId: string]: { name: string; email: string; RA: string; availabilities: { [availabilityId: string]: { weekDay: string; startTime: number; endTime: number; isTaken: boolean } } } }),
    };
  }
}
