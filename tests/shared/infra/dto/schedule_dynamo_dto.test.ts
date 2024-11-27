import { describe, it, expect } from 'vitest'
import { ScheduleDynamoDTO } from '../../../../src/shared/infra/dto/schedule_dynamo_dto'
import { ACADEMIC_PERIOD } from '../../../../src/shared/domain/enums/academic_period_enum'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'

describe('Assert Schedule Dynamo DTO is correct at all', () => {
    it('Should get schedule dto correctly', async () => {
        const repo = new ScheduleRepositoryMock()
        const schedule = await repo.getSchedule('2S-4CM-D5@2024(SCS)', 1)
        const expectedDto = new ScheduleDynamoDTO({
            scheduleId: schedule?.scheduleId,
            courseName: schedule?.courseName,
            groupNumber: schedule?.groupNumber.toString(),
            userId: schedule?.userId.toString(),
            academicPeriod: schedule?.academicPeriod,
            courseGrade: schedule?.courseGrade,
        })

        const fromEntity = ScheduleDynamoDTO.fromEntity(schedule)

        expect(fromEntity).toEqual(expectedDto)
    })
    it('Should get a to dynamo dto correctly', async () => {
        const repo = new ScheduleRepositoryMock()
        const schedule = await repo.getSchedule('2S-4CM-D5@2024(SCS)', 1)
        const scheduleDto = new ScheduleDynamoDTO({
            scheduleId: schedule?.scheduleId,
            courseName: schedule?.courseName,
            groupNumber: schedule?.groupNumber.toString(),
            userId: schedule?.userId.toString(),
            academicPeriod: schedule?.academicPeriod,
            courseGrade: schedule?.courseGrade,
        })
        const scheduleDynamo = scheduleDto.toDynamo()
        const expectedDynamo = {
            'entity': 'schedule',
            'scheduleId': schedule?.scheduleId,
            'courseName': schedule?.courseName,
            'groupNumber': schedule?.groupNumber.toString(),
            'userId': schedule?.userId.toString(),
            'academicPeriod': schedule?.academicPeriod,
            'courseGrade': schedule?.courseGrade,
        }

        expect(scheduleDynamo).toEqual(expectedDynamo)
    })
    it('Should get a correctly schedule from dynamo dto', async () => {
        const dynamo_dict = {
            'Item': {
                'scheduleId': { 'S': '2S-4CM-D5@2024(SCS)' },
                'courseName': { 'S': 'Computer Engineering' },
                'groupNumber': { 'S': '1' },
                'userId': { 'S': '2' },
                'academicPeriod': { 'S': 'ANNUAL' },
                'courseGrade': { 'N': '4' },
                'PK': { 'S': 'schedule' },
                'entity': { 'S': 'schedule' },
                'SK': { 'S': '2S-4CM-D5@2024(SCS)#1' },
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

        const schedule = ScheduleDynamoDTO.fromDynamo(dynamo_dict['Item'])

        expect(schedule).toEqual({
            scheduleId: '2S-4CM-D5@2024(SCS)',
            courseName: 'Computer Engineering',
            groupNumber: '1',
            userId: '2',
            academicPeriod: ACADEMIC_PERIOD.ANNUAL,
            courseGrade: 4,
        })
    })

    it('Should get a correctly schedule to entity', async () => {
        const repo = new ScheduleRepositoryMock()
        const schedule = await repo.getSchedule('2S-4CM-D5@2024(SCS)', 1)
        const scheduleDto = new ScheduleDynamoDTO({
            scheduleId: schedule?.scheduleId,
            courseName: schedule?.courseName,
            groupNumber: schedule?.groupNumber.toString(),
            userId: schedule?.userId.toString(),
            academicPeriod: schedule?.academicPeriod,
            courseGrade: schedule?.courseGrade,
        })

        const entity = scheduleDto.toEntity()

        expect(entity).toEqual(schedule)
    })

    it('Should get a correctly from dynamo to entity', async () => {
        const dynamo_dict = {
            'Item': {
                'scheduleId': { 'S': '2S-4CM-D5@2024(SCS)' },
                'courseName': { 'S': 'Computer Engineering' },
                'groupNumber': { 'S': '1' },
                'userId': { 'S': '2' },
                'academicPeriod': { 'S': 'ANNUAL' },
                'courseGrade': { 'N': '4' },
                'PK': { 'S': 'schedule' },
                'entity': { 'S': 'schedule' },
                'SK': { 'S': '2S-4CM-D5@2024(SCS)#1' },
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

        const scheduleDto = ScheduleDynamoDTO.fromDynamo(dynamo_dict['Item'])
        const schedule = scheduleDto.toEntity()

        const repo = new ScheduleRepositoryMock()
        const scheduleRepo = await repo.getSchedule('2S-4CM-D5@2024(SCS)', 1)

        expect(schedule).toEqual(scheduleRepo)
    })
    it('Should get a correctly from entity to dynamo', async () => {
        const repo = new ScheduleRepositoryMock()
        const scheduleRepo = await repo.getSchedule('2S-4CM-D5@2024(SCS)', 1)
        const scheduleDto = ScheduleDynamoDTO.fromEntity(scheduleRepo)
        const scheduleDynamo = scheduleDto.toDynamo()
        const expectedDynamo = {
            'entity': 'schedule',
            'scheduleId': '2S-4CM-D5@2024(SCS)',
            'courseName': 'Computer Engineering',
            'groupNumber': '1',
            'userId': '2',
            'academicPeriod': 'ANNUAL',
            'courseGrade': 4,
        }

        expect(scheduleDynamo).toEqual(expectedDynamo)
    })
})
