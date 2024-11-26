import { describe, it, expect } from 'vitest'
import { SuitabilityDynamoDTO } from '../../../../src/shared/infra/dto/suitability_dynamo_dto'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'

describe('Assert Suitability Dynamo DTO is correct at all', () => {
    it('Should get user dto correctly', async () => {
        const repo = new ScheduleRepositoryMock()
        const suitabilityList = await repo.getSuitabilitiesByUserId(4)
        const suitability = suitabilityList[0]
        const expectedDto = new SuitabilityDynamoDTO({
            userId: suitability?.userId.toString(),
            codeSubject: suitability?.codeSubject,
        })

        const fromEntity = SuitabilityDynamoDTO.fromEntity(suitability)

        expect(fromEntity).toEqual(expectedDto)
    })
    it('Should get a to dynamo dto correctly', async () => {
        const repo = new ScheduleRepositoryMock()
        const suitabilityList = await repo.getSuitabilitiesByUserId(4)
        const suitability = suitabilityList[0]
        const suitabilityDto = new SuitabilityDynamoDTO({
            userId: suitability?.userId.toString(),
            codeSubject: suitability?.codeSubject,
        })
        const suitabilityDynamo = suitabilityDto.toDynamo()
        const expectedDynamo = {
            'entity': 'suitability',
            'userId': suitability?.userId.toString(),
            'codeSubject': suitability?.codeSubject,
        }

        expect(suitabilityDynamo).toEqual(expectedDynamo)
    })
    it('Should get a correctly suitability from dynamo dto', async () => {
        const dynamo_dict = {
            'Item': {
                'userId': { 'S': '4' },
                'codeSubject': { 'S': 'ECM256' },
                'entity': { 'S': 'suitability' },
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

        const suitability = SuitabilityDynamoDTO.fromDynamo(dynamo_dict['Item'])
        const expectedSuitability = new SuitabilityDynamoDTO({
            userId: '4',
            codeSubject: 'ECM256',
        })

        expect(suitability).toEqual(expectedSuitability)
    })
    it('Should get a correctly to entity', async () => {
        const repo = new ScheduleRepositoryMock()
        const suitabilityList = await repo.getSuitabilitiesByUserId(4)
        const suitabilityRepo = suitabilityList[0]
        const suitabilityDto = new SuitabilityDynamoDTO({
            userId: suitabilityRepo?.userId.toString(),
            codeSubject: suitabilityRepo?.codeSubject,
        })

        const suitability = suitabilityDto.toEntity()

        expect(suitability).toEqual(suitabilityRepo)
    })
    it('Should get a correctly from dynamo to entity', async () => {
        const dynamo_item = {
            'Item': {
                'userId': { 'S': '4' },
                'codeSubject': { 'S': 'ECM256' },
                'entity': { 'S': 'suitability' },
            },
        }

        const suitabilityDto = SuitabilityDynamoDTO.fromDynamo(
            dynamo_item['Item'],
        )
        const suitability = suitabilityDto.toEntity()

        const repo = new ScheduleRepositoryMock()
        const suitabilityList = await repo.getSuitabilitiesByUserId(4)
        const suitabilityRepo = suitabilityList[0]

        expect(suitability).toEqual(suitabilityRepo)
    })
    it('Should get a correctly from entity to dynamo', async () => {
        const repo = new ScheduleRepositoryMock()
        const suitabilityList = await repo.getSuitabilitiesByUserId(4)
        const suitabilityRepo = suitabilityList[0]
        const suitabilityDto = SuitabilityDynamoDTO.fromEntity(suitabilityRepo)
        const suitabilityDynamo = suitabilityDto.toDynamo()
        const expectedDynamo = {
            'entity': 'suitability',
            'userId': suitabilityRepo.userId.toString(),
            'codeSubject': suitabilityRepo.codeSubject,
        }

        expect(suitabilityDynamo).toEqual(expectedDynamo)
    })
})
