import { Class } from '../entities/class'
import { Subject } from '../entities/subject'
import { User } from '../entities/user'

export interface IScheduleRepository {
  // User methods
  getUsersLength(): number
  getUser(id: number): Promise<User>
  getAllUsers(): Promise<User[]>
  createUser(user: User): Promise<User>
  updateUser(id: number, newName: string, newEmail: string): Promise<User>
  deleteUser(id: number): Promise<User>
  loginUser(email: string, password: string): Promise<User | null>

  // Class methods
  getClassesLength(): number
  getClass(id: string): Promise<Class>
  getAllClasss(): Promise<Class[]>
  createClass(newClass: Class): Promise<Class>
  
  // Subject methods
  getSubjectsLength(): number
  getSubject(code: string): Promise<Subject>
  getAllSubjects(): Promise<Subject[]>
  createSubject(subject: Subject): Promise<Subject>
}