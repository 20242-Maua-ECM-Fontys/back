import { User } from '../../domain/entities/user'
import { ROLE } from '../../domain/enums/role_enum'
import { IUserRepository } from '../../domain/repositories/user_repository_interface'
import { NoItemsFound } from '../../helpers/errors/usecase_errors'

export class UserRepositoryMock implements IUserRepository {
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

  getLength(): number {
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

  async getUserCounter(): Promise<number> {
    return this.userCounter
  }

  async loginUser(email: string, password: string): Promise<User | null> {
    const user = this.users.find(
      (user) => user.email === email && user.password === password,
    )
    return user || null
  }
}
