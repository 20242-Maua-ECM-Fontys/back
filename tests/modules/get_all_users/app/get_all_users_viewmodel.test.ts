import { describe, it, expect } from 'vitest'
import { User } from '../../../../src/shared/domain/entities/user'
import { GetAllUsersViewmodel, UserViewmodel } from '../../../../src/modules/get_all_users/app/get_all_users_viewmodel'
import { STATE } from '../../../../src/shared/domain/enums/state_enum'

describe('Assert Get All Users viewmodel is correct at all', () => {
  const users = [
    new User({ id: 10, name: 'Lounis', email: 'lounis@gmail.com', state: STATE.PENDING }),
    new User({ id: 11, name: 'Lounis2', email: 'lounis2@gmail.com', state: STATE.PENDING })
  ]

  it('Should activate GetAllUsers viewmodel correctly', async () => {
    const viewmodel = new GetAllUsersViewmodel(users)

    const expected = {
      'users': [
        {
          'id': 10,
          'name': 'Lounis',
          'email': 'lounis@gmail.com',
          'state': 'PENDING',
        },
        {
          'id': 11,
          'name': 'Lounis2',
          'email': 'lounis2@gmail.com',
          'state': 'PENDING',
        },
      ],
      'message': 'All users have been retrieved successfully',
    }

    expect(viewmodel.toJSON()).toEqual(expected)
  })

  it('Should activate Users viewmodel correctly', async () => {
    const viewmodel = new UserViewmodel(users[0])

    const expected = {
      'id': 10,
      'name': 'Lounis',
      'email': 'lounis@gmail.com',
      'state': 'PENDING',
    }

    expect(viewmodel.toJSON()).toEqual(expected)
  })
})