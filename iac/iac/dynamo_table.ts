import { Construct } from 'constructs'
import { Table, AttributeType, BillingMode } from 'aws-cdk-lib/aws-dynamodb'
import { CfnOutput, RemovalPolicy } from 'aws-cdk-lib'

export class TemplateDynamoTable extends Construct {
    public table: Table
    private githubRefName: string

    constructor(scope: Construct, constructId: string) {
        super(scope, constructId)

        if (process.env.DYNAMO_TABLE_NAME === undefined)
            throw new Error('DYNAMO_TABLE_NAME is undefined')

        this.githubRefName = process.env.GITHUB_REF_NAME || 'dev'

        const removalPolicy = this.githubRefName.includes('prod')
            ? RemovalPolicy.RETAIN
            : RemovalPolicy.DESTROY

        this.table = new Table(this, 'ScheduleTable', {
            tableName: process.env.DYNAMO_TABLE_NAME,
            partitionKey: {
                name: 'PK',
                type: AttributeType.STRING,
            },
            sortKey: {
                name: 'SK',
                type: AttributeType.STRING,
            },
            billingMode: BillingMode.PAY_PER_REQUEST,
            removalPolicy: RemovalPolicy.DESTROY,
        })

        this.table.addLocalSecondaryIndex({
            indexName: 'LSI1',
            sortKey: {
                name: 'email',
                type: AttributeType.STRING,
            },
        })
        this.table.addLocalSecondaryIndex({
            indexName: 'LSI2',
            sortKey: {
                name: 'userId',
                type: AttributeType.STRING,
            },
        })

        new CfnOutput(this, 'DynamoScheduleRemovalPolicy', {
            value: removalPolicy.toString(),
            exportName: `MauaGrid${this.githubRefName}DynamoScheduleRemovalPolicyValue`,
        })
    }
}
