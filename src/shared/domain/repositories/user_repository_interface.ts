import { User } from '../entities/user'

export interface IUserRepository {
  getUser(id: number): Promise<User>
  getAllUsers(): Promise<User[]>
  createUser(user: User): Promise<User>
}