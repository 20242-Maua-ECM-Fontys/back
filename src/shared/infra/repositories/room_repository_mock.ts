import { Room } from '../../domain/entities/room'
import { IRoomRepository } from '../../domain/repositories/room_repository_interface'
import { NoItemsFound } from '../../helpers/errors/usecase_errors'

export class RoomRepositoryMock implements IRoomRepository {
  private rooms: Room[] = [
    new Room({
      id: 'E1',
      block: 'E',
      roomNumber: '1',
      capacity: 20,
    }),
    new Room({
      id: 'E2',
      block: 'E',
      roomNumber: '2',
      capacity: 20,
    }),
    new Room({
      id: 'H204',
      block: 'H',
      roomNumber: '204',
      capacity: 60,
    }),
    new Room({
      id: 'W401',
      block: 'W',
      roomNumber: '401',
      capacity: 30,
    }),
  ]

  getLength(): number {
    return this.rooms.length
  }

  private roomCounter: number = 2

  async getRoom(id: string): Promise<Room> {
    const room = this.rooms.find((room) => room.id === id)
    if (!room) {
      throw new NoItemsFound('id')
    }
    return room
  }

  async getAllRooms(): Promise<Room[]> {
    return this.rooms
  }

  async createRoom(room: Room): Promise<Room> {
    this.rooms.push(room)
    return room
  }
}
