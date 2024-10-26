import { describe, it, expect, vi, afterEach } from 'vitest';
import { GetRoleByEmailController } from '../../../../src/modules/get_role_by_email/app/get_role_by_email_controller';
import { GetRoleByEmailUsecase } from '../../../../src/modules/get_role_by_email/app/get_role_by_email_usecase';
import { IRequest } from '../../../../src/shared/helpers/external_interfaces/external_interface';
import { BadRequest, NotFound, OK, InternalServerError } from '../../../../src/shared/helpers/external_interfaces/http_codes';
import { NoItemsFound } from '../../../../src/shared/helpers/errors/usecase_errors';
import { User } from '../../../../src/shared/domain/entities/user';

describe('GetRoleByEmailController', () => {
  const mockUsecase = {
    execute: vi.fn(),
  };
  const controller = new GetRoleByEmailController(mockUsecase as unknown as GetRoleByEmailUsecase);

  afterEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks();
  });

  it('should return BadRequest if email is missing', async () => {
    const request: IRequest = { data: {} };
    const response = await controller.handle(request);

    expect(response).toBeInstanceOf(BadRequest);
    expect(response).toEqual(new BadRequest('Missing email parameter'));
  });

  it('should return BadRequest if email format is invalid', async () => {
    const request: IRequest = { data: { email: 'invalid-email-format' } };

    vi.spyOn(User, 'validateEmail').mockReturnValue(false);
    const response = await controller.handle(request);

    expect(User.validateEmail).toHaveBeenCalledWith('invalid-email-format');
    expect(response).toBeInstanceOf(BadRequest);
    expect(response).toEqual(new BadRequest('Invalid email format'));
  });

  it('should return NotFound if no user role is found for email', async () => {
    const request: IRequest = { data: { email: 'user@example.com' } };

    // Garantir que a validação do email passe neste teste
    vi.spyOn(User, 'validateEmail').mockReturnValue(true);
    mockUsecase.execute.mockRejectedValue(new NoItemsFound('email'));
    const response = await controller.handle(request);

    expect(response).toEqual(new NotFound('No items found for email'));
  });

  it('should return OK with the role if email is valid and role is found', async () => {
    const request: IRequest = { data: { email: 'user@example.com' } };
    const role = 'admin';

    mockUsecase.execute.mockResolvedValue(role);
    vi.spyOn(User, 'validateEmail').mockReturnValue(true);

    const response = await controller.handle(request);

    expect(User.validateEmail).toHaveBeenCalledWith('user@example.com');
    expect(response).toBeInstanceOf(OK);
    expect(response).toEqual(new OK({ role }));
  });

  it('should return InternalServerError for unexpected errors', async () => {
    const request: IRequest = { data: { email: 'user@example.com' } };

    mockUsecase.execute.mockRejectedValue(new Error('Unexpected error'));
    const response = await controller.handle(request);

    expect(response).toBeInstanceOf(InternalServerError);
    expect(response).toEqual(new InternalServerError('Unexpected error'));
  });
});
