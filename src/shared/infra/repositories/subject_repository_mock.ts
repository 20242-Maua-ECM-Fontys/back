import { PERIOD } from '../../../shared/domain/enums/period_enum'
import { Subject } from '../../domain/entities/subject'
import { ISubjectRepository } from '../../domain/repositories/subject_repository_interface'
import { NoItemsFound } from '../../helpers/errors/usecase_errors'

export class SubjectRepositoryMock implements ISubjectRepository {
  private subjects: Subject[] = [
    new Subject({
      code: 'ECM256',
      name: 'Programming Languages II',
      period: PERIOD.MORNING,
    }),
    new Subject({
      code: 'EFB207',
      name: 'Physics I',
      period: PERIOD.AFTERNOON,
    }),
  ]

  getLength(): number {
    return this.subjects.length
  }

  async getSubject(code: string): Promise<Subject> {
    const subject = this.subjects.find((subject) => subject.code === code)
    if (!subject) {
      throw new NoItemsFound('code')
    }
    return subject
  }

  async getAllSubjects(): Promise<Subject[]> {
    return this.subjects
  }

  async createSubject(subject: Subject): Promise<Subject> {
    this.subjects.push(subject)
    return subject
  }
}
