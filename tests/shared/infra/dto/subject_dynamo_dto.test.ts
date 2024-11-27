import { describe, it, expect } from 'vitest'
import { SubjectDynamoDTO } from '../../../../src/shared/infra/dto/subject_synamo_dto'
import { PERIOD } from '../../../../src/shared/domain/enums/period_enum'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'

describe('Assert Subject Dynamo DTO is correct at all', () => {
    it('Should get subject dto correctly', async () => {
        const repo = new ScheduleRepositoryMock()
        const subject = await repo.getSubject('ECM256')
        const expectedDto = new SubjectDynamoDTO({
            code: subject?.code,
            name: subject?.name,
            period: subject?.period,
        })

        const fromEntity = SubjectDynamoDTO.fromEntity(subject)

        expect(fromEntity).toEqual(expectedDto)
    })
    it('Should get a to dynamo dto correctly', async () => {
        const repo = new ScheduleRepositoryMock()
        const subject = await repo.getSubject('ECM256')
        const subjectDto = new SubjectDynamoDTO({
            code: subject?.code,
            name: subject?.name,
            period: subject?.period,
        })
        const subjectDynamo = subjectDto.toDynamo()
        const expectedDynamo = {
            'entity': 'subject',
            'code': subject?.code,
            'name': subject?.name,
            'period': subject?.period,
        }

        expect(subjectDynamo).toEqual(expectedDynamo)
    })
    it('Should get a correctly subject from dynamo dto', async () => {
        const dynamo_dict = {
            'Item': {
                'code': { 'S': 'ECM256' },
                'name': { 'S': 'Programming Languages II' },
                'SK': { 'S': 'ECM256' },
                'period': { 'S': 'MORNING' },
                'PK': { 'S': 'subject' },
                'entity': { 'S': 'subject' },
            },
            'ResponseMetadata': {
                'RequestId': 'aa6a5e5e-943f-4452-8c1f-4e5441ee6042',
                'HTTPStatusCode': 200,
                'HTTPHeaders': {
                    'date': 'Fri, 16 Dec 2022 15:40:29 GMT',
                    'content-type': 'application/x-amz-json-1.0',
                    'content-length': '123',
                    'connection': 'keep-alive',
                    'x-amzn-requestid': 'aa6a5e5e-943f-4452-8c1f-4e5441ee6042',
                    'x-amz-crc32': '2745614148',
                },
                'RetryAttempts': 0,
            },
        }
        const subject = SubjectDynamoDTO.fromDynamo(dynamo_dict.Item)
        const expectedSubject = new SubjectDynamoDTO({
            code: 'ECM256',
            name: 'Programming Languages II',
            period: PERIOD.MORNING,
        })

        expect(subject).toEqual(expectedSubject)
    })
    it('Should get a correctly subject to entity', async () => {
        const repo = new ScheduleRepositoryMock()
        const subject = await repo.getSubject('ECM256')
        const subjectDto = new SubjectDynamoDTO({
            code: subject?.code,
            name: subject?.name,
            period: subject?.period,
        })
        const subjectEntity = subjectDto.toEntity()
        const expectedEntity = {
            codeSubject: 'ECM256',
            period: 'MORNING',
            subjectName: 'Programming Languages II',
        }

        // Eu odeio typescript
        expect(subjectEntity.code).toEqual(expectedEntity.codeSubject)
        expect(subjectEntity.period).toEqual(expectedEntity.period)
        expect(subjectEntity.name).toEqual(expectedEntity.subjectName)
    })
    it('Should get a correctly from dynamo to entity', async () => {
        const dynamo_dict = {
            'Item': {
                'code': { 'S': 'ECM256' },
                'name': { 'S': 'Programming Languages II' },
                'SK': { 'S': 'ECM256' },
                'period': { 'S': 'MORNING' },
                'PK': { 'S': 'subject' },
                'entity': { 'S': 'subject' },
            },
        }

        const subjectDto = SubjectDynamoDTO.fromDynamo(dynamo_dict.Item)
        const subject = subjectDto.toEntity()
        const repo = new ScheduleRepositoryMock()
        const expectedSubject = await repo.getSubject('ECM256')

        expect(subject).toEqual(expectedSubject)
    })
    it('Should get a correctly from entity to dynamo', async () => {
        const repo = new ScheduleRepositoryMock()
        const subjectRepo = await repo.getSubject('ECM256')
        const subjectDto = SubjectDynamoDTO.fromEntity(subjectRepo)
        const subjectDynamo = subjectDto.toDynamo()
        const expectedDynamo = {
            'entity': 'subject',
            'code': 'ECM256',
            'name': 'Programming Languages II',
            'period': 'MORNING',
        }

        expect(subjectDynamo).toEqual(expectedDynamo)
    })
})
