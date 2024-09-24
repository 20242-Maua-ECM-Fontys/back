import { it, expect, describe,  } from 'vitest'
import { UserRepositoryMock } from '../../../../src/shared/infra/repositories/user_repository_mock'
import { GetUserUsecase } from '../../../../src/modules/get_user/app/get_user_usecase'
import { STATE } from '../../../../src/shared/domain/enums/state_enum'

describe('Assert Get User usecase is correct at all', () => {
  it('Should create a get user usecase correctly', async () => {
    const repo = new UserRepositoryMock()
    const usecase = new GetUserUsecase(repo)

    const user = await usecase.execute(1)

    expect(user.props).toEqual({
      id: 1,
      name: 'user1',
      email: 'user1@gmail.com',
      state: STATE.PENDING
    })
  })
  
})