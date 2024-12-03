import { describe, it, expect } from 'vitest'
import { AvailabilityDynamoDTO } from '../../../../src/shared/infra/dto/availability_dynamo_dto'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'
import { MAUA_START_TIME } from '../../../../src/shared/domain/enums/maua_start_time_enum'
import { MAUA_END_TIME } from '../../../../src/shared/domain/enums/maua_end_time_enum'
import { WEEK_DAY } from '../../../../src/shared/domain/enums/week_day_enum'

describe('Assert Availability Dynamo DTO is correct at all', () => {
    it('Should get availability dto correctly', async () => {
        const repo = new ScheduleRepositoryMock()
        const availability = await repo.getAvailability(
            '0a8c5357-1f07-5b24-9845-9318c4000000',
        )
        const expectedDto = new AvailabilityDynamoDTO({
            id: availability?.availabilityId,
            userId: availability?.userId.toString(),
            startTime: availability?.startTime as MAUA_START_TIME,
            endTime: availability?.endTime as MAUA_END_TIME,
            isTaken: availability?.isTaken,
            weekDay: availability?.weekDay as WEEK_DAY,
        })

        const fromEntity = AvailabilityDynamoDTO.fromEntity(availability)

        expect(fromEntity).toEqual(expectedDto)
    })

    it('Should get a to dynamo dto correctly', async () => {
        const repo = new ScheduleRepositoryMock()
        const availability = await repo.getAvailability(
            '0a8c5357-1f07-5b24-9845-9318c4000000',
        )
        const availabilityDto = new AvailabilityDynamoDTO({
            id: availability?.availabilityId,
            userId: availability?.userId.toString(),
            startTime: availability?.startTime as MAUA_START_TIME,
            endTime: availability?.endTime as MAUA_END_TIME,
            isTaken: availability?.isTaken,
            weekDay: availability?.weekDay as WEEK_DAY,
        })
        const availabilityDynamo = availabilityDto.toDynamo()
        const expectedDynamo = {
            'entity': 'availability',
            'id': availability?.availabilityId,
            'userId': availability?.userId.toString(),
            'startTime': availability?.startTime,
            'endTime': availability?.endTime,
            'isTaken': availability?.isTaken,
            'weekDay': availability?.weekDay,
        }

        expect(availabilityDynamo).toEqual(expectedDynamo)
    })

    it('Should get a correctly availability from dynamo dto', async () => {
        const dynamo_dict = {
            'Item': {
                'id': { 'S': '0a8c5357-1f07-5b24-9845-9318c4000000' },
                'userId': { 'S': '3' },
                'startTime': { 'S': 460 },
                'endTime': { 'S': 560 },
                'isTaken': { 'BOOL': false },
                'weekDay': { 'S': 'MON' },
                'entity': { 'S': 'availability' },
                'PK': { 'S': 'availability' },
                'SK': { 'S': '1#0a8c5357-1f07-5b24-9845-9318c4000000' },
            },
            'ResponseMetadata': {
                'RequestId': 'aa6a5e5e-943f-4452-8c1f-4e5441ee6042',
                'HTTPStatusCode': 200,
                'HTTPHeaders': {
                    'date': 'Fri, 16 Dec 2022 15:40:29 GMT',
                },
                'RetryAttempts': 0,
            },
        }

        const availability = AvailabilityDynamoDTO.fromDynamo(
            dynamo_dict['Item'],
        )
        const expectedAvailability = new AvailabilityDynamoDTO({
            id: '0a8c5357-1f07-5b24-9845-9318c4000000',
            userId: '3',
            startTime: MAUA_START_TIME.H07_40_09_20,
            endTime: MAUA_END_TIME.H07_40_09_20,
            isTaken: false,
            weekDay: WEEK_DAY.MON,
        })

        expect(availability).toEqual(expectedAvailability)
    })

    it('Should get a correctly to entity', async () => {
        const repo = new ScheduleRepositoryMock()
        const availabilitiesRepo = await repo.getAvailability(
            '0a8c5357-1f07-5b24-9845-9318c4000000',
        )
        const availabilityDto = new AvailabilityDynamoDTO({
            id: availabilitiesRepo?.availabilityId,
            userId: availabilitiesRepo?.userId.toString(),
            startTime: availabilitiesRepo?.startTime as MAUA_START_TIME,
            endTime: availabilitiesRepo?.endTime as MAUA_END_TIME,
            isTaken: availabilitiesRepo?.isTaken,
            weekDay: availabilitiesRepo?.weekDay as WEEK_DAY,
        })
        const availability = availabilityDto.toEntity()

        expect(availability).toEqual(availabilitiesRepo)
    })

    it('Should get a correctly from dynamo to entity', async () => {
        const dynamo_dict = {
            'Item': {
                'id': { 'S': '0a8c5357-1f07-5b24-9845-9318c4000000' },
                'userId': { 'S': '3' },
                'startTime': { 'S': 460 },
                'endTime': { 'S': 560 },
                'isTaken': { 'BOOL': false },
                'weekDay': { 'S': 'MON' },
                'entity': { 'S': 'availability' },
                'PK': { 'S': 'availability' },
                'SK': { 'S': '1#0a8c5357-1f07-5b24-9845-9318c4000000' },
            },
        }

        const availabilityDto = AvailabilityDynamoDTO.fromDynamo(
            dynamo_dict['Item'],
        )
        const availability = availabilityDto.toEntity()

        const repo = new ScheduleRepositoryMock()
        const availabilitiesRepo = await repo.getAvailability(
            '0a8c5357-1f07-5b24-9845-9318c4000000',
        )

        expect(availability).toEqual(availabilitiesRepo)
    })

    it('Should get a correctly from entity to dynamo', async () => {
        const repo = new ScheduleRepositoryMock()
        const availabilitiesRepo = await repo.getAvailability(
            '0a8c5357-1f07-5b24-9845-9318c4000000',
        )
        const availabilityDto = new AvailabilityDynamoDTO({
            id: availabilitiesRepo?.availabilityId,
            userId: availabilitiesRepo?.userId.toString(),
            startTime: availabilitiesRepo?.startTime as MAUA_START_TIME,
            endTime: availabilitiesRepo?.endTime as MAUA_END_TIME,
            isTaken: availabilitiesRepo?.isTaken,
            weekDay: availabilitiesRepo?.weekDay as WEEK_DAY,
        })
        const availabilityDynamo = availabilityDto.toDynamo()
        const expectedDynamo = {
            'entity': 'availability',
            'id': availabilitiesRepo?.availabilityId,
            'userId': availabilitiesRepo?.userId.toString(),
            'startTime': availabilitiesRepo?.startTime,
            'endTime': availabilitiesRepo?.endTime,
            'isTaken': availabilitiesRepo?.isTaken,
            'weekDay': availabilitiesRepo?.weekDay,
        }

        expect(availabilityDynamo).toEqual(expectedDynamo)
    })
})
