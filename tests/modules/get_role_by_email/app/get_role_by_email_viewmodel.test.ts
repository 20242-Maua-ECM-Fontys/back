import { describe, it, expect } from 'vitest';
import { GetRoleByEmailViewModel } from '../../../../src/modules/get_role_by_email/app/get_role_by_email_viewmodel';

describe('GetRoleByEmailViewModel', () => {
  it('should correctly transform role to viewmodel', () => {
    const viewModel = new GetRoleByEmailViewModel({
      role: 'STAFF',
      userId: 1,
    }).toJSON();

    expect(viewModel).toEqual({
      role: 'STAFF',
      userId: 1,
      message: 'role and userId by email returned',
    });
  });
});
