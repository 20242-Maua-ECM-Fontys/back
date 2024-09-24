import { DynamoDBClient } from '@aws-sdk/client-dynamodb'

export class DynamoTable {
  private dynamoTable?: DynamoDBClient

  constructor(private region: string, private endpointUrl?: string) {}

  async _enter_(): Promise<DynamoDBClient> {
    const s = new DynamoDBClient({
      region: this.region,
      endpoint: this.endpointUrl
    })

    this.dynamoTable = s
    return this.dynamoTable
  }
}