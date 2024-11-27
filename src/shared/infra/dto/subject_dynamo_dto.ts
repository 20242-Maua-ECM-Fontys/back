/* eslint-disable @typescript-eslint/no-explicit-any */
import { Subject } from '../../domain/entities/subject'
import { PERIOD } from '../../domain/enums/period_enum'

type subjectDynamoDTOProps = {
    code: string
    name: string
    period: PERIOD
}

export class SubjectDynamoDTO {
    private code: string
    private name: string
    private period: PERIOD

    constructor(props: subjectDynamoDTOProps) {
        this.code = props.code
        this.name = props.name
        this.period = props.period
    }

    static fromEntity(subject: Subject): SubjectDynamoDTO {
        return new SubjectDynamoDTO({
            code: subject.code,
            name: subject.name,
            period: subject.period,
        })
    }

    toDynamo() {
        return {
            'entity': 'subject',
            'code': this.code,
            'name': this.name,
            'period': this.period,
        }
    }

    static fromDynamo(data: any) {
        const code =
            data['code'] && data['code']['S'] ? data['code']['S'] : null
        const name =
            data['name'] && data['name']['S'] ? data['name']['S'] : null
        const period =
            data['period'] && data['period']['S'] ? data['period']['S'] : null
        return new SubjectDynamoDTO({
            code: code,
            name: name,
            period: period as PERIOD,
        })
    }

    toEntity(): Subject {
        return new Subject({
            code: this.code,
            name: this.name,
            period: this.period,
        })
    }
}
