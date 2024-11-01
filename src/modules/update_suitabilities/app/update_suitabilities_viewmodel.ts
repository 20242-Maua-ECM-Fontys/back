export class UpdateSuitabilitiesViewmodel {
  private message: string

  constructor() {
    this.message = 'suitabilities updated'
  }

  toJSON() {
    return {
      message: this.message,
    }
  }
}
