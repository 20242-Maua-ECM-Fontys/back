/* eslint-disable @typescript-eslint/no-explicit-any */
import { Possibility } from '../../domain/entities/possibility'
import { WEEK_DAY } from '../../domain/enums/week_day_enum'
import { MAUA_START_TIME } from '../../domain/enums/maua_start_time_enum'
import { MAUA_END_TIME } from '../../domain/enums/maua_end_time_enum'

type PossibilityDynamoDTOProps = {
    id: string
    weekDay: WEEK_DAY
    startTime: MAUA_START_TIME
    endTime: MAUA_END_TIME
    scheduleId: string
}

export class PossibilityDynamoDTO {
    private id: string
    private weekDay: WEEK_DAY
    private startTime: MAUA_START_TIME
    private endTime: MAUA_END_TIME
    private scheduleId: string

    constructor(props: PossibilityDynamoDTOProps) {
        this.id = props.id
        this.weekDay = props.weekDay
        this.startTime = props.startTime
        this.endTime = props.endTime
        this.scheduleId = props.scheduleId
    }

    static fromEntity(possibility: Possibility): PossibilityDynamoDTO {
        return new PossibilityDynamoDTO({
            id: possibility.id,
            weekDay: possibility.weekDay,
            startTime: possibility.startTime,
            endTime: possibility.endTime,
            scheduleId: possibility.scheduleId,
        })
    }

    toDynamo() {
        return {
            'entity': 'possibility',
            'id': this.id,
            'weekDay': this.weekDay,
            'startTime': this.startTime,
            'endTime': this.endTime,
            'scheduleId': this.scheduleId,
        }
    }

    static fromDynamo(data: any): PossibilityDynamoDTO {
        const id = data['id'] && data['id']['S'] ? data['id']['S'] : null
        const weekDay =
            data['weekDay'] && data['weekDay']['S']
                ? data['weekDay']['S']
                : null
        const startTime =
            data['startTime'] && data['startTime']['N']
                ? Number(data['startTime']['N'])
                : null
        const endTime =
            data['endTime'] && data['endTime']['N']
                ? Number(data['endTime']['N'])
                : null
        const scheduleId =
            data['scheduleId'] && data['scheduleId']['S']
                ? data['scheduleId']['S']
                : null

        return new PossibilityDynamoDTO({
            id: id,
            weekDay: weekDay as WEEK_DAY,
            startTime: startTime as MAUA_START_TIME,
            endTime: endTime as MAUA_END_TIME,
            scheduleId: scheduleId,
        })
    }

    toEntity(): Possibility {
        return new Possibility({
            id: this.id,
            weekDay: this.weekDay,
            startTime: this.startTime,
            endTime: this.endTime,
            scheduleId: this.scheduleId,
        })
    }
}
