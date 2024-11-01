import { GetProfessorAvailabilityUsecaseReturn } from './get_professor_availabilities_usecase';

export class GetProfessorAvailabilitiesViewmodel {
    private message: string;
    private availabilities: {
        id: string;
        userId: number;
        isTaken: boolean;
        startTime: number;
        endTime: number;
        weekDay: string;
    }[];

    constructor(professorData: GetProfessorAvailabilityUsecaseReturn) {
        this.message = 'availabilities by professor returned';

        // Map the professor's availabilities to the desired format
        this.availabilities = professorData.availabilities.map(avail => ({
            id: avail.id,
            userId: professorData.professor.id,
            isTaken: avail.isTaken,
            startTime: avail.startTime,
            endTime: avail.endTime,
            weekDay: avail.weekDay
        }));
    }

    toJSON() {
        return {
            message: this.message,
            availabilities: this.availabilities
        };
    }
}
