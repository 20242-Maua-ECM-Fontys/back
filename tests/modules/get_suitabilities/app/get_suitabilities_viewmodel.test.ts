import { describe, it, expect } from 'vitest'
import { GetSuitabilitiesByProfessorViewmodel } from '../../../../src/modules/get_suitabilities_by_prefessor/app/get_suitabilities_by_professor_viewmodel'
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
    const viewModel = new GetSuitabilitiesByProfessorViewmodel(suitabilities)
    expect(viewModel.toJSON()).toEqual({
      message: 'suitabilities found',
      suitabilities: [
        { userId: 4, codeSubject: 'ECM256' },
        { userId: 4, codeSubject: 'ECM256' },
      ],
    })
  })
})
