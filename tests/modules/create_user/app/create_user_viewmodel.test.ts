import { describe, it, expect } from 'vitest'
import { User } from '../../../../src/shared/domain/entities/user'
import { STATE } from '../../../../src/shared/domain/enums/state_enum'
import { CreateUserViewmodel } from '../../../../src/modules/create_user/app/create_user_viewmodel'

describe('Assert Create User viewmodel is correct at all', () => {
  it('Should activate viewmodel correctly', async () => {
    const user = new User({
      id: 10,
      name: 'user10',
      email: 'user10@gmail.com',
      state: STATE.PENDING
    })

    const userViewmodel = new CreateUserViewmodel(user.props).toJSON()

    expect(userViewmodel).toEqual({
      'id': 10,
      'name': 'user10',
      'email': 'user10@gmail.com',
      'state': 'PENDING',
      'message': 'The user was created successfully'
    })
  })
})
