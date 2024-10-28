import { Suitability } from '../../../shared/domain/entities/suitability'

export class GetSuitabilitiesViewmodel {
  private message: string
  private suitabilities: Suitability[]

  constructor(suitabilities: Suitability[]) {
    this.message = 'suitabilities found'
    this.suitabilities = suitabilities
  }

  toJSON() {
    return {
      message: this.message,
      suitabilities: this.suitabilities.map((suitability) => ({
        userId: suitability.userId,
        codeSubject: suitability.codeSubject,
      })),
    }
  }
}
