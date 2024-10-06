import { describe, it, expect, beforeEach } from 'vitest'
import { User } from '../../../src/shared/domain/entities/user'
import { ROLE } from '../../../src/shared/domain/enums/role_enum'
import { UserRepositoryMock } from '../../../src/shared/infra/repositories/user_repository_mock'
import { NoItemsFound } from '../../../src/shared/helpers/errors/usecase_errors'

describe('Assert User Repository Mock is correct at all', () => {
  let repo: UserRepositoryMock;

  beforeEach(() => {
    repo = new UserRepositoryMock();
  });

  it('Should create user correctly', async () => {
    const user = new User({
      id: 10,
      name: 'usuario10',
      email: 'usuario10@gmail.com',
      role: ROLE.STAFF,
      RA: '99.00000-1',
      password: 'Password10@',
  
    });

    const lastLength = repo.getLength();
    await repo.createUser(user);
    const newLength = repo.getLength();

    expect(newLength).toEqual(lastLength + 1);
  });

  it('Should get user correctly', async () => {
    const user = await repo.getUser(1);

    expect(user?.id).toEqual(1);
    expect(user?.name).toEqual('user1');
    expect(user?.email).toEqual('user1@gmail.com');
    expect(user?.role).toEqual(ROLE.STAFF);
  });

  it('Should get all users correctly', async () => {
    const users = await repo.getAllUsers();

    expect(users.length).toEqual(3); // Updated to reflect the initial users count
  });

  it('Should update user correctly', async () => {
    const userUpdated = await repo.updateUser(1, 'usuario1', 'usuario1@gmail.com');

    expect(userUpdated?.id).toEqual(1);
    expect(userUpdated?.name).toEqual('usuario1');
    expect(userUpdated?.email).toEqual('usuario1@gmail.com');
    expect(userUpdated?.role).toEqual(ROLE.STAFF);
  });

  it('Should delete user correctly', async () => {
    const lastLength = repo.getLength();
    await repo.deleteUser(1);
    const newLength = repo.getLength();

    expect(newLength).toEqual(lastLength - 1);
  });

  it('Should throw error when getting a non-existent user', async () => {
    await expect(repo.getUser(999)).rejects.toThrow(NoItemsFound);
  });

  it('Should throw error when updating a non-existent user', async () => {
    await expect(repo.updateUser(999, 'usuario', 'usuario@gmail.com')).rejects.toThrow(NoItemsFound);
  });

  it('Should throw error when deleting a non-existent user', async () => {
    await expect(repo.deleteUser(999)).rejects.toThrow(NoItemsFound);
  });

  it('Should login user correctly', async () => {
    const user = await repo.loginUser('user1@gmail.com', 'Password1@');
    expect(user.id).toEqual(1);
  });

  it('Should throw error when logging in with invalid credentials', async () => {
    await expect(repo.loginUser('user1@gmail.com', 'WrongPassword')).rejects.toThrow(NoItemsFound);
    await expect(repo.loginUser('wrongemail@gmail.com', 'Password1@')).rejects.toThrow(NoItemsFound);
  });
});
