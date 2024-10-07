import { Class } from '../entities/class'

export interface IClassRepository {
  getClass(id: string): Promise<Class>
  getAllClasss(): Promise<Class[]>
  createClass(newClass: Class): Promise<Class>
  getLength(): number
}