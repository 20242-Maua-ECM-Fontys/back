import { describe, it, expect } from 'vitest';
import { GetRoleByEmailUsecase } from '../../../../src/modules/get_role_by_email/app/get_role_by_email_usecase';
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock';
import { NoItemsFound } from '../../../../src/shared/helpers/errors/usecase_errors';

describe('GetRoleByEmailUsecase', () => {
  it('should return the correct role for a valid email', async () => {
    const repo = new ScheduleRepositoryMock();
    const usecase = new GetRoleByEmailUsecase(repo);

    const userData = await usecase.execute('user1@gmail.com');
    expect(userData.role).toBe('STAFF');
    expect(userData.userId).toBe(1);
  });

  it('should throw NoItemsFound error if the user is not found', async () => {
    const repo = new ScheduleRepositoryMock();
    const usecase = new GetRoleByEmailUsecase(repo);

    await expect(usecase.execute('nonexistent@gmail.com')).rejects.toThrow(
      new NoItemsFound('email')
    );
  });
});
