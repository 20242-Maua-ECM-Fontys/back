/* eslint-disable @typescript-eslint/no-explicit-any */
import { AvFullfilled } from '../../domain/entities/avFullfilled'

type avFullfilledDynamoDTOProps = {
    availabilityId: string
    possibilityId: string
    classId: string
    roomCode?: string
}

export class AvFullfilledDynamoDTO {
    private availabilityId: string
    private possibilityId: string
    private classId: string
    private roomCode?: string

    constructor(props: avFullfilledDynamoDTOProps) {
        this.availabilityId = props.availabilityId
        this.possibilityId = props.possibilityId
        this.classId = props.classId
        this.roomCode = props.roomCode
    }

    static fromEntity(avFullfilled: AvFullfilled): AvFullfilledDynamoDTO {
        return new AvFullfilledDynamoDTO({
            availabilityId: avFullfilled.availabilityId,
            possibilityId: avFullfilled.possibilityId,
            classId: avFullfilled.classId,
            roomCode: avFullfilled.roomCode,
        })
    }

    toDynamo() {
        return {
            'entity': 'avFullfilled',
            'availabilityId': this.availabilityId,
            'possibilityId': this.possibilityId,
            'classId': this.classId,
            'roomCode': this.roomCode,
        }
    }

    static fromDynamo(data: any) {
        const availabilityId =
            data['availabilityId'] && data['availabilityId']['S'] ? data['availabilityId']['S'] : null
        const possibilityId = data['possibilityId'] && data['possibilityId']['S'] ? data['possibilityId']['S'] : null
        const classId = data['classId'] && data['classId']['S'] ? data['classId']['S'] : null
        const roomCode = data['roomCode'] && data['roomCode']['S'] ? data['roomCode']['S'] : null
        return new AvFullfilledDynamoDTO({
            availabilityId: availabilityId,
            possibilityId: possibilityId,
            classId: classId,
            roomCode: roomCode,
        })
    }

    toEntity(): AvFullfilled {
        return new AvFullfilled({
            availabilityId: this.availabilityId,
            possibilityId: this.possibilityId,
            classId: this.classId,
            roomCode: this.roomCode,
        })
    }
}
