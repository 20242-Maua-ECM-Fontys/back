import { Class } from '../entities/class'
import { Possibility } from '../entities/possibility'
import { Schedule } from '../entities/schedule'
import { Subject } from '../entities/subject'
import { Suitability } from '../entities/suitability'
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

  // Suitability methods
  getSuitabilitiesLength(): number
  getAllSuitabilities(): Promise<Suitability[]>
  createSuitability(suitability: Suitability): Promise<Suitability>

  // Schedule methods
  getSchedulesLength(): number
  getSchedule(id: string, groupNumber: number): Promise<Schedule>
  getAllSchedules(): Promise<Schedule[]>
  createSchedule(schedule: Schedule): Promise<Schedule>

  // Possibility methods
  getPossibilitiesLength(): number
  getPossibility(id: string): Promise<Possibility>
  getAllPossibilities(): Promise<Possibility[]>
  createPossibility(possibility: Possibility): Promise<Possibility>
}
