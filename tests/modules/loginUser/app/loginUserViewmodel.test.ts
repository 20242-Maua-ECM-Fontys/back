import { it, expect, describe } from 'vitest'
import { User } from '../../../../src/shared/domain/entities/user'
import { ROLE } from '../../../../src/shared/domain/enums/role_enum'
import { LoginUserViewmodel } from '../../../../src/modules/loginUser/app/loginUserViewmodel'

describe('Assert Login User viewmodel is correct', () => {
  it('Should correctly transform user data to viewmodel', () => {
    const user = new User({
      id: 10,
      name: 'user10',
      email: 'user10@gmail.com',
      role: ROLE.COORDINATOR,
      RA: '21.00000-10',
      password: 'Password10@',
    })

    const userViewmodel = new LoginUserViewmodel(user.props).toJSON()

    expect(userViewmodel).toEqual({
      'message': 'the login was successful',
      'type': 'COORDINATOR'
    })
  })

  it('Should correctly transform a STAFF user to viewmodel', () => {
    const user = new User({
      id: 5,
      name: 'user5',
      email: 'user5@gmail.com',
      role: ROLE.STAFF,
      RA: '21.00000-5',
      password: 'Password5@',
    })

    const userViewmodel = new LoginUserViewmodel(user.props).toJSON()

    expect(userViewmodel).toEqual({
      'message': 'the login was successful',
      'type': 'STAFF'
    })
  })

  it('Should correctly transform a PROFESSOR user to viewmodel', () => {
    const user = new User({
      id: 3,
      name: 'user3',
      email: 'user3@gmail.com',
      role: ROLE.PROFESSOR,
      RA: '21.00000-3',
      password: 'Password3@',
    })

    const userViewmodel = new LoginUserViewmodel(user.props).toJSON()

    expect(userViewmodel).toEqual({
      'message': 'the login was successful',
      'type': 'PROFESSOR'
    })
  })
})
