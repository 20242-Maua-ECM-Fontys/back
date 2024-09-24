import { it, expect, describe,  } from 'vitest'
import { User } from '../../../../src/shared/domain/entities/user'
import { STATE } from '../../../../src/shared/domain/enums/state_enum'
import { GetUserViewmodel } from '../../../../src/modules/get_user/app/get_user_viewmodel'

describe('Assert Get User viewmodel is correct at all', () => {
  it('Assert the viewmodel is correct at all', () => {
    const user = new User({
      id: 10,
      name: 'user10',
      email: 'user10@gmail.com',
      state: STATE.PENDING
    })

    const userViewmodel = new GetUserViewmodel(user.props).toJSON()

    expect(userViewmodel).toEqual({
      'id': 10,
      'name': 'user10',
      'email': 'user10@gmail.com',
      'state': 'PENDING',
      'message': 'The user was retrieved successfully'
    })
  })
})