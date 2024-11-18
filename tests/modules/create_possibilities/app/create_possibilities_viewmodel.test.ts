import { describe, it, expect } from 'vitest'
import { CreatePossibilitiesViewmodel } from '../../../../src/modules/create_possibilities/app/create_possibilities_viewmodel'

describe('Assert UpdateAvailabilitiesViewmodel is correct', () => {
  it('Should correctly transform user data to viewmodel', async () => {

    const updateAvailabilitiesViewmodel = new CreatePossibilitiesViewmodel().toJSON()

    expect(updateAvailabilitiesViewmodel).toEqual({
      'message': 'possibilities created',
    })
  })
})