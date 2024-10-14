import { User } from '../entities/user'

export interface IUserRepository {
  getUser(id: number): Promise<User>
  getAllUsers(): Promise<User[]>
  createUser(user: User): Promise<User>
  getLength(): number
  updateUser(id: number, newName: string, newEmail: string): Promise<User>
  deleteUser(id: number): Promise<User>
  loginUser(email: string, password: string): Promise<User | null>
}
