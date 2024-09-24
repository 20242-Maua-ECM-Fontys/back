import { User } from '../../domain/entities/user'
import { STATE } from '../../domain/enums/state_enum'
import { IUserRepository } from '../../domain/repositories/user_repository_interface'
import { NoItemsFound } from '../../helpers/errors/usecase_errors'

export class UserRepositoryMock implements IUserRepository {
  private users: User[] = [
    new User({
      id: 1,
      name: 'user1',
      email: 'user1@gmail.com',
      state: STATE.PENDING
    }),
    new User({
      id: 2,
      name: 'user2',
      email: 'user2@gmail.com',
      state: STATE.PENDING
    }),
  ]

  getLength(): number {
    return this.users.length
  }

  private userCounter: number = 2

  async getUser(id: number): Promise<User> {
    const user = this.users.find(user => user.id === id)
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

  async updateUser(id: number, newName: string, newEmail: string): Promise<User> {
    const user = this.users.find(user => user.id === id)
    if (!user) {
      throw new NoItemsFound('id')
    }
    user.setName = newName
    user.setEmail = newEmail
    return user
  }

  async deleteUser(id: number): Promise<User> {
    const user = this.users.find(user => user.id === id)
    if (!user) {
      throw new NoItemsFound('id')
    }
    this.users = this.users.filter(user => user.id !== id)
    return user
  }

  async getUserCounter(): Promise<number> {
    return this.userCounter
  }
}