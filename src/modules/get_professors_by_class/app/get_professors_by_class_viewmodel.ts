import { MAUA_START_TIME } from '../../../shared/domain/enums/maua_start_time_enum';
import { MAUA_END_TIME } from '../../../shared/domain/enums/maua_end_time_enum';
import { WEEK_DAY } from '../../../shared/domain/enums/week_day_enum';

interface AvailabilityInfo {

  weekDay: WEEK_DAY;
  startTime: MAUA_START_TIME;
  endTime: MAUA_END_TIME;
  isTaken: boolean;
}

interface ProfessorInfo {
  id: string;
  name: string;
  email: string;
  RA: string;
  availabilities: AvailabilityInfo[]; // Mantém como array de AvailabilityInfo
}

export class GetProfessorsByClassViewmodel {
  private professors: { [userId: string]: Omit<ProfessorInfo, 'id' | 'availabilities'> & { availabilities: AvailabilityInfo[] } };

  constructor(professorsData: ProfessorInfo[]) {
    this.professors = {};

    professorsData.forEach(professor => {
      // Adiciona cada professor e suas disponibilidades diretamente como um array
      this.professors[professor.id] = {
        name: professor.name,
        email: professor.email,
        RA: professor.RA,
        availabilities: professor.availabilities.map((availability: AvailabilityInfo) => ({
         
          weekDay: availability.weekDay,
          startTime: availability.startTime,
          endTime: availability.endTime,
          isTaken: availability.isTaken,
        })),
      };
    });
  }

  toJSON(): { message: string; data: { [userId: string]: Omit<ProfessorInfo, 'id'> & { availabilities: AvailabilityInfo[] } } } {
    return {
      message: "professors by class returned",
      data: this.professors,
    };
  }
}
