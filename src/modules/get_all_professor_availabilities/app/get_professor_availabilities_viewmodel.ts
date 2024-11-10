import { Availability } from '../../../shared/domain/entities/availability';

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

    constructor(availabilities: Availability[]) {
        this.message = 'availabilities by professor returned';

        // Map the professor's availabilities to the desired format
        this.availabilities = availabilities.map(avail => ({
            id: avail.availabilityId,
            userId: avail.userId,
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
