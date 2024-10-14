import { IScheduleRepository } from '../../../shared/domain/repositories/schedule_repository_interface'
import { User } from '../../domain/entities/user'
import { ROLE } from '../../domain/enums/role_enum'
import { NoItemsFound } from '../../helpers/errors/usecase_errors'
import { Class } from '../../../shared/domain/entities/class'
import { MODALITY } from '../../../shared/domain/enums/modality_enum'
import { CLASSTYPE } from '../../../shared/domain/enums/class_type_enum'
import { Subject } from '../../../shared/domain/entities/subject'
import { PERIOD } from '../../../shared/domain/enums/period_enum'

export class ScheduleRepositoryMock implements IScheduleRepository {
  // Mock Data
  private users: User[] = [
    new User({
      id: 1,
      name: 'user1',
      email: 'user1@gmail.com',
      role: ROLE.STAFF,
      RA: '21.00000-1',
      password: 'Password1@',
    }),
    new User({
      id: 2,
      name: 'user2',
      email: 'user2@gmail.com',
      role: ROLE.COORDINATOR,
      RA: '22.00000-2',
      password: 'Password2@',
    }),
    new User({
      id: 3,
      name: 'user3',
      email: 'user3@gmail.com',
      role: ROLE.PROFESSOR,
      RA: '33.00000-3',
      password: 'Password3@',
    }),
  ]

  private classes: Class[] = [
    new Class({
      id: '0a8c5357-1f07-5b24-9845-9318c47ab923',
      name: 'Linguagens de Programacao II',
      modality: MODALITY.IN_PERSON,
      classType: CLASSTYPE.THEORY,
      subjectCode: 'ECM256',
    }),
    new Class({
      id: '0a8c5357-1f07-5b24-9845-9318c47ac923',
      name: 'Linguagens de Programacao II',
      modality: MODALITY.IN_PERSON,
      classType: CLASSTYPE.THEORY,
      subjectCode: 'ECM256',
    }),
    new Class({
      id: '0a8c5357-1f07-5b24-9845-9318c47ac922',
      name: 'Physics I',
      modality: MODALITY.REMOTE,
      classType: CLASSTYPE.THEORY,
      subjectCode: 'EFB207',
    }),
    new Class({
      id: '0a8c5357-1f07-5b24-9845-9318c47ac921',
      name: 'Physics I',
      modality: MODALITY.IN_PERSON,
      classType: CLASSTYPE.LAB,
      subjectCode: 'EFB207',
    }),
  ]

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

  // User methods
  getUsersLength(): number {
    return this.users.length
  }

  async getUser(id: number): Promise<User> {
    const user = this.users.find((user) => user.id === id)
    if (!user) {
      throw new NoItemsFound('id')
    }
    return user
  }

  async getAllUsers(): Promise<User[]> {
    return this.users
  }

  async createUser(user: User): Promise<User> {
    this.users.push(user)
    return user
  }

  async updateUser(
    id: number,
    newName: string,
    newEmail: string,
  ): Promise<User> {
    const user = this.users.find((user) => user.id === id)
    if (!user) {
      throw new NoItemsFound('id')
    }
    user.setName = newName
    user.setEmail = newEmail
    return user
  }

  async deleteUser(id: number): Promise<User> {
    const user = this.users.find((user) => user.id === id)
    if (!user) {
      throw new NoItemsFound('id')
    }
    this.users = this.users.filter((user) => user.id !== id)
    return user
  }

  async loginUser(email: string, password: string): Promise<User | null> {
    const user = this.users.find(
      (user) => user.email === email && user.password === password,
    )
    return user || null
  }

  // Class methods
  getClassesLength(): number {
    return this.classes.length
  }

  async getClass(id: string): Promise<Class> {
    const selectedClass = this.classes.find((c) => c.id === id)
    if (!selectedClass) {
      throw new NoItemsFound('id')
    }
    return selectedClass
  }

  async getAllClasss(): Promise<Class[]> {
    return this.classes
  }

  async createClass(newClass: Class): Promise<Class> {
    this.classes.push(newClass)
    return newClass
  }
  
  // Subject methods
  getSubjectsLength(): number {
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
