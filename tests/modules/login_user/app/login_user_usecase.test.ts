import { it, expect, describe } from 'vitest'
import { UserRepositoryMock } from '../../../../src/shared/infra/repositories/user_repository_mock'
import { LoginUserUsecase } from '../../../../src/modules/login_user/app/login_user_usecase'
import { ROLE } from '../../../../src/shared/domain/enums/role_enum'
import { NoItemsFound } from '../../../../src/shared/helpers/errors/usecase_errors'

describe('Assert Login User usecase is correct', () => {

  it('Should login the user with correct email and password', async () => {
    const repo = new UserRepositoryMock()
    const usecase = new LoginUserUsecase(repo)

    const user = await usecase.execute('user1@gmail.com', 'Password1@')

    expect(user.props).toEqual({
      id: 1,
      name: 'user1',
      email: 'user1@gmail.com',
      role: ROLE.STAFF,
      RA: '21.00000-1',
      password: 'Password1@'
    })
  })

  it('Should throw an error if email is incorrect', async () => {
    const repo = new UserRepositoryMock()
    const usecase = new LoginUserUsecase(repo)

    await expect(usecase.execute('wrongemail@gmail.com', 'Password1@')).rejects.toThrow(NoItemsFound)
  })

  it('Should throw an error if password is incorrect', async () => {
    const repo = new UserRepositoryMock()
    const usecase = new LoginUserUsecase(repo)

    await expect(usecase.execute('user1@gmail.com', 'WrongPassword')).rejects.toThrow('Invalid password format')
  })

  it('Should throw an error if email or password are missing', async () => {
    const repo = new UserRepositoryMock()
    const usecase = new LoginUserUsecase(repo)

    await expect(usecase.execute('', 'Password1@')).rejects.toThrow('Field Email and password are required is not valid')
    await expect(usecase.execute('user1@gmail.com', '')).rejects.toThrow('Field Email and password are required is not valid')
  })
  it('Should throw an error if email is in an invalid format', async () => {
    const repo = new UserRepositoryMock();
    const usecase = new LoginUserUsecase(repo);

    await expect(usecase.execute('invalid-email', 'Password1@')).rejects.toThrow('Invalid email format');
  });

  it('Should throw an error if password is in an invalid format (missing special character)', async () => {
    const repo = new UserRepositoryMock();
    const usecase = new LoginUserUsecase(repo);

    await expect(usecase.execute('user1@gmail.com', 'Password1')).rejects.toThrow('Invalid password format');
  });

  it('Should throw an error if password is in an invalid format (missing uppercase letter)', async () => {
    const repo = new UserRepositoryMock();
    const usecase = new LoginUserUsecase(repo);

    await expect(usecase.execute('user1@gmail.com', 'password1@')).rejects.toThrow('Invalid password format');
  });

  it('Should throw an error if password is in an invalid format (missing lowercase letter)', async () => {
    const repo = new UserRepositoryMock();
    const usecase = new LoginUserUsecase(repo);

    await expect(usecase.execute('user1@gmail.com', 'PASSWORD1@')).rejects.toThrow('Invalid password format');
  });

  it('Should throw an error if password is too short (less than 8 characters)', async () => {
    const repo = new UserRepositoryMock();
    const usecase = new LoginUserUsecase(repo);

    await expect(usecase.execute('user1@gmail.com', 'P1@')).rejects.toThrow('Invalid password format');
  });

})
