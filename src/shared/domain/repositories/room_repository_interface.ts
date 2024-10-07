import { Room } from '../entities/room'

export interface IRoomRepository {
  getRoom(id: string): Promise<Room>
  getAllRooms(): Promise<Room[]>
  createRoom(room: Room): Promise<Room>
}