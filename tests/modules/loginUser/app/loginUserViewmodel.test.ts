import { it, expect, describe } from 'vitest'
import { User } from '../../../../src/shared/domain/entities/user'
import { ROLE } from '../../../../src/shared/domain/enums/role_enum'
import { LoginUserViewmodel } from '../../../../src/modules/loginUser/app/loginUserViewmodel'
import { UserRepositoryMock } from '../../../../src/shared/infra/repositories/user_repository_mock'
import { LoginUserUsecase } from '../../../../src/modules/loginUser/app/LoginUserUsecase'

describe('Assert Login User viewmodel is correct', () => {
  it('Should correctly transform user data to viewmodel', async () => {

    const repo = new UserRepositoryMock()
    const usecase = new LoginUserUsecase(repo)
    const user = await usecase.execute('user1@gmail.com','Password1@')
    const userViewmodel = new LoginUserViewmodel(user.props).toJSON()

    expect(userViewmodel).toEqual({
      'message': 'the login was successful',
      'type': 'STAFF'
    })
  })

  it('Should correctly transform a STAFF user to viewmodel', async () => {
    const repo = new UserRepositoryMock()
    const usecase = new LoginUserUsecase(repo)
    const user = await usecase.execute('user1@gmail.com','Password1@')
    const userViewmodel = new LoginUserViewmodel(user.props).toJSON()

    expect(userViewmodel).toEqual({
      'message': 'the login was successful',
      'type': 'STAFF'
    })
  })

  it('Should correctly transform a PROFESSOR user to viewmodel', async () => {
    const repo = new UserRepositoryMock()
    const usecase = new LoginUserUsecase(repo)
    const user = await usecase.execute('user3@gmail.com','Password3@')
    const userViewmodel = new LoginUserViewmodel(user.props).toJSON()

    expect(userViewmodel).toEqual({
      'message': 'the login was successful',
      'type': 'PROFESSOR'
    })
  })

  it('Should correctly transform a COORDINATOR user to viewmodel', async () => {
    const repo = new UserRepositoryMock()
    const usecase = new LoginUserUsecase(repo)
    const user = await usecase.execute('user2@gmail.com','Password2@')
    const userViewmodel = new LoginUserViewmodel(user.props).toJSON()

    expect(userViewmodel).toEqual({
      'message': 'the login was successful',
      'type': 'COORDINATOR'
    })
  })
})
