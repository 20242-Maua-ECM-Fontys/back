/* eslint-disable @typescript-eslint/no-explicit-any */
import { marshall } from '@aws-sdk/util-dynamodb'

import { BatchWriteItemCommand, BatchWriteItemCommandInput, DeleteItemCommand, DeleteItemCommandInput, DynamoDBClient, GetItemCommand, GetItemCommandInput, PutItemCommand, PutItemCommandInput, QueryCommand, QueryInput, ScanCommand, ScanInput, UpdateItemCommand, UpdateItemCommandInput } from '@aws-sdk/client-dynamodb'

export class DynamoDatasource {
  private dynamoTable: DynamoDBClient
  private dynamoTableName: string
  private partitionKey: string
  private sortKey: string
  private gsiPartitionKey: string | undefined
  private gsiSortKey: string | undefined

  constructor(
    dynamoTableName: string,
    partitionKey: string,
    region: string,
    gsiPartitionKey?: string,
    gsiSortKey?: string,
    endpointUrl?: string,
    sortKey?: string
  ) {

    this.dynamoTable = new DynamoDBClient({
      region: region,
      endpoint: endpointUrl
    })
    this.partitionKey = partitionKey
    this.sortKey = sortKey || ''
    this.gsiPartitionKey = gsiPartitionKey
    this.gsiSortKey = gsiSortKey
    this.dynamoTableName = dynamoTableName
  }

  private static parseFloatToDecimal(item: any): any {
    return JSON.parse(JSON.stringify(item), (key, value) => (typeof value === 'number' ? value.toFixed : value))
  }

  async putItem(item: Record<string, any>, partitionKey: string, sortKey?: string, options?: Record<string, any>): Promise<any> {
    item = DynamoDatasource.parseFloatToDecimal(item)

    item[this.partitionKey] = partitionKey

    if (sortKey) {
      item[this.sortKey] = sortKey
    }

    const params: PutItemCommandInput = {
      TableName: this.dynamoTableName,
      Item: marshall(item),
      ...options
    }

    return await this.dynamoTable.send(new PutItemCommand(params))
  }

  async getItem(partitionKey: string, sortKey?: string): Promise<any> {
    const params: GetItemCommandInput = {
      TableName: this.dynamoTableName,
      Key: {
        [this.partitionKey]: { S: partitionKey },
        [this.sortKey]: { S: sortKey || '' }
      }
    }

    console.log('params - [DYNAMO_DATASOURCE] - ', params)

    try {
      const response = await this.dynamoTable.send(new GetItemCommand(params))
      console.log('response - [DYNAMO_DATASOURCE] - ', response)

      if (!response.Item) {
        throw new Error('Item not found')
      }
      return response
    } catch (error: any) {
      console.error(error)
    }

  }

  async hardUpdateItem(partitionKey: string, sortKey: string, item: Record<string, any>): Promise<any> {
    item[this.partitionKey] = partitionKey

    if (sortKey) {
      item[this.sortKey] = sortKey
    }

    const params: PutItemCommandInput = {
      TableName: this.dynamoTableName,
      Item: DynamoDatasource.parseFloatToDecimal(item)
    }

    return await this.dynamoTable.send(new PutItemCommand(params))
  }

  async updateItem(partitionKey: string, sortKey: string, item: Record<string, any>): Promise<any> {
    item[this.partitionKey] = partitionKey

    if (sortKey) {
      item[this.sortKey] = sortKey
    }

    // const updateExpression = Object.keys(item).map(key => `${key} = :${key}`).join(', ');
    // const expressionAttributeValues = Object.keys(item).reduce((acc, key) => ({ ...acc, [`:${key}`]: marshall(item[key]) }), {});
    // const expressionAttributeNames = Object.keys(item).reduce((acc, key) => ({ ...acc, [`#${key}`]: key }), {});

    const updateExpression = Object.keys(item)
      .filter(key => key !== 'PK' && key !== 'SK')  // Exclua as chaves primárias
      .map(key => `#${key} = :${key}`)
      .join(', ')

    // expressionAttributeValues - [DYNAMO_DATASOURCE] -  { ':COUNTER': 1, ':PK': 1, ':SK': 1 }
    const expressionAttributeValues = Object.fromEntries(
      Object.entries(item)
        .filter(([key]) => key !== 'PK' && key !== 'SK')  // Exclua as chaves primárias
        .map(([key, value]) => [`:${key}`, value])
    )

    const expressionAttributeNames = Object.fromEntries(
      Object.keys(item)
        .filter(key => key !== 'PK' && key !== 'SK')  // Exclua as chaves primárias
        .map(key => [`#${key}`, key])
    )

    console.log('updateExpression - [DYNAMO_DATASOURCE] - ', updateExpression)
    console.log('expressionAttributeValues - [DYNAMO_DATASOURCE] - ', expressionAttributeValues)
    console.log('expressionAttributeNames - [DYNAMO_DATASOURCE] - ', expressionAttributeNames)

    const params: UpdateItemCommandInput = {
      TableName: this.dynamoTableName,
      Key: marshall({
        [this.partitionKey]: partitionKey,
        [this.sortKey]: sortKey
      }),
      UpdateExpression: `SET ${updateExpression}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: marshall(expressionAttributeValues),
      ReturnValues: 'ALL_NEW'
    }

    return await this.dynamoTable.send(new UpdateItemCommand(params))
  }

  async deleteItem(partitionKey: string, sortKey?: string): Promise<any> {
    const params: DeleteItemCommandInput = {
      TableName: this.dynamoTableName,
      Key: marshall({
        [this.partitionKey]: partitionKey,
        [this.sortKey]: sortKey || null
      })
    }

    return await this.dynamoTable.send(new DeleteItemCommand(params))
  }

  async getAllItems(): Promise<any> {
    const items: any[] = []
    let lastEvaluatedKey: Record<string, any> | undefined

    do {
      const params: ScanInput = {
        TableName: this.dynamoTableName,
        Select: 'ALL_ATTRIBUTES',
        ExclusiveStartKey: lastEvaluatedKey
      }

      const response = await this.dynamoTable.send(new ScanCommand(params))
      items.push(...response.Items!)

      lastEvaluatedKey = response.LastEvaluatedKey
    } while (lastEvaluatedKey)

    return {
      Items: items,
      Count: items.length,
      ScannedCount: items.length
    }
  }

  async scanItems(filterExpression: string, options: Record<string, any> = {}): Promise<any> {
    const params: ScanInput = {
      TableName: this.dynamoTableName,
      FilterExpression: filterExpression,
      ExpressionAttributeValues: options.expressionAttributeValues,
    }

    return await this.dynamoTable.send(new ScanCommand(params))
  }

  async query(keyConditionExpression: string, options: Record<string, any> = {}): Promise<any> {
    const params: QueryInput = {
      TableName: this.dynamoTableName,
      KeyConditionExpression: keyConditionExpression,
      ...options
    }

    return await this.dynamoTable.send(new QueryCommand(params))
  }

  async batchWriteItems(items: Record<string, any>[]): Promise<any> {
    const params: BatchWriteItemCommandInput = {
      RequestItems: {
        [`${''}`]: items.map(item => ({
          PutRequest: {
            Item: DynamoDatasource.parseFloatToDecimal(item)
          }
        }))
      }
    }

    return await this.dynamoTable.send(new BatchWriteItemCommand(params))
  }

  async batchDeleteItems(keys: Record<string, any>[]): Promise<any> {
    const params: BatchWriteItemCommandInput = {
      RequestItems: {
        [`${''}`]: keys.map(key => ({
          DeleteRequest: {
            Key: key
          }
        }))
      }
    }

    return await this.dynamoTable.send(new BatchWriteItemCommand(params))
  }
}