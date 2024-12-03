/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schedule } from '../../domain/entities/schedule'
import { ACADEMIC_PERIOD } from '../../domain/enums/academic_period_enum'

type scheduleDynamoDTOProps = {
    scheduleId: string
    courseName: string
    groupNumber: string
    userId: string
    academicPeriod: ACADEMIC_PERIOD
    courseGrade: number
}

export class ScheduleDynamoDTO {
    private scheduleId: string
    private courseName: string
    private groupNumber: string
    private userId: string
    private academicPeriod: ACADEMIC_PERIOD
    private courseGrade: number

    constructor(props: scheduleDynamoDTOProps) {
        this.scheduleId = props.scheduleId
        this.courseName = props.courseName
        this.groupNumber = props.groupNumber
        this.userId = props.userId
        this.academicPeriod = props.academicPeriod
        this.courseGrade = props.courseGrade
    }

    static fromEntity(schedule: Schedule): ScheduleDynamoDTO {
        return new ScheduleDynamoDTO({
            scheduleId: schedule.scheduleId,
            courseName: schedule.courseName,
            groupNumber: schedule.groupNumber.toString(),
            userId: schedule.userId.toString(),
            academicPeriod: schedule.academicPeriod,
            courseGrade: schedule.courseGrade,
        })
    }

    toDynamo() {
        return {
            'entity': 'schedule',
            'scheduleId': this.scheduleId,
            'courseName': this.courseName,
            'groupNumber': this.groupNumber,
            'userId': this.userId,
            'academicPeriod': this.academicPeriod,
            'courseGrade': this.courseGrade,
        }
    }

    static fromDynamo(data: any) {
        const scheduleId =
            data['scheduleId'] && data['scheduleId']['S']
                ? data['scheduleId']['S']
                : null
        const courseName =
            data['courseName'] && data['courseName']['S']
                ? data['courseName']['S']
                : null
        const groupNumber =
            data['groupNumber'] && data['groupNumber']['S']
                ? data['groupNumber']['S']
                : null
        const userId =
            data['userId'] && data['userId']['S'] ? data['userId']['S'] : null
        const academicPeriod =
            data['academicPeriod'] && data['academicPeriod']['S']
                ? data['academicPeriod']['S']
                : null
        const courseGrade =
            data['courseGrade'] && data['courseGrade']['N']
                ? parseInt(data['courseGrade']['N'])
                : null
        return new ScheduleDynamoDTO({
            scheduleId: scheduleId,
            courseName: courseName,
            groupNumber: groupNumber,
            userId: userId,
            academicPeriod: academicPeriod as ACADEMIC_PERIOD,
            courseGrade: courseGrade !== null ? courseGrade : 0,
        })
    }

    toEntity() {
        return new Schedule({
            scheduleId: this.scheduleId,
            courseName: this.courseName,
            groupNumber: parseInt(this.groupNumber),
            userId: parseInt(this.userId),
            academicPeriod: this.academicPeriod,
            courseGrade: this.courseGrade,
        })
    }
}
