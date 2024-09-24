import { describe, it, expect } from 'vitest'
import { User } from '../../../../src/shared/domain/entities/user'
import { STATE } from '../../../../src/shared/domain/enums/state_enum'
import { DeleteUserViewmodel } from '../../../../src/modules/delete_user/app/delete_user_viewmodel'

describe('Assert Delete User viewmodel is correct at all', () => {
  it('Should activate viewmodel correctly', async () => {
    const user = new User({ id: 10, name: 'usuario1', email: 'usuario1@gmail.com', state: STATE.PENDING })

    const viewmodel = new DeleteUserViewmodel(user)

    const expected = {
      'id': 10,
      'name': 'usuario1',
      'email': 'usuario1@gmail.com',
      'state': 'PENDING',
      'message': 'The user was deleted successfully'
    }

    expect(viewmodel.toJSON()).toEqual(expected)
  })
})