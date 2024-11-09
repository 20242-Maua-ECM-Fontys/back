import { describe, it, expect, beforeEach } from 'vitest';
import { GetRoleByEmailPresenter } from '../../../../src/modules/get_role_by_email/app/get_role_by_email_presenter';
import { HttpRequest } from '../../../../src/shared/helpers/external_interfaces/http_models';
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock';

describe('Tests for GetRoleByEmailPresenter', () => {
  let repo: ScheduleRepositoryMock;

  beforeEach(() => {
    repo = new ScheduleRepositoryMock();
  });

  it('Should call presenter and return status 200', async () => {
    const event = new HttpRequest(
      { email: 'user1@gmail.com' }, 
      undefined,
      {},
      undefined,
    );

    const response = await GetRoleByEmailPresenter(event, repo);

    expect(response?.statusCode).toEqual(200);
    expect(response?.data).toEqual({
      "message": "role and userId by email returned",
    "role": "STAFF",
    "userId": 1});
  });

  it('Should return 400 BadRequest when email is missing', async () => {
    const event = new HttpRequest(
      {}, 
      undefined,
      {},
      undefined,
    );

    const response = await GetRoleByEmailPresenter(event, repo);

    expect(response?.statusCode).toEqual(400);
    expect(response?.data).toEqual({
      "body": "Field email is missing",
    });
  });

  it('Should return 400 BadRequest when email format is invalid', async () => {
    const event = new HttpRequest(
      { email: 'invalid-email' }, 
      undefined,
      {},
      undefined,
    );

    const response = await GetRoleByEmailPresenter(event, repo);

    expect(response?.statusCode).toEqual(400);
    expect(response?.data).toEqual({
      "body": "Invalid email format",
    });
  });

  it('Should return 404 NotFound when email does not exist', async () => {
    const event = new HttpRequest(
      { email: 'nonexistent@gmail.com' }, 
      undefined,
      {},
      undefined,
    );

    const response = await GetRoleByEmailPresenter(event, repo);

    expect(response?.statusCode).toEqual(404);
    expect(response?.data).toEqual({
   "body": "No items found for email",
    });
  });
});
