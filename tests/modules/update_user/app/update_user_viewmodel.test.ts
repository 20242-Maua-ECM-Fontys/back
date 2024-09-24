import { describe, it, expect } from 'vitest'
import { UpdateUserViewmodel } from '../../../../src/modules/update_user/app/update_user_viewmodel'
import { User } from '../../../../src/shared/domain/entities/user'
import { STATE } from '../../../../src/shared/domain/enums/state_enum'

describe('Assert Update User viewmodel is correct at all', () => {
  it('Should activate viewmodel correctly', async () => {
    const user = new User({
      id: 10,
      name: 'user10',
      email: 'user10@gmail.com',
      state: STATE.PENDING
    })

    const userViewmodel = new UpdateUserViewmodel(user.props).toJSON()

    expect(userViewmodel).toEqual({
      'id': 10,
      'name': 'user10',
      'email': 'user10@gmail.com',
      'state': 'PENDING',
      'message': 'The user was updated successfully'
    })
  })
})
