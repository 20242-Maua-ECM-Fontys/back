import { describe, it, expect } from 'vitest'
import { GetSuitabilitiesByProfessorViewmodel } from '../../../../src/modules/get_suitabilities_by_professor/app/get_suitabilities_by_professor_viewmodel'
import { Suitability } from '../../../../src/shared/domain/entities/suitability'

describe('GetSuitabilitiesViewmodel', () => {
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
      message: 'suitabilities by professor returned',
      suitabilities: [
        { userId: 4, codeSubject: 'ECM256' },
        { userId: 4, codeSubject: 'ECM256' },
      ],
    })
  })

  it('should have a message with empty suitabilities', () => {
    const suitabilities: Suitability[] = []
    const viewModel = new GetSuitabilitiesByProfessorViewmodel(suitabilities)
    expect(viewModel.toJSON()).toEqual({
      message: 'suitabilities by professor returned',
      suitabilities: [],
    })
  })
})
