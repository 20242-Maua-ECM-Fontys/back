declare namespace NodeJS {
  interface ProcessEnv {
    STAGE: string
    REGION: string
    STACK_NAME: string
    AWS_ACCOUNT_ID: string
    DYNAMO_TABLE_NAME: string
    DYNAMO_PARTITION_KEY: string
    DYNAMO_SORT_KEY: string
    ENDPOINT_URL: string
    AWS_ACCESS_KEY_ID: string
    AWS_SECRET_ACCESS_KEY: string
  }
}