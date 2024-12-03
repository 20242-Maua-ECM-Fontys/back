import { describe, it, expect } from 'vitest'
import { ClassDynamoDTO } from '../../../../src/shared/infra/dto/class_dynamo_dto'
import { MODALITY } from '../../../../src/shared/domain/enums/modality_enum'
import { CLASSTYPE } from '../../../../src/shared/domain/enums/class_type_enum'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'

describe('Assert Class Dynamo DTO is correct at all', () => {
    it('Should get class dto correctly', async () => {
        const repo = new ScheduleRepositoryMock()
        const classRepo = await repo.getClass(
            '0a8c5357-1f07-5b24-9845-9318c47ab923',
        )
        const expectedDto = new ClassDynamoDTO({
            id: classRepo?.id,
            name: classRepo?.name,
            modality: classRepo?.modality as MODALITY,
            classType: classRepo?.classType as CLASSTYPE,
            subjectCode: classRepo?.subjectCode,
            scheduleId: classRepo?.scheduleId,
        })

        const fromEntity = ClassDynamoDTO.fromEntity(classRepo)

        expect(fromEntity).toEqual(expectedDto)
    })
    it('Should get a to dynamo dto correctly', async () => {
        const repo = new ScheduleRepositoryMock()
        const classRepo = await repo.getClass(
            '0a8c5357-1f07-5b24-9845-9318c47ab923',
        )
        const classDto = new ClassDynamoDTO({
            id: classRepo?.id,
            name: classRepo?.name,
            modality: classRepo?.modality as MODALITY,
            classType: classRepo?.classType as CLASSTYPE,
            subjectCode: classRepo?.subjectCode,
            scheduleId: classRepo?.scheduleId,
        })
        const classDynamo = classDto.toDynamo()
        const expectedDynamo = {
            'entity': 'class',
            'id': classRepo?.id,
            'name': classRepo?.name,
            'modality': classRepo?.modality,
            'classType': classRepo?.classType,
            'subjectCode': classRepo?.subjectCode,
            'scheduleId': classRepo?.scheduleId,
        }

        expect(classDynamo).toEqual(expectedDynamo)
    })
    it('Should get a correctly class from dynamo dto', async () => {
        const dynamo_dict = {
            'Item': {
                'id': { 'S': '0a8c5357-1f07-5b24-9845-9318c47ab923' },
                'name': { 'S': 'Linguagens de Programacao II' },
                'modality': { 'S': 'IN_PERSON' },
                'classType': { 'S': 'THEORY' },
                'subjectCode': { 'S': 'ECM256' },
                'scheduleId': { 'S': '1S-2CIC-D4@2024(SCS)' },
                'PK': { 'S': 'class' },
                'SK': {
                    'S': '0a8c5357-1f07-5b24-9845-9318c47ab923#1S-2CIC-D4@2024(SCS))',
                },
            },
            'ResponseMetadata': {
                'RequestId': 'aa6a5e5e-943f-4452-8c1f-4e5441ee6042',
                'HTTPStatusCode': 200,
                'HTTPHeaders': {
                    'date': 'Fri, 16 Dec 2022 15:40:29 GMT',
                    'content-type': 'application/x-amz-json-1.0',
                    'x-amz-crc32': '3909675734',
                    'x-amzn-requestid': 'aa6a5e5e-943f-4452-8c1f-4e5441ee6042',
                    'content-length': '174',
                    'server': 'Jetty(9.4.48.v20220622)',
                },
                'RetryAttempts': 0,
            },
        }

        const class_ = ClassDynamoDTO.fromDynamo(dynamo_dict['Item'])
        const expectedClass = new ClassDynamoDTO({
            id: '0a8c5357-1f07-5b24-9845-9318c47ab923',
            name: 'Linguagens de Programacao II',
            modality: MODALITY.IN_PERSON,
            classType: CLASSTYPE.THEORY,
            subjectCode: 'ECM256',
            scheduleId: '1S-2CIC-D4@2024(SCS)',
        })

        expect(class_).toEqual(expectedClass)
    })
    it('Should get a correctly to entity', async () => {
        const repo = new ScheduleRepositoryMock()
        const classRepo = await repo.getClass(
            '0a8c5357-1f07-5b24-9845-9318c47ab923',
        )
        const classDto = new ClassDynamoDTO({
            id: classRepo?.id,
            name: classRepo?.name,
            modality: classRepo?.modality as MODALITY,
            classType: classRepo?.classType as CLASSTYPE,
            subjectCode: classRepo?.subjectCode,
            scheduleId: classRepo?.scheduleId,
        })

        const class_ = classDto.toEntity()

        expect(class_).toEqual(classRepo)
    })
    it('Should get a correctly from dynamo to entity', async () => {
        const dynamo_item = {
            'Item': {
                'id': { 'S': '0a8c5357-1f07-5b24-9845-9318c47ab923' },
                'name': { 'S': 'Linguagens de Programacao II' },
                'modality': { 'S': 'IN_PERSON' },
                'classType': { 'S': 'THEORY' },
                'subjectCode': { 'S': 'ECM256' },
                'scheduleId': { 'S': '1S-2CIC-D4@2024(SCS)' },
                'PK': { 'S': 'class' },
                'SK': {
                    'S': '0a8c5357-1f07-5b24-9845-9318c47ab923#1S-2CIC-D4@2024(SCS))',
                },
            },
        }

        const classDto = ClassDynamoDTO.fromDynamo(dynamo_item['Item'])
        const class_ = classDto.toEntity()

        const repo = new ScheduleRepositoryMock()
        const classRepo = await repo.getClass(
            '0a8c5357-1f07-5b24-9845-9318c47ab923',
        )

        expect(class_).toEqual(classRepo)
    })
    it('Should get a correctly from entity to dynamo', async () => {
        const repo = new ScheduleRepositoryMock()
        const classRepo = await repo.getClass(
            '0a8c5357-1f07-5b24-9845-9318c47ab923',
        )
        const classDto = ClassDynamoDTO.fromEntity(classRepo)
        const classDynamo = classDto.toDynamo()
        const expectedDynamo = {
            'entity': 'class',
            'id': classRepo?.id,
            'name': classRepo?.name,
            'modality': classRepo?.modality,
            'classType': classRepo?.classType,
            'subjectCode': classRepo?.subjectCode,
            'scheduleId': classRepo?.scheduleId,
        }

        expect(classDynamo).toEqual(expectedDynamo)
    })
})
