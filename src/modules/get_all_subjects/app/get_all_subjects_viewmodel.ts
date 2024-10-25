import { Subject } from '../../../shared/domain/entities/subject'

export class GetAllSubjectsViewmodel {
  private message: string
  private subjects: Subject[]

  constructor(subjects: Subject[]) {
    this.message = 'subjects returned'
    this.subjects = subjects
  }

  toJSON() {
    return {
      message: this.message,
      subjects: [
        ...this.subjects.map(subject => subject.toJSON())
      ]
    }
  }
}
