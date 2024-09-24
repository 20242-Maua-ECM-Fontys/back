import { describe, it, expect } from 'vitest'
import { User } from '../../../../src/shared/domain/entities/user'
import { STATE } from '../../../../src/shared/domain/enums/state_enum'
import { UserRepositoryMock } from '../../../../src/shared/infra/repositories/user_repository_mock'

describe('Assert User Repository Mock is correct at all', () => {
  it('Should create user correctly', async () => {
    const user = new User({
      id: 10,
      name: 'usuario10',
      email: 'usuario10@gmail.com',
      state: STATE.PENDING
    })

    const repo = new UserRepositoryMock()
    const lastLength = repo.getLength()
    await repo.createUser(user)
    const newLength = repo.getLength()

    expect(newLength).toEqual(lastLength + 1)
  })
  it('Should get user correctly', async () => {
    const repo = new UserRepositoryMock()
    const user = await repo.getUser(1)

    expect(user?.id).toEqual(1)
    expect(user?.name).toEqual('user1')
    expect(user?.email).toEqual('user1@gmail.com')
    expect(user?.state).toEqual(STATE.PENDING)
  })
  it('Should get all users correctly', async () => {
    const repo = new UserRepositoryMock()
    const users = await repo.getAllUsers()

    expect(users.length).toEqual(2)
  })
  it('Should update user correctly', async () => {
    const repo = new UserRepositoryMock()
    
    const userUpdated = await repo.updateUser(1, 'usuario1', 'usuario1@gmail.com')

    expect(userUpdated?.id).toEqual(1)
    expect(userUpdated?.name).toEqual('usuario1')
    expect(userUpdated?.email).toEqual('usuario1@gmail.com')
    expect(userUpdated?.state).toEqual(STATE.PENDING)
  })
  it('Should delete user correctly', async () => {
    const repo = new UserRepositoryMock()
    const lastLength = repo.getLength()
    await repo.deleteUser(1)
    const newLength = repo.getLength()

    expect(newLength).toEqual(lastLength - 1)
  })
})