/* eslint-disable @typescript-eslint/no-explicit-any */
import { Availability } from '../../../shared/domain/entities/availability'
import { MAUA_START_TIME } from '../../../shared/domain/enums/maua_start_time_enum'
import { MAUA_END_TIME } from '../../../shared/domain/enums/maua_end_time_enum'
import { WEEK_DAY } from '../../../shared/domain/enums/week_day_enum'

type availabilityDynamoDTOProps = {
    id: string
    userId: string
    startTime: MAUA_START_TIME
    endTime: MAUA_END_TIME
    isTaken: boolean
    weekDay: WEEK_DAY
}

export class AvailabilityDynamoDTO {
    private id: string
    private userId: string
    private startTime: MAUA_START_TIME
    private endTime: MAUA_END_TIME
    private isTaken: boolean
    private weekDay: WEEK_DAY

    constructor(props: availabilityDynamoDTOProps) {
        this.id = props.id
        this.userId = props.userId
        this.startTime = props.startTime
        this.endTime = props.endTime
        this.isTaken = props.isTaken
        this.weekDay = props.weekDay
    }

    static fromEntity(availability: Availability): AvailabilityDynamoDTO {
        return new AvailabilityDynamoDTO({
            id: availability.availabilityId,
            userId: availability.userId.toString(),
            startTime: availability.startTime as MAUA_START_TIME,
            endTime: availability.endTime as MAUA_END_TIME,
            isTaken: availability.isTaken,
            weekDay: availability.weekDay as WEEK_DAY,
        })
    }

    toDynamo() {
        return {
            'entity': 'availability',
            'id': this.id,
            'userId': this.userId,
            'startTime': this.startTime,
            'endTime': this.endTime,
            'isTaken': this.isTaken,
            'weekDay': this.weekDay,
        }
    }

    static fromDynamo(data: any) {
        const id = data['id'] && data['id']['S'] ? data['id']['S'] : null
        const userId =
            data['userId'] && data['userId']['S'] ? data['userId']['S'] : null
        const startTime =
            data['startTime'] && data['startTime']['S']
                ? data['startTime']['S']
                : null
        const endTime =
            data['endTime'] && data['endTime']['S']
                ? data['endTime']['S']
                : null
        const isTaken =
            data['isTaken'] && typeof data['isTaken']['BOOL'] === 'boolean'
                ? data['isTaken']['BOOL']
                : null

        const weekDay =
            data['weekDay'] && data['weekDay']['S']
                ? data['weekDay']['S']
                : null
        return new AvailabilityDynamoDTO({
            id: id,
            userId: userId,
            startTime: startTime as MAUA_START_TIME,
            endTime: endTime as MAUA_END_TIME,
            isTaken: isTaken as boolean,
            weekDay: weekDay as WEEK_DAY,
        })
    }

    toEntity(): Availability {
        return new Availability({
            id: this.id,
            userId: Number(this.userId),
            startTime: this.startTime,
            endTime: this.endTime,
            isTaken: this.isTaken,
            weekDay: this.weekDay,
        })
    }
}
