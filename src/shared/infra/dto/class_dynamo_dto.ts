/* eslint-disable @typescript-eslint/no-explicit-any */
import { Class } from '../../domain/entities/class'
import { MODALITY } from '../../domain/enums/modality_enum'
import { CLASSTYPE } from '../../domain/enums/class_type_enum'

type classDynamoDTOProps = {
    id: string
    name: string
    modality: MODALITY
    classType: CLASSTYPE
    subjectCode: string
    scheduleId: string
}

export class ClassDynamoDTO {
    private id: string
    private name: string
    private modality: MODALITY
    private classType: CLASSTYPE
    private subjectCode: string
    private scheduleId: string

    constructor(props: classDynamoDTOProps) {
        this.id = props.id
        this.name = props.name
        this.modality = props.modality
        this.classType = props.classType
        this.subjectCode = props.subjectCode
        this.scheduleId = props.scheduleId
    }

    static fromEntity(classEntity: Class): ClassDynamoDTO {
        return new ClassDynamoDTO({
            id: classEntity.id,
            name: classEntity.name,
            modality: classEntity.modality,
            classType: classEntity.classType,
            subjectCode: classEntity.subjectCode,
            scheduleId: classEntity.scheduleId,
        })
    }

    toDynamo() {
        return {
            'entity': 'class',
            'id': this.id,
            'name': this.name,
            'modality': this.modality,
            'classType': this.classType,
            'subjectCode': this.subjectCode,
            'scheduleId': this.scheduleId,
        }
    }

    static fromDynamo(data: any) {
        const id = data['id'] && data['id']['S'] ? data['id']['S'] : null
        const name =
            data['name'] && data['name']['S'] ? data['name']['S'] : null
        const modality =
            data['modality'] && data['modality']['S']
                ? data['modality']['S']
                : null
        const classType =
            data['classType'] && data['classType']['S']
                ? data['classType']['S']
                : null
        const subjectCode =
            data['subjectCode'] && data['subjectCode']['S']
                ? data['subjectCode']['S']
                : null
        const scheduleId =
            data['scheduleId'] && data['scheduleId']['S']
                ? data['scheduleId']['S']
                : null
        return new ClassDynamoDTO({
            id: id,
            name: name,
            modality: modality as MODALITY,
            classType: classType as CLASSTYPE,
            subjectCode: subjectCode,
            scheduleId: scheduleId,
        })
    }

    toEntity() {
        return new Class({
            id: this.id,
            name: this.name,
            modality: this.modality,
            classType: this.classType,
            subjectCode: this.subjectCode,
            scheduleId: this.scheduleId,
        })
    }
}
