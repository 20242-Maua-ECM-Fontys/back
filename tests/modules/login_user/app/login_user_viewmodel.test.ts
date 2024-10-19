import { it, expect, describe } from 'vitest'
import { LoginUserViewmodel } from '../../../../src/modules/login_user/app/login_user_viewmodel'
import { LoginUserUsecase } from '../../../../src/modules/login_user/app/login_user_usecase'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'

describe('Assert Login User viewmodel is correct', () => {
  it('Should correctly transform user data to viewmodel', async () => {

    const repo = new ScheduleRepositoryMock()
    const usecase = new LoginUserUsecase(repo)
    const user = await usecase.execute('user1@gmail.com','Password1@')
    const userViewmodel = new LoginUserViewmodel(user.props).toJSON()

    expect(userViewmodel).toEqual({
      'message': 'the login was successful',
      'type': 'STAFF'
    })
  })

  it('Should correctly transform a STAFF user to viewmodel', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new LoginUserUsecase(repo)
    const user = await usecase.execute('user1@gmail.com','Password1@')
    const userViewmodel = new LoginUserViewmodel(user.props).toJSON()

    expect(userViewmodel).toEqual({
      'message': 'the login was successful',
      'type': 'STAFF'
    })
  })

  it('Should correctly transform a PROFESSOR user to viewmodel', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new LoginUserUsecase(repo)
    const user = await usecase.execute('user3@gmail.com','Password3@')
    const userViewmodel = new LoginUserViewmodel(user.props).toJSON()

    expect(userViewmodel).toEqual({
      'message': 'the login was successful',
      'type': 'PROFESSOR'
    })
  })

  it('Should correctly transform a COORDINATOR user to viewmodel', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new LoginUserUsecase(repo)
    const user = await usecase.execute('user2@gmail.com','Password2@')
    const userViewmodel = new LoginUserViewmodel(user.props).toJSON()

    expect(userViewmodel).toEqual({
      'message': 'the login was successful',
      'type': 'COORDINATOR'
    })
  })
})
