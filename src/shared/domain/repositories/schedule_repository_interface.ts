import { Availability } from '../entities/availability'
import { AvFullfilled } from '../entities/avFullfilled'
import { Class } from '../entities/class'
import { Possibility } from '../entities/possibility'
import { Schedule } from '../entities/schedule'
import { Subject } from '../entities/subject'
import { Suitability } from '../entities/suitability'
import { User } from '../entities/user'
import { ROLE } from '../enums/role_enum'

export interface IScheduleRepository {
  // User methods
  getUsersLength(): number
  getUser(id: number): Promise<User>
  getAllUsers(): Promise<User[]>
  getUsersByRole(role: ROLE): Promise<User[]>
  createUser(user: User): Promise<User>
  updateUser(id: number, newName: string, newEmail: string): Promise<User>
  deleteUser(id: number): Promise<User>
  loginUser(email: string, password: string): Promise<User | null>
  getUserByEmail(email: string): Promise<User>

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
  getSuitabilitiesByUserId(userId: number): Promise<Suitability[]>

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

  // Availability methods
  getAvailabilitiesLength(): number
  getAvailability(id: string): Promise<Availability>
  getAllAvailabilities(): Promise<Availability[]>
  createAvailability(availability: Availability): Promise<Availability>
  getAvailabilitiesByUserId(userId: number): Promise<Availability[]>

  // AvFullfilled methods
  getAvsFullfilledLength(): number
  getAllAvsFullfilled(): Promise<AvFullfilled[]>
  // createAvFullfilled(avFullfilled: AvFullfilled): Promise<AvFullfilled>
}
