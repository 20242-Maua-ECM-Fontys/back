import { describe, it, expect } from 'vitest'
import { User } from '../../../../src/shared/domain/entities/user'
import { UserRepositoryMock } from '../../../../src/shared/infra/repositories/user_repository_mock'
import { ROLE } from '../../../../src/shared/domain/enums/role_enum'

describe('Assert User Repository Mock is correct at all', () => {
  it('Should get length correctly', async () => {
    const repo = new UserRepositoryMock()
    const length = repo.getLength()

    expect(length).toEqual(2)
  })
  it('Should get user correctly', async () => {
    const repo = new UserRepositoryMock()
    const user = await repo.getUser(1)

    expect(user?.id).toEqual(1)
    expect(user?.name).toEqual('user1')
    expect(user?.email).toEqual('user1@gmail.com')
    expect(user?.role).toEqual(ROLE.STAFF)
    expect(user?.RA).toEqual('21.00000-1')
    expect(user?.password).toEqual('Password1@')
  })
  it('Should get all users correctly', async () => {
    const repo = new UserRepositoryMock()
    const users = await repo.getAllUsers()

    expect(users.length).toEqual(2)
  })
  it('Should create user correctly', async () => {
    const user = new User({
      id: 10,
      name: 'usuario10',
      email: 'usuario10@gmail.com',
      role: ROLE.PROFESSOR,
      RA: '10.00000-1',
      password: 'Password10@',
    })

    const repo = new UserRepositoryMock()
    const lastLength = repo.getLength()
    await repo.createUser(user)
    const newLength = repo.getLength()

    expect(newLength).toEqual(lastLength + 1)
  })
})