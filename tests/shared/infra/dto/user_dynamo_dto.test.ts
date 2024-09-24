import { describe, it, expect } from 'vitest'
import { UserRepositoryMock } from '../../../../src/shared/infra/repositories/user_repository_mock'
import { UserDynamoDTO } from '../../../../src/shared/infra/dto/user_dynamo_dto'
import { STATE } from '../../../../src/shared/domain/enums/state_enum'

describe('Assert User Dynamo DTO is correct at all', () => {
  it('Should get user dto correctly', async () => {
    const repo = new UserRepositoryMock()
    const user = await repo.getUser(1)
    const expectedDto = new UserDynamoDTO({
      id: user?.id.toString(),
      name: user?.name,
      email: user?.email,
      state: user?.state as STATE
    })

    const fromEntity = UserDynamoDTO.fromEntity(user)

    expect(fromEntity).toEqual(expectedDto)
  })
  it('Should get a to dynamo dto correctly', async () => {
    const repo = new UserRepositoryMock()
    const user = await repo.getUser(1)
    const userDto = new UserDynamoDTO({
      id: user?.id.toString(),
      name: user?.name,
      email: user?.email,
      state: user?.state as STATE
    })
    const userDynamo = userDto.toDynamo()
    const expectedDynamo = {
      'entity': 'user',
      'id': user?.id.toString(),
      'name': user?.name,
      'email': user?.email,
      'state': user?.state
    }

    expect(userDynamo).toEqual(expectedDynamo)
  })
  it('Should get a correctly user from dynamo dto', async () => {
    const dynamo_dict = {'Item': {'id': { 'S': '1'},
      'name': { 'S': 'user1'},
      'SK': { 'S': '#1'},
      'state': { 'S': 'PENDING'},
      'PK': { 'S': 'user#1' },
      'entity': { 'S': 'user' },
      'email': { 'S': 'user1@gmail.com'}},
    'ResponseMetadata': {'RequestId': 'aa6a5e5e-943f-4452-8c1f-4e5441ee6042',
      'HTTPStatusCode': 200,
      'HTTPHeaders': {'date': 'Fri, 16 Dec 2022 15:40:29 GMT',
        'content-type': 'application/x-amz-json-1.0',
        'x-amz-crc32': '3909675734',
        'x-amzn-requestid': 'aa6a5e5e-943f-4452-8c1f-4e5441ee6042',
        'content-length': '174',
        'server': 'Jetty(9.4.48.v20220622)'},
      'RetryAttempts': 0}}
    
    const user = UserDynamoDTO.fromDynamo(dynamo_dict['Item'])
    const expectedUser = new UserDynamoDTO({
      id: '1',
      name: 'user1',
      email: 'user1@gmail.com',
      state: STATE.PENDING
    })

    expect(user).toEqual(expectedUser)
  })
  it('Should get a correctly to entity', async () => {
    const repo = new UserRepositoryMock()
    const userRepo = await repo.getUser(1)
    const userDto = new UserDynamoDTO({
      id: userRepo?.id.toString(),
      name: userRepo?.name,
      email: userRepo?.email,
      state: userRepo?.state as STATE
    }) 

    const user = userDto.toEntity()

    expect(user).toEqual(userRepo)
  })
  it('Should get a correctly from dynamo to entity', async () => {
    const dynamo_item = {'Item': {'id': { 'S': '1'},
      'name': { 'S': 'user1'},
      'SK': { 'S': '#1'},
      'state': { 'S': 'PENDING'},
      'PK': { 'S': 'user#1' },
      'entity': { 'S': 'user' },
      'email': { 'S': 'user1@gmail.com'}}
    }

    const userDto = UserDynamoDTO.fromDynamo(dynamo_item['Item'])
    const user = userDto.toEntity()

    const repo = new UserRepositoryMock()
    const userRepo = await repo.getUser(1)

    expect(user).toEqual(userRepo)
  })
  it('Should get a correctly from entity to dynamo', async () => {
    const repo = new UserRepositoryMock()
    const userRepo = await repo.getUser(1)
    const userDto = UserDynamoDTO.fromEntity(userRepo)
    const userDynamo = userDto.toDynamo()
    const expectedDynamo = {
      'entity': 'user',
      'id': userRepo?.id.toString(),
      'name': userRepo?.name,
      'email': userRepo?.email,
      'state': userRepo?.state
    }

    expect(userDynamo).toEqual(expectedDynamo)
  })
})
