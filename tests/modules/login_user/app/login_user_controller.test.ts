import { it, expect, describe } from 'vitest';
import { UserRepositoryMock } from '../../../../src/shared/infra/repositories/user_repository_mock';
import { LoginUserUsecase } from '../../../../src/modules/login_user/app/login_user_usecase';
import { LoginUserController } from '../../../../src/modules/login_user/app/login_user_controller';
import { HttpRequest } from '../../../../src/shared/helpers/external_interfaces/http_models';

describe('Assert Login User controller is correct at all', () => {
  it('Assert Login User controller is correct when logging in with valid credentials', async () => {
    const repo = new UserRepositoryMock();
    const usecase = new LoginUserUsecase(repo);
    const controller = new LoginUserController(usecase);

    const request = new HttpRequest(undefined, undefined, { email: 'user1@gmail.com', password: 'Password1@' });

    const response = await controller.handle(request);

    expect(response?.statusCode).toEqual(200);
    expect(response?.body.message).toEqual('the login was successful');
    expect(response?.body.type).toEqual('STAFF'); 
  });

  it('Assert Login User controller is not correct when email and password are missing', async () => {
    const repo = new UserRepositoryMock();
    const usecase = new LoginUserUsecase(repo);
    const controller = new LoginUserController(usecase);

    const request = new HttpRequest(undefined, undefined, { email: undefined, password: undefined });

    const response = await controller.handle(request);

    expect(response?.statusCode).toEqual(400);
    expect(response?.body).toBe('Field email and password is missing');
  });

  it('Assert Login User controller is not correct when email is missing', async () => {
    const repo = new UserRepositoryMock();
    const usecase = new LoginUserUsecase(repo);
    const controller = new LoginUserController(usecase);

    const request = new HttpRequest(undefined, undefined, { email: undefined, password: 'Password1@' });

    const response = await controller.handle(request);

    expect(response?.statusCode).toEqual(400);
    expect(response?.body).toBe('Field email and password is missing');
  });

  it('Assert Login User controller is not correct when password is missing', async () => {
    const repo = new UserRepositoryMock();
    const usecase = new LoginUserUsecase(repo);
    const controller = new LoginUserController(usecase);

    const request = new HttpRequest(undefined, undefined, { email: 'user1@gmail.com', password: undefined });

    const response = await controller.handle(request);

    expect(response?.statusCode).toEqual(400);
    expect(response?.body).toBe('Field email and password is missing');
  });

  it('Assert Login User controller is not correct when credentials are invalid', async () => {
    const repo = new UserRepositoryMock();
    const usecase = new LoginUserUsecase(repo);
    const controller = new LoginUserController(usecase);

    const request = new HttpRequest(undefined, undefined, { email: 'invalid@gmail.com', password: 'wrongPassword' });

    const response = await controller.handle(request);

    expect(response?.statusCode).toEqual(404);
    expect(response?.body).toBe('No items found for Invalid email or password');
  });
});
