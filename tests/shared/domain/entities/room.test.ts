import { describe, it, expect } from 'vitest'
import { Room } from '../../../../src/shared/domain/entities/room'
import { EntityError } from '../../../../src/shared/helpers/errors/domain_errors'

describe('Room Entity Tests', () => {
  it('Assert Room Entity is correct at all', () => {
    const room = new Room({
      id: 'E4',
      block: 'E',
      roomNumber: '4',
      capacity: 12,
    })

    expect(room).toBeInstanceOf(Room)
    expect(room.id).toBe('E4')
    expect(room.block).toBe('E')
    expect(room.roomNumber).toBe('4')
    expect(room.capacity).toBe(12)
  })

  describe('Assert Room Entity has an error when id is invalid', () => {
    it('id must be any letter and a sequence of numbers', () => {
      expect(() => {
        new Room({
          id: 'EE4',
          block: 'E',
          roomNumber: '4',
          capacity: 12,
        })
      }).toThrowError(EntityError)
    })
    it('id must be the same as block + roomNumber', () => {
      expect(() => {
        new Room({
          id: 'E4',
          block: 'E',
          roomNumber: '2',
          capacity: 12,
        })
      }).toThrowError(EntityError)
    })
  })

  describe('Assert Room Entity has an error when block is invalid', () => {
    it('block must be lenght 1', () => {
      expect(() => {
        new Room({
          id: 'E4',
          block: 'EA',
          roomNumber: '4',
          capacity: 12,
        })
      }).toThrowError(EntityError)
    })
    it('block must be uppercase', () => {
      expect(() => {
        new Room({
          id: 'E4',
          block: 'e',
          roomNumber: '2',
          capacity: 12,
        })
      }).toThrowError(EntityError)
    })
  })

  describe('Assert Room Entity has an error when roomNumber is invalid', () => {
    it('roomNumber lenght must be greater than 0', () => {
      expect(() => {
        new Room({
          id: 'E4',
          block: 'E',
          roomNumber: '',
          capacity: 12,
        })
      }).toThrowError(EntityError)
    })
    it('roomNumber lenght must be smaller than 5', () => {
      expect(() => {
        new Room({
          id: 'E4',
          block: 'E',
          roomNumber: '12345',
          capacity: 12,
        })
      }).toThrowError(EntityError)
    })
  })
})
