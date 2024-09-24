import { Stack, StackProps } from 'aws-cdk-lib'
import { Cors, RestApi } from 'aws-cdk-lib/aws-apigateway'
import { Construct } from 'constructs'
import { TemplateDynamoTable } from './template_dynamo_table'
import { LambdaStack } from './lambda_stack'

export class TemplateStack extends Stack {
  constructor(scope: Construct, constructId: string, props?: StackProps) {
    super(scope, constructId, props)

    const restApi = new RestApi(this, 'Template_RestApi', {
      restApiName: 'Template_RestApi',
      description: 'This is the Template RestApi',
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowHeaders: ['*']
      }
    })

    const apigatewayResource = restApi.root.addResource('mss-template', {
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowHeaders: Cors.DEFAULT_HEADERS
      }
    })

    const dynamoTable = new TemplateDynamoTable(this, 'UserMssTemplateTable')

    const ENVIRONMENT_VARIABLES = {
      'STAGE': process.env.STAGE,
      'DYNAMO_TABLE_NAME': dynamoTable.table.tableName,
      'DYNAMO_PARTITION_KEY': 'PK',
      'DYNAMO_SORT_KEY': 'SK',
      'REGION': process.env.REGION,
      'ENDPOINT_URL': process.env.ENDPOINT_URL
    }

    const lambdaStack = new LambdaStack(this, apigatewayResource, ENVIRONMENT_VARIABLES)

    dynamoTable.table.grantReadWriteData(lambdaStack.getUserFunction)
    dynamoTable.table.grantReadWriteData(lambdaStack.createUserFunction)
    dynamoTable.table.grantReadWriteData(lambdaStack.deleteUserFunction)
    dynamoTable.table.grantReadWriteData(lambdaStack.updateUserFunction)
    dynamoTable.table.grantReadWriteData(lambdaStack.getAllUsersFunction)

  }
}