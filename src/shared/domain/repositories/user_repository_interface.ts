import { User } from '../entities/user'

export interface IUserRepository {
  getUser(id: number): Promise<User>
  getAllUsers(): Promise<User[]>
  createUser(user: User): Promise<User>
  updateUser(id: number, newName: string, newEmail: string): Promise<User>
  deleteUser(id: number): Promise<User>
  getUserCounter(): Promise<number>
}