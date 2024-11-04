export class createPossibilitiesViewmodel {
    private message: string

    constructor() {
        this.message = "Possibilities created"
    } 

    toJSON() {
        return {
          message: this.message,
        }
      }
      
}