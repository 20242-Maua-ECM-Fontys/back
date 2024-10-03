import { describe, it, expect } from 'vitest'
import { UserRepositoryMock } from '../../../../src/shared/infra/repositories/user_repository_mock'
import { ROLE } from '../../../../src/shared/domain/enums/role_enum'
import { CreateUserUsecase } from '../../../../src/modules/create_user/app/create_user_usecase'

describe('Assert Create User usecase is correct at all', () => {
  it('Should activate usecase correctly', async () => {
    const repo = new UserRepositoryMock()
    const usecase = new CreateUserUsecase(repo)

    const user = await usecase.execute(35, 'usuario1', 'usuario1@gmail.com', '21.00000-1', 'Password1@', ROLE.STAFF)

    expect(user.props).toEqual({
      id: 35,
      name: 'usuario1',
      email: 'usuario1@gmail.com',
      role: ROLE.STAFF,
      RA: '21.00000-1',
      password:'Password1@'
    })
  })
})
