export class UpdateAvailabilitiesFullfilledViewmodel {
  private message: string

  constructor() {
    this.message = 'availabilities fullfilled updated'
  }

  toJSON() {
    return {
      message: this.message,
    }
  }
}
