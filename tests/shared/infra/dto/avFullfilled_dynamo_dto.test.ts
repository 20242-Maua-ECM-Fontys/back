import { describe, it, expect } from 'vitest'
import { AvFullfilledDynamoDTO } from '../../../../src/shared/infra/dto/avFullfilled_dynamo_dto'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'

describe('Assert AVFulfilled Dynamo DTO is correct at all', () => {
    it('Should get AVFulfilled dto correctly', async () => {
        const repo = new ScheduleRepositoryMock()
        const avFullfilled = await repo
            .getAllAvsFullfilled()
            .then((avs) => avs[0])
        const expectedDto = new AvFullfilledDynamoDTO({
            availabilityId: avFullfilled.availabilityId,
            possibilityId: avFullfilled.possibilityId,
            classId: avFullfilled.classId,
            roomCode: avFullfilled.roomCode,
        })

        const fromEntity = AvFullfilledDynamoDTO.fromEntity(avFullfilled)

        expect(fromEntity).toEqual(expectedDto)
    })
    it('Should get a to dynamo dto correctly', async () => {
        const repo = new ScheduleRepositoryMock()
        const avFullfilled = await repo
            .getAllAvsFullfilled()
            .then((avs) => avs[0])
        const avFullfilledDto = new AvFullfilledDynamoDTO({
            availabilityId: avFullfilled.availabilityId,
            possibilityId: avFullfilled.possibilityId,
            classId: avFullfilled.classId,
            roomCode: avFullfilled.roomCode,
        })
        const avFullfilledDynamo = avFullfilledDto.toDynamo()
        const expectedDynamo = {
            'entity': 'avFullfilled',
            'availabilityId': avFullfilled.availabilityId,
            'possibilityId': avFullfilled.possibilityId,
            'classId': avFullfilled.classId,
            'roomCode': avFullfilled.roomCode,
        }

        expect(avFullfilledDynamo).toEqual(expectedDynamo)
    })
    it('Should get a correctly AVFulfilled from dynamo dto', async () => {
        const dynamo_dict = {
            'Item': {
                'availabilityId': {
                    'S': '0a8c5357-1f07-5b24-9845-9318c400000a',
                },
                'possibilityId': {
                    'S': '113e4567-e89b-12d3-a456-426614174000',
                },
                'classId': { 'S': '0a8c5357-1f07-5b24-9845-9318c47ac924' },
                'roomCode': { 'S': 'H205' },
                'entity': { 'S': 'avFullfilled' },
                'PK': { 'S': 'avFullfilled' },
                'SK': {
                    'S': '0a8c5357-1f07-5b24-9845-9318c400000a#0a8c5357-1f07-5b24-9845-9318c47ac924',
                },
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
        const avFullfilled = AvFullfilledDynamoDTO.fromDynamo(dynamo_dict.Item)
        const expectedAvFullfilled = new AvFullfilledDynamoDTO({
            availabilityId: '0a8c5357-1f07-5b24-9845-9318c400000a',
            possibilityId: '113e4567-e89b-12d3-a456-426614174000',
            classId: '0a8c5357-1f07-5b24-9845-9318c47ac924',
            roomCode: 'H205',
        })

        expect(avFullfilled).toEqual(expectedAvFullfilled)
    })
    it('Should get a correctly to entity', async () => {
        const repo = new ScheduleRepositoryMock()
        const avFullfilled = await repo
            .getAllAvsFullfilled()
            .then((avs) => avs[0])
        const avFullfilledDto = new AvFullfilledDynamoDTO({
            availabilityId: avFullfilled.availabilityId,
            possibilityId: avFullfilled.possibilityId,
            classId: avFullfilled.classId,
            roomCode: avFullfilled.roomCode,
        })

        const avFullfilledEntity = avFullfilledDto.toEntity()

        expect(avFullfilledEntity).toEqual(avFullfilled)
    })

    it('Should get a correctly from dynamo to entity', async () => {
        const dynamo_dict = {
            'Item': {
                'availabilityId': {
                    'S': '0a8c5357-1f07-5b24-9845-9318c400000a',
                },
                'possibilityId': {
                    'S': '113e4567-e89b-12d3-a456-426614174000',
                },
                'classId': { 'S': '0a8c5357-1f07-5b24-9845-9318c47ac924' },
                'roomCode': { 'S': 'H205' },
                'entity': { 'S': 'avFullfilled' },
                'PK': { 'S': 'avFullfilled' },
                'SK': {
                    'S': '0a8c5357-1f07-5b24-9845-9318c400000a#0a8c5357-1f07-5b24-9845-9318c47ac924',
                },
            },
        }
        const avFullfilledDto = AvFullfilledDynamoDTO.fromDynamo(
            dynamo_dict['Item'],
        )
        const avFullfilled = avFullfilledDto.toEntity()

        const repo = new ScheduleRepositoryMock()
        const avFullfilledRepo = await repo
            .getAllAvsFullfilled()
            .then((avs) => avs[0])

        expect(avFullfilled).toEqual(avFullfilledRepo)
    })
    it('Should get a correctly from entity to dynamo', async () => {
        const repo = new ScheduleRepositoryMock()
        const avFullfilled = await repo
            .getAllAvsFullfilled()
            .then((avs) => avs[0])
        const avFullfilledDto = AvFullfilledDynamoDTO.fromEntity(avFullfilled)
        const avFullfilledDynamo = avFullfilledDto.toDynamo()
        const expectedDynamo = {
            'entity': 'avFullfilled',
            'availabilityId': avFullfilled.availabilityId,
            'possibilityId': avFullfilled.possibilityId,
            'classId': avFullfilled.classId,
            'roomCode': avFullfilled.roomCode,
        }

        expect(avFullfilledDynamo).toEqual(expectedDynamo)
    })
})
