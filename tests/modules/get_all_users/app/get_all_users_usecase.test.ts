import { describe, it, expect } from 'vitest'
import { UserRepositoryMock } from '../../../../src/shared/infra/repositories/user_repository_mock'
import { GetAllUsersUsecase } from '../../../../src/modules/get_all_users/app/get_all_users_usecase'

describe('Assert Get All Users usecase is correct at all', () => {
  it('Should activate usecase correctly', async () => {
    const repo = new UserRepositoryMock()
    const usecase = new GetAllUsersUsecase(repo)

    const users = await usecase.execute()

    expect(users.length).toBe(2)
  })
})
