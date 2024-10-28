import { describe, it, expect } from 'vitest'
import { GetSuitabilitiesViewmodel } from '../../../../src/modules/get_suitabilities/app/get_suitabilities_viewmodel'

describe('GetSuitabilitiesViewModel', () => {
  it('should have a message', () => {
    const viewModel = new GetSuitabilitiesViewmodel()
    expect(viewModel.toJSON()).toEqual({ message: 'suitabilities found' })
  })
})
