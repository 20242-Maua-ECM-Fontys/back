export class GetSuitabilitiesViewmodel {
  private message: string

  constructor() {
    this.message = 'suitabilities found'
  }

  toJSON() {
    return {
      message: this.message,
    }
  }
}
