import { Subject } from '../entities/subject'

export interface ISubjectRepository {
  getSubject(code: string): Promise<Subject>
  getAllSubjects(): Promise<Subject[]>
  createSubject(subject: Subject): Promise<Subject>
  getLength(): number

}