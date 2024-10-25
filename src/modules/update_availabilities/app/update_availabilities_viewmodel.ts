export class UpdateAvailabilitiesViewmodel {
  private message: string

  constructor() {
    this.message = 'availabilities updated'
  }

  toJSON() {
    return {
      message: this.message,
    }
  }
}
