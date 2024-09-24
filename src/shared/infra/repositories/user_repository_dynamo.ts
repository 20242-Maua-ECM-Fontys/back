/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '../../domain/entities/user'
import { IUserRepository } from '../../domain/repositories/user_repository_interface'
import { NoItemsFound } from '../../helpers/errors/usecase_errors'
import { UserDynamoDTO } from '../dto/user_dynamo_dto'
import { DynamoDatasource } from '../external/dynamo/datasources/dynamo_datasource'
import { EntityError } from '../../helpers/errors/domain_errors'
import { STATE } from '../../domain/enums/state_enum'
import { Environments } from '../../../shared/environments'

export class UserRepositoryDynamo implements IUserRepository {

  static partitionKeyFormat(id: number): string {
    return `user#${id}`
  }

  static sortKeyFormat(id: number): string {
    return `#${id}`
  }

  constructor(private dynamo: DynamoDatasource = new DynamoDatasource(
    Environments.getEnvs().dynamoTableName, 
    Environments.getEnvs().dynamoPartitionKey, 
    Environments.getEnvs().region, undefined, undefined, Environments.getEnvs().endpointUrl, Environments.getEnvs().dynamoSortKey
  )) {}

  async getUser(id: number): Promise<User> {
    console.log('Environments.getEnvs().dynamoTableName - [GET_USER_REPO_DYNAMO] - ', Environments.getEnvs().dynamoTableName)
    const resp = await this.dynamo.getItem(UserRepositoryDynamo.partitionKeyFormat(id), UserRepositoryDynamo.sortKeyFormat(id))

    if (!resp['Item']) {
      throw new NoItemsFound('id')
    }

    const userDto = UserDynamoDTO.fromDynamo(resp['Item'])

    return Promise.resolve(userDto.toEntity())
  }
  async getAllUsers(): Promise<User[]> {
    const filterExpression = 'attribute_not_exists(PK) OR attribute_not_exists(SK) OR (PK <> :value AND SK <> :value)'
    const expressionAttributeValues = {
      ':value': { S: 'COUNTER' }
    }
    const resp = await this.dynamo.scanItems(filterExpression, {
      expressionAttributeValues: expressionAttributeValues
    })
    const users = []

    for (const item of resp['Items']) {
      const userDto = UserDynamoDTO.fromDynamo(item)
      users.push(userDto.toEntity())
    }

    return Promise.resolve(users)
  }
  async createUser(user: User): Promise<User> {
    if(!User.validateName(user.name)) throw new EntityError('name')
    if(!User.validateEmail(user.email)) throw new EntityError('email')
    if(!User.validateState(user.state as STATE)) throw new EntityError('state')

    user.setId = await this.getUserCounter()

    const userDto = UserDynamoDTO.fromEntity(user)
    await this.dynamo.putItem(userDto.toDynamo(), UserRepositoryDynamo.partitionKeyFormat(user.id as number), UserRepositoryDynamo.sortKeyFormat(user.id as number))

    return Promise.resolve(userDto.toEntity())
  }
  async updateUser(id: number, newName: string, newEmail: string): Promise<User> {
    if(!User.validateName(newName)) throw new EntityError('newName')
    if(!User.validateEmail(newEmail)) throw new EntityError('newEmail')
    await this.getUser(id)

    const itemsToUpdate: Record<string, any> = {}

    if (newName && newEmail) {
      itemsToUpdate['name'] = newName
      itemsToUpdate['email'] = newEmail
    } else {
      throw new NoItemsFound('Nothing to update')
    }

    const resp = await this.dynamo.updateItem(UserRepositoryDynamo.partitionKeyFormat(id), UserRepositoryDynamo.sortKeyFormat(id), itemsToUpdate)

    const userDto = UserDynamoDTO.fromDynamo(resp['Attributes']).toEntity()

    return Promise.resolve(userDto)
  }
  async deleteUser(id: number): Promise<User> {
    const user = await this.getUser(id)

    await this.dynamo.deleteItem(UserRepositoryDynamo.partitionKeyFormat(id), UserRepositoryDynamo.sortKeyFormat(id))

    return Promise.resolve(user)
  }
  async getUserCounter(): Promise<number> {
    const number = await this.updateCounter()
    return  number
  }
  async updateCounter(): Promise<number> {
    const num = await this.dynamo.getItem('COUNTER', 'COUNTER')
    console.log('num - [UPDATE_CONTER] - ', num)

    if (num && num.Item && num.Item.COUNTER !== undefined) {
      const counter = Number(num['Item']['COUNTER']['N'])

      await this.dynamo.updateItem('COUNTER', 'COUNTER', { 'COUNTER': counter + 1 })

      return counter + 1
    } else {
      throw new Error('Failed to retrieve or update the counter.')
    }
  }
}