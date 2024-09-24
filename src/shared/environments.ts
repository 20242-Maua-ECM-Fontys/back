import { STAGE } from './domain/enums/stage_enum'
import { IUserRepository } from './domain/repositories/user_repository_interface'
import { UserRepositoryDynamo } from './infra/repositories/user_repository_dynamo'
import { UserRepositoryMock } from './infra/repositories/user_repository_mock'
import { config } from 'dotenv'
config()

export class Environments {
  stage: STAGE = STAGE.TEST
  s3BucketName: string = ''
  region: string = ''
  endpointUrl: string = ''
  dynamoTableName: string = ''
  dynamoPartitionKey: string = ''
  dynamoSortKey: string = ''
  cloudFrontGetUserPresenterDistributionDomain: string = ''
  mssName: string = ''

  configureLocal() {
    console.log('process.env.STAGE - [ENVIRONMENTS - { CONFIGURE LOCAL }] - ', process.env.STAGE)
    process.env.STAGE = process.env.STAGE || 'TEST'
  }

  loadEnvs() {
    if (!process.env.STAGE) {
      this.configureLocal()
    }

    
    this.stage = process.env.STAGE as STAGE

    console.log('process.env.STAGE - [CHEGOU NO LOAD_ENVS] - ', process.env.STAGE)
    console.log('process.env.DYNAMOTABLENAME - [CHEGOU NO LOAD_ENVS] - ', process.env.DYNAMO_TABLE_NAME)
    console.log('process.env.ENDPOINT_URL - [CHEGOU NO LOAD_ENVS] - ', process.env.ENDPOINT_URL)
    console.log('process.env.REGION - [CHEGOU NO LOAD_ENVS] - ', process.env.REGION)
    console.log('this.stage - [CHEGOU NO LOAD_ENVS] - ', this.stage)
    console.log('this.DYNAMOTABLENAME - [CHEGOU NO LOAD_ENVS] - ', this.dynamoTableName)
    this.mssName = process.env.MSS_NAME as string

    if (this.stage === STAGE.TEST) {
      this.s3BucketName = 'bucket-test'
      this.region = 'sa-east-1'
      this.endpointUrl = 'http://localhost:8000'
      this.dynamoTableName = 'UserMssTemplateTable'
      this.dynamoPartitionKey = 'PK'
      this.dynamoSortKey = 'SK'
      this.cloudFrontGetUserPresenterDistributionDomain = 'https://d3q9q9q9q9q9q9.cloudfront.net'
    } else {
      this.s3BucketName = process.env.S3_BUCKET_NAME as string
      this.region = process.env.REGION as string
      this.endpointUrl = process.env.ENDPOINT_URL as string
      this.dynamoTableName = process.env.DYNAMO_TABLE_NAME as string
      this.dynamoPartitionKey = process.env.DYNAMO_PARTITION_KEY as string
      this.dynamoSortKey = process.env.DYNAMO_SORT_KEY as string
      this.cloudFrontGetUserPresenterDistributionDomain = process.env.CLOUD_FRONT_DISTRIBUTION_DOMAIN as string
    }
  }

  static getUserRepo(): IUserRepository {
    console.log('Environments.getEnvs().stage - [ENVIRONMENTS - { GET USER REPO }] - ', Environments.getEnvs().stage)

    if (Environments.getEnvs().stage === STAGE.TEST) {
      return new UserRepositoryMock()
    } else if (Environments.getEnvs().stage === STAGE.DEV || Environments.getEnvs().stage === STAGE.PROD) {
      return new UserRepositoryDynamo()
    } else {
      throw new Error('Invalid STAGE')
    }
  }

  static getEnvs() {
    const envs = new Environments()
    envs.loadEnvs()
    return envs
  }
}
