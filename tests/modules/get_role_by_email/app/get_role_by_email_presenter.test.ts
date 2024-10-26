import { describe, it, expect } from 'vitest';
import { GetRoleByEmailPresenter } from '../../../../src/modules/get_role_by_email/app/get_role_by_email_presenter';
import { HttpRequest } from '../../../../src/shared/helpers/external_interfaces/http_models';
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock';

describe('Tests for GetRoleByEmailPresenter', () => {
  it('Should call presenter and return status 200', async () => {
    const repo = new ScheduleRepositoryMock();
  
    const event = new HttpRequest(
      { email: 'user1@gmail.com' }, 
      undefined,
      {},
      undefined,
    );

    const response = await GetRoleByEmailPresenter(event, repo);

    expect(response?.statusCode).toEqual(200);
    expect(response?.data).toEqual({
      role: 'STAFF', 
    });
  });
});
