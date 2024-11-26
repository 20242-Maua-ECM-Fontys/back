/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suitability } from '../../domain/entities/suitability'

type suitabilityDynamoDTOProps = {
    userId: string
    codeSubject: string
}

export class SuitabilityDynamoDTO {
    private userId: string
    private codeSubject: string

    constructor(props: suitabilityDynamoDTOProps) {
        this.userId = props.userId
        this.codeSubject = props.codeSubject
    }

    static fromEntity(suitability: Suitability): SuitabilityDynamoDTO {
        return new SuitabilityDynamoDTO({
            userId: suitability.userId.toString(),
            codeSubject: suitability.codeSubject,
        })
    }

    toDynamo() {
        return {
            'entity': 'suitability',
            'userId': this.userId,
            'codeSubject': this.codeSubject,
        }
    }

    static fromDynamo(data: any) {
        const userId =
            data['userId'] && data['userId']['S'] ? data['userId']['S'] : null
        const codeSubject =
            data['codeSubject'] && data['codeSubject']['S']
                ? data['codeSubject']['S']
                : null
        return new SuitabilityDynamoDTO({
            userId: userId,
            codeSubject: codeSubject,
        })
    }

    toEntity() {
        return new Suitability({
            userId: parseInt(this.userId),
            codeSubject: this.codeSubject,
        })
    }
}
