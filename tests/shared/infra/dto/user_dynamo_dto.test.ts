import { describe, it, expect } from 'vitest'
import { UserDynamoDTO } from '../../../../src/shared/infra/dto/user_dynamo_dto'
import { ROLE } from '../../../../src/shared/domain/enums/role_enum'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'

describe('Assert User Dynamo DTO is correct at all', () => {
    it('Should get user dto correctly', async () => {
        const repo = new ScheduleRepositoryMock()
        const user = await repo.getUser(1)
        const expectedDto = new UserDynamoDTO({
            id: user?.id.toString(),
            name: user?.name,
            email: user?.email,
            role: user?.role as ROLE,
            RA: user?.RA,
        })

        const fromEntity = UserDynamoDTO.fromEntity(user)

        expect(fromEntity).toEqual(expectedDto)
    })
    it('Should get a to dynamo dto correctly', async () => {
        const repo = new ScheduleRepositoryMock()
        const user = await repo.getUser(1)
        const userDto = new UserDynamoDTO({
            id: user?.id.toString(),
            name: user?.name,
            email: user?.email,
            role: user?.role as ROLE,
            RA: user?.RA,
        })
        const userDynamo = userDto.toDynamo()
        const expectedDynamo = {
            'entity': 'user',
            'id': user?.id.toString(),
            'name': user?.name,
            'email': user?.email,
            'role': user?.role,
            'RA': user?.RA,
        }

        expect(userDynamo).toEqual(expectedDynamo)
    })
    it('Should get a correctly user from dynamo dto', async () => {
        const dynamo_dict = {
            'Item': {
                'id': { 'S': '1' },
                'name': { 'S': 'user1' },
                'SK': { 'S': '#1' },
                'role': { 'S': 'PROFESSOR' },
                'PK': { 'S': 'user#1' },
                'entity': { 'S': 'user' },
                'email': { 'S': 'user1@gmail.com' },
                'RA': { 'S': '21-00188-7' },
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

        const user = UserDynamoDTO.fromDynamo(dynamo_dict['Item'])
        const expectedUser = new UserDynamoDTO({
            id: '1',
            name: 'user1',
            email: 'user1@gmail.com',
            role: ROLE.PROFESSOR,
            RA: '21-00188-7',
        })

        expect(user).toEqual(expectedUser)
    })
    it('Should get a correctly to entity', async () => {
        const repo = new ScheduleRepositoryMock()
        const userRepo = await repo.getUser(1)
        const userDto = new UserDynamoDTO({
            id: userRepo?.id.toString(),
            name: userRepo?.name,
            email: userRepo?.email,
            role: userRepo?.role as ROLE,
            RA: userRepo?.RA,
        })

        const user = userDto.toEntity()

        expect(user).toEqual(userRepo)
    })
    it('Should get a correctly from dynamo to entity', async () => {
        const dynamo_item = {
            'Item': {
                'id': { 'S': '1' },
                'name': { 'S': 'JOAO VITOR CHOUERI BRANCO' },
                'SK': { 'S': '#1' },
                'role': { 'S': 'STAFF' },
                'PK': { 'S': 'user#1' },
                'entity': { 'S': 'user' },
                'email': { 'S': '21.01075-7@maua.br' },
                'RA': { 'S': '21.01075-7' },
            },
        }

        const userDto = UserDynamoDTO.fromDynamo(dynamo_item['Item'])
        const user = userDto.toEntity()

        const repo = new ScheduleRepositoryMock()
        const userRepo = await repo.getUser(1)

        expect(user).toEqual(userRepo)
    })
    it('Should get a correctly from entity to dynamo', async () => {
        const repo = new ScheduleRepositoryMock()
        const userRepo = await repo.getUser(1)
        const userDto = UserDynamoDTO.fromEntity(userRepo)
        const userDynamo = userDto.toDynamo()
        const expectedDynamo = {
            'entity': 'user',
            'id': userRepo?.id.toString(),
            'name': userRepo?.name,
            'email': userRepo?.email,
            'role': userRepo?.role,
            'RA': userRepo?.RA,
        }

        expect(userDynamo).toEqual(expectedDynamo)
    })
})
