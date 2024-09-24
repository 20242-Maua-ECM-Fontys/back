import { describe, it, expect } from 'vitest'
import { UserRepositoryMock } from '../../../../src/shared/infra/repositories/user_repository_mock'
import { STATE } from '../../../../src/shared/domain/enums/state_enum'
import { CreateUserUsecase } from '../../../../src/modules/create_user/app/create_user_usecase'

describe('Assert Create User usecase is correct at all', () => {
  it('Should activate usecase correctly', async () => {
    const repo = new UserRepositoryMock()
    const usecase = new CreateUserUsecase(repo)

    const user = await usecase.execute(5, 'usuario1', 'usuario1@gmail.com')

    expect(user.props).toEqual({
      id: 5,
      name: 'usuario1',
      email: 'usuario1@gmail.com',
      state: STATE.PENDING
    })
  })
})
