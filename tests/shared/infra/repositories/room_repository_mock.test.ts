import { describe, it, expect } from 'vitest'
import { Room } from '../../../../src/shared/domain/entities/room'
import { RoomRepositoryMock } from '../../../../src/shared/infra/repositories/room_repository_mock'

describe('Assert Room Repository Mock is correct at all', () => {
  it('Should get length correctly', async () => {
    const repo = new RoomRepositoryMock()
    const length = repo.getLength()

    expect(length).toEqual(4)
  })
  it('Should get room correctly', async () => {
    const repo = new RoomRepositoryMock()
    const room = await repo.getRoom("E2")

    expect(room?.id).toBe('E2')
    expect(room?.block).toBe('E')
    expect(room?.roomNumber).toBe('2')
    expect(room?.capacity).toBe(20)
  })
  it('Should get all rooms correctly', async () => {
    const repo = new RoomRepositoryMock()
    const rooms = await repo.getAllRooms()

    expect(rooms.length).toEqual(4)
  })
  it('Should create room correctly', async () => {
    const room = new Room({
      id: 'D1',
      block: 'D',
      roomNumber: '1',
      capacity: 36,
    })

    const repo = new RoomRepositoryMock()
    const lastLength = repo.getLength()
    await repo.createRoom(room)
    const newLength = repo.getLength()

    expect(newLength).toEqual(lastLength + 1)
  })
})