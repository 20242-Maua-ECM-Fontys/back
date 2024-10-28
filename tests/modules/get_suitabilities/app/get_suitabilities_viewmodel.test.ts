import { describe, it, expect } from 'vitest'
import { GetSuitabilitiesViewmodel } from '../../../../src/modules/get_suitabilities/app/get_suitabilities_viewmodel'
import { Suitability } from '../../../../src/shared/domain/entities/suitability'

describe('GetSuitabilitiesViewModel', () => {
  it('should have a message', () => {
    const suitabilities: Suitability[] = [
      new Suitability({
        userId: 4,
        codeSubject: 'ECM256',
      }),
      new Suitability({
        userId: 4,
        codeSubject: 'ECM256',
      }),
    ]
    const viewModel = new GetSuitabilitiesViewmodel(suitabilities)
    expect(viewModel.toJSON()).toEqual({
      message: 'suitabilities found',
      suitabilities: [
        { userId: 4, codeSubject: 'ECM256' },
        { userId: 4, codeSubject: 'ECM256' },
      ],
    })
  })
})
