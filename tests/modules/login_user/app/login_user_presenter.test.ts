import { expect, it, describe, vi, beforeEach } from 'vitest';
import { loginUserPresenter } from '../../../../src/modules/login_user/app/login_user_presenter';

describe('Assert Login User presenter is correct at all', () => {

  it('Assert Login User presenter is correct when logging in', async () => {
   
    const event = {
      version: '2.0',
      routeKey: '$default',
      rawPath: '/login',
      headers: {
        'Content-Type': 'application/json'
      },
      queryStringParameters: null,
      requestContext: {
        external_interfaces: {
          method: 'POST',
          path: '/login',
          protocol: 'HTTP/1.1',
          sourceIp: '123.123.123.123',
          userAgent: 'agent'
        },
      },
      body: JSON.stringify({ email: 'user1@gmail.com', password: 'Password1@' })
    };



    const response = await loginUserPresenter(event);

    expect(response?.statusCode).toEqual(200);
    const responseBody = JSON.parse(response?.body);
    expect(responseBody.message).toEqual('the login was successful');
    expect(responseBody.type).toEqual('STAFF');
  });
});
