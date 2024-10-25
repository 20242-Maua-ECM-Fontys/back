import { describe, it, expect } from 'vitest';
import { GetRoleByEmailController } from '../../../../src/modules/get_role_by_email/app/get_role_by_email_controller';
import { GetRoleByEmailUsecase } from '../../../../src/modules/get_role_by_email/app/get_role_by_email_usecase';
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock';
import { BadRequest, NotFound, OK } from '../../../../src/shared/helpers/external_interfaces/http_codes';
import { IRequest } from '../../../../src/shared/helpers/external_interfaces/external_interface';

describe('GetRoleByEmailController', () => {
  it('should return 200 OK with the correct role', async () => {
    const repo = new ScheduleRepositoryMock();
    const usecase = new GetRoleByEmailUsecase(repo);
    const controller = new GetRoleByEmailController(usecase);

    const request: IRequest = {
      data: { email: 'user1@gmail.com' },
    };

    const response = await controller.handle(request);

    expect(response).toBeInstanceOf(OK);
    expect(response?.statusCode).toBe(200);
    expect(response?.body).toEqual({
      role: 'STAFF',
    });
  });

  it('should return 400 BadRequest if email is missing', async () => {
    const repo = new ScheduleRepositoryMock();
    const usecase = new GetRoleByEmailUsecase(repo);
    const controller = new GetRoleByEmailController(usecase);

    const request: IRequest = { data: {} };

    const response = await controller.handle(request);

    expect(response).toBeInstanceOf(BadRequest);
    expect(response?.statusCode).toBe(400);
    expect(response?.body.message).toBe('Missing email parameter');
  });

  it('should return 400 BadRequest for invalid email format', async () => {
    const repo = new ScheduleRepositoryMock();
    const usecase = new GetRoleByEmailUsecase(repo);
    const controller = new GetRoleByEmailController(usecase);

    const request: IRequest = {
      data: { email: 'invalid-email' },
    };

    const response = await controller.handle(request);

    expect(response).toBeInstanceOf(BadRequest);
    expect(response?.statusCode).toBe(400);
    expect(response?.body.message).toBe('Invalid email format');
  });

  it('should return 404 NotFound if user is not found', async () => {
    const repo = new ScheduleRepositoryMock();
    const usecase = new GetRoleByEmailUsecase(repo);
    const controller = new GetRoleByEmailController(usecase);

    const request: IRequest = {
      data: { email: 'nonexistent@gmail.com' },
    };

    const response = await controller.handle(request);

    expect(response).toBeInstanceOf(NotFound);
    expect(response?.statusCode).toBe(404);
    expect(response?.body.message).toBe('No items found for email');
  });
});
