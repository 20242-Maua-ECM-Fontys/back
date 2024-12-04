/* eslint-disable @typescript-eslint/no-unused-vars */
import * as AWS from 'aws-sdk'

import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import {
    DynamoDBClient,
    waitUntilTableExists,
    ListTablesCommand,
    CreateTableCommand,
} from '@aws-sdk/client-dynamodb'

import { Environments } from '../../environments'
import { ScheduleRepositoryMock } from './schedule_repository_mock'
import { ScheduleRepositoryDynamo } from './schedule_repository_dynamo'
import { config } from 'dotenv'
config()

async function setupDynamoTable(): Promise<void> {
    const dynamoTableName = 'MauaScheduleTable'
    console.log('dynamoTableName - [SETUP_DYNAMO_TABLE] - ', dynamoTableName)
    const endpointUrl = 'http://localhost:8000'
    // JS SDK v3 does not support global configuration.
    // Codemod has attempted to pass values to each service client in this file.
    // You may need to update clients outside of this file, if they use global config.
    AWS.config.update({ region: 'sa-east-1' })

    console.log('Setting up DynamoDB table...')

    const dynamoClient = new DynamoDBClient({
        endpoint: endpointUrl,
        region: 'sa-east-1',
    })
    console.log('DynamoDB client created')

    const tables =
        (await dynamoClient.send(new ListTablesCommand({}))).TableNames || []

    if (!tables.includes(dynamoTableName)) {
        console.log('Creating table...')
        await dynamoClient.send(
            new CreateTableCommand({
                TableName: dynamoTableName,
                AttributeDefinitions: [
                    { AttributeName: 'PK', AttributeType: 'S' },
                    { AttributeName: 'SK', AttributeType: 'S' },
                    { AttributeName: 'email', AttributeType: 'S' },
                    { AttributeName: 'userId', AttributeType: 'S' },
                ],
                KeySchema: [
                    { AttributeName: 'PK', KeyType: 'HASH' },
                    { AttributeName: 'SK', KeyType: 'RANGE' },
                ],
                LocalSecondaryIndexes: [
                    {
                        IndexName: 'LSI1',
                        KeySchema: [
                            {
                                AttributeName: 'PK',
                                KeyType: 'HASH',
                            },
                            {
                                AttributeName: 'email',
                                KeyType: 'RANGE',
                            },
                        ],
                        Projection: {
                            ProjectionType: 'ALL',
                        },
                    },
                    {
                        IndexName: 'LSI2',
                        KeySchema: [
                            {
                                AttributeName: 'PK',
                                KeyType: 'HASH',
                            },
                            {
                                AttributeName: 'userId',
                                KeyType: 'RANGE',
                            },
                        ],
                        Projection: {
                            ProjectionType: 'ALL',
                        },
                    },
                ],
                ProvisionedThroughput: {
                    ReadCapacityUnits: 1,
                    WriteCapacityUnits: 1,
                },
            }),
        )

        console.log('Waiting for table to be created...')

        // Adicione um atraso aqui antes de verificar se a tabela existe.
        await new Promise((resolve) => setTimeout(resolve, 10000)) // Ajuste o tempo conforme necessário.

        await waitUntilTableExists(
            {
                client: dynamoClient,
                maxWaitTime: 200,
            },
            { TableName: dynamoTableName },
        )

        console.log('Loading table...')

        const dynamoDB = DynamoDBDocument.from(dynamoClient)

        console.log('Adding counter to table')

        await dynamoDB.put({
            TableName: dynamoTableName,
            Item: {
                PK: 'COUNTER',
                SK: 'COUNTER',
                'COUNTER': 0,
            },
        })

        console.log(`Table ${process.env.DYNAMO_TABLE_NAME} created!`)
    } else {
        console.log('Table already exists!')
    }
}

async function loadMockToLocalDynamo() {
    const mock = new ScheduleRepositoryMock()
    const dynamoRepo = new ScheduleRepositoryDynamo()

    let count = 0
    console.log('Loading mock to local DynamoDB...')

    console.log('Loading Classes')

    const classes = await mock.getAllClasses()

    for (const class_ of classes) {
        console.log(
            `Loading class ${class_.id} | ${class_.name} to dynamoDB...`,
        )
        console.log(
            '====================================================================================',
        )

        await dynamoRepo.createClass(class_)
        console.log('EH O BRANCASSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS')
        count += 1
    }
}

// async function loadMockToRealDynamo() {
//     const mock = new ScheduleRepositoryMock()
//     const dynamoRepo = new ScheduleRepositoryDynamo()

//     let count = 0
//     const dynamoDB = DynamoDBDocument.from(
//         new DynamoDBClient({
//             region: Environments.getEnvs().region,
//             endpoint: Environments.getEnvs().endpointUrl,
//         }),
//     )

//     dynamoDB.put({
//         TableName: Environments.getEnvs().dynamoTableName,
//         Item: {
//             PK: 'COUNTER',
//             SK: 'COUNTER',
//             'COUNTER': 0,
//         },
//     })

//     console.log('Loading mock to real DynamoDB...')

//     console.log(`${count} users loaded to real DynamoDB`)
// }

if (require.main === module) {
    ;(async () => {
        await setupDynamoTable()
        await loadMockToLocalDynamo()
    })()
} else {
    ;(async () => {
        await setupDynamoTable()
        await loadMockToLocalDynamo()
    })()
}
