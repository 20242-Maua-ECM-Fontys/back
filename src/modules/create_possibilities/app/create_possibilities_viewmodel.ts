export class CreatePossibilitiesViewmodel {
    private message: string

    constructor() {
        this.message = "possibilities created"
    } 

    toJSON() {
        return {
          message: this.message,
        }
      }
}