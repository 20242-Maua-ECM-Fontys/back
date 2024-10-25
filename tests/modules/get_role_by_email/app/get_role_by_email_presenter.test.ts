import { describe, it, expect } from 'vitest';
import { getRoleByEmailPresenter } from '../../../../src/modules/get_role_by_email/app/get_role_by_email_presenter';
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock';
import { IRequest } from '../../../../src/shared/helpers/external_interfaces/external_interface';
import { HttpResponse } from '../../../../src/shared/helpers/external_interfaces/http_models';

describe('getRoleByEmailPresenter', () => {
  it('should return the correct role in response', async () => {
    const repo = new ScheduleRepositoryMock();

    const httpRequest: IRequest = {
      data: { email: 'user1@gmail.com' },
    };

    const response: HttpResponse = await getRoleByEmailPresenter(httpRequest, repo);

    expect(response?.statusCode).toBe(200);
    expect(response?.body).toEqual({
      role: 'STAFF',
    });
  });

  it('should return 400 BadRequest if email is missing', async () => {
    const repo = new ScheduleRepositoryMock();

    const httpRequest: IRequest = { data: {} };

    const response: HttpResponse = await getRoleByEmailPresenter(httpRequest, repo);

    expect(response?.statusCode).toBe(400);
    expect(response?.body.message).toBe('Missing email parameter');
  });

  it('should return 400 BadRequest for invalid email format', async () => {
    const repo = new ScheduleRepositoryMock();

    const httpRequest: IRequest = {
      data: { email: 'invalid-email' },
    };

    const response: HttpResponse = await getRoleByEmailPresenter(httpRequest, repo);

    expect(response?.statusCode).toBe(400);
    expect(response?.body.message).toBe('Invalid email format');
  });

  it('should return 404 NotFound if user is not found', async () => {
    const repo = new ScheduleRepositoryMock();

    const httpRequest: IRequest = {
      data: { email: 'nonexistent@gmail.com' },
    };

    const response: HttpResponse = await getRoleByEmailPresenter(httpRequest, repo);

    expect(response?.statusCode).toBe(404);
    expect(response?.body.message).toBe('No items found for email');
  });
});
