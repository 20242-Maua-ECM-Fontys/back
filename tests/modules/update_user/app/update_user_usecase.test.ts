import { describe, it, expect } from 'vitest'
import { UserRepositoryMock } from '../../../../src/shared/infra/repositories/user_repository_mock'
import { UpdateUserUsecase } from '../../../../src/modules/update_user/app/update_user_usecase'
import { STATE } from '../../../../src/shared/domain/enums/state_enum'

describe('Assert Update User usecase is correct at all', () => {
  it('Should activate usecase correctly', async () => {
    const repo = new UserRepositoryMock()
    const usecase = new UpdateUserUsecase(repo)

    const user = await usecase.execute(1, 'usuario1', 'usuario1@gmail.com')

    expect(user.props).toEqual({
      id: 1,
      name: 'usuario1',
      email: 'usuario1@gmail.com',
      state: STATE.PENDING
    })
  })
})
