import { describe, it, expect } from 'vitest'
import { PossibilityDynamoDTO } from '../../../../src/shared/infra/dto/possibility_dynamo_dto'
import { WEEK_DAY } from '../../../../src/shared/domain/enums/week_day_enum'
import { MAUA_START_TIME } from '../../../../src/shared/domain/enums/maua_start_time_enum'
import { MAUA_END_TIME } from '../../../../src/shared/domain/enums/maua_end_time_enum'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'

describe('Assert Possibility Dynamo DTO is correct at all', () => {
    it('Should get possibility dto correctly', async () => {
        const repo = new ScheduleRepositoryMock()
        const possibility = await repo.getPossibility(
            '113e4567-e89b-12d3-a456-426614174000',
        )
        const expectedDto = new PossibilityDynamoDTO({
            id: possibility?.id,
            weekDay: possibility?.weekDay,
            startTime: possibility?.startTime,
            endTime: possibility?.endTime,
            scheduleId: possibility?.scheduleId,
        })

        const fromEntity = PossibilityDynamoDTO.fromEntity(possibility)

        expect(fromEntity).toEqual(expectedDto)
    })

    it('Should get a to dynamo dto correctly', async () => {
        const repo = new ScheduleRepositoryMock()
        const possibility = await repo.getPossibility(
            '113e4567-e89b-12d3-a456-426614174000',
        )
        const possibilityDto = new PossibilityDynamoDTO({
            id: possibility?.id,
            weekDay: possibility?.weekDay,
            startTime: possibility?.startTime,
            endTime: possibility?.endTime,
            scheduleId: possibility?.scheduleId,
        })
        const possibilityDynamo = possibilityDto.toDynamo()
        const expectedDynamo = {
            'entity': 'possibility',
            'id': possibility?.id,
            'weekDay': possibility?.weekDay,
            'startTime': possibility?.startTime,
            'endTime': possibility?.endTime,
            'scheduleId': possibility?.scheduleId,
        }

        expect(possibilityDynamo).toEqual(expectedDynamo)
    })

    it('Should get a correctly possibility from dynamo dto', async () => {
        const dynamo_dict = {
            'Item': {
                'id': { 'S': '113e4567-e89b-12d3-a456-426614174000' },
                'weekDay': { 'S': 'MON' },
                'startTime': { 'N': '460' },
                'endTime': { 'N': '560' },
                'scheduleId': { 'S': '2S-4CM-D5@2024(SCS)' },
                'entity': { 'S': 'possibility' },
                'PK': { 'S': 'possibility' },
                'SK': {
                    'S': '113e4567-e89b-12d3-a456-426614174000#2S-4CM-D5@2024(SCS)',
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

        const possibility = PossibilityDynamoDTO.fromDynamo(dynamo_dict['Item'])
        const expectedPossibility = new PossibilityDynamoDTO({
            id: '113e4567-e89b-12d3-a456-426614174000',
            weekDay: WEEK_DAY.MON,
            startTime: MAUA_START_TIME.H07_40_09_20,
            endTime: MAUA_END_TIME.H07_40_09_20,
            scheduleId: '2S-4CM-D5@2024(SCS)',
        })

        expect(possibility).toEqual(expectedPossibility)
    })

    it('Should get a correctly to entity', async () => {
        const repo = new ScheduleRepositoryMock()
        const possibilityRepo = await repo.getPossibility(
            '113e4567-e89b-12d3-a456-426614174000',
        )
        const possibilityDto = new PossibilityDynamoDTO({
            id: possibilityRepo?.id,
            weekDay: possibilityRepo?.weekDay,
            startTime: possibilityRepo?.startTime,
            endTime: possibilityRepo?.endTime,
            scheduleId: possibilityRepo?.scheduleId,
        })

        const possibility = possibilityDto.toEntity()

        expect(possibility).toEqual(possibilityRepo)
    })

    it('Should get a correctly from dynamo to entity', async () => {
        const dynamo_item = {
            'Item': {
                'id': { 'S': '113e4567-e89b-12d3-a456-426614174000' },
                'weekDay': { 'S': 'MON' },
                'startTime': { 'N': '460' },
                'endTime': { 'N': '560' },
                'scheduleId': { 'S': '2S-4CM-D5@2024(SCS)' },
                'entity': { 'S': 'possibility' },
                'PK': { 'S': 'possibility' },
                'SK': {
                    'S': '113e4567-e89b-12d3-a456-426614174000#2S-4CM-D5@2024(SCS)',
                },
            },
        }

        const possibilityDto = PossibilityDynamoDTO.fromDynamo(
            dynamo_item['Item'],
        )
        const possibility = possibilityDto.toEntity()

        const repo = new ScheduleRepositoryMock()
        const possibilityRepo = await repo.getPossibility(
            '113e4567-e89b-12d3-a456-426614174000',
        )

        expect(possibility).toEqual(possibilityRepo)
    })

    it('Should get a correctly from entity to dynamo', async () => {
        const repo = new ScheduleRepositoryMock()
        const possibilityRepo = await repo.getPossibility(
            '113e4567-e89b-12d3-a456-426614174000',
        )
        const possibilityDto = PossibilityDynamoDTO.fromEntity(possibilityRepo)
        const possibilityDynamo = possibilityDto.toDynamo()
        const expectedDynamo = {
            'entity': 'possibility',
            'id': possibilityRepo?.id,
            'weekDay': possibilityRepo?.weekDay,
            'startTime': possibilityRepo?.startTime,
            'endTime': possibilityRepo?.endTime,
            'scheduleId': possibilityRepo?.scheduleId,
        }

        expect(possibilityDynamo).toEqual(expectedDynamo)
    })
})
