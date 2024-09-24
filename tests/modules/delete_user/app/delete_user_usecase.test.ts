import { describe, it, expect } from 'vitest'
import { UserRepositoryMock } from '../../../../src/shared/infra/repositories/user_repository_mock'
import { DeleteUserUsecase } from '../../../../src/modules/delete_user/app/delete_user_usecase'

describe('Assert Delete User usecase is correct at all', () => {
  const repo = new UserRepositoryMock()
  const usecase = new DeleteUserUsecase(repo)

  it('Should activate usecase correctly', async () => {
    const lengthBefore = repo.getLength()
    await usecase.execute(1)
    const lengthAfter = repo.getLength()

    expect(lengthBefore).toBe(lengthAfter + 1)
  })
})