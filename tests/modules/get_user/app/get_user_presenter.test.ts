import { expect, it, describe } from 'vitest'
import { handler } from '../../../../src/modules/get_user/app/get_user_presenter'

describe('Assert Get User presenter is correct at all', () => {
  it('Assert Get User presenter is correct when creating', async () => {
    const event = {
      'version': '2.0',
      'routeKey': '$default',
      'rawPath': '/my/path',
      'rawQueryString': 'parameter1=value1&parameter1=value2&parameter2=value',
      'cookies': [
        'cookie1',
        'cookie2'
      ],
      'headers': {
        'header1': 'value1',
        'header2': 'value1,value2'
      },
      'queryStringParameters': {
        'id': '1'
      },
      'requestContext': {
        'accountId': '123456789012',
        'apiId': '<urlid>',
        'authentication': null,
        'authorizer': {
          'iam': {
            'accessKey': 'AKIA...',
            'accountId': '111122223333',
            'callerId': 'AIDA...',
            'cognitoIdentity': null,
            'principalOrgId': null,
            'userArn': 'arn:aws:iam::111122223333:user/example-user',
            'userId': 'AIDA...'
          }
        },
        'domainName': '<url-id>.lambda-url.us-west-2.on.aws',
        'domainPrefix': '<url-id>',
        'external_interfaces': {
          'method': 'POST',
          'path': '/my/path',
          'protocol': 'HTTP/1.1',
          'sourceIp': '123.123.123.123',
          'userAgent': 'agent'
        },
        'requestId': 'id',
        'routeKey': '$default',
        'stage': '$default',
        'time': '12/Mar/2020:19:03:58 +0000',
        'timeEpoch': 1583348638390
      },
      'body': 'Hello from client!',
      'pathParameters': null,
      'isBase64Encoded': null,
      'stageVariables': null
    }

    const response = await handler(event, null)

    expect(response?.statusCode).toEqual(200)
    expect(JSON.parse(response?.body)['id']).toEqual(1)
    expect(JSON.parse(response?.body)['name']).toEqual('user1')
    expect(JSON.parse(response?.body)['email']).toEqual('user1@gmail.com')
    expect(JSON.parse(response?.body)['state']).toEqual('PENDING')
  })
})