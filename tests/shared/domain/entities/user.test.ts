import { User } from '../../../../src/shared/domain/entities/user'
import { ROLE } from '../../../../src/shared/domain/enums/role_enum'
import { EntityError } from '../../../../src/shared/helpers/errors/domain_errors'
import { describe, it, expect } from 'vitest'

describe('[User Entity Tests]', () => {
  it('Assert User Entity is correct at all', () => {
    const user = new User({
      id: 5,
      name: 'user1',
      email: 'user1@gmail.com',
      role: ROLE.STAFF,
      RA: '21.00000-1',
      password:'Password1@'
    })

    expect(user).toBeInstanceOf(User)
  })

  it('Assert User Entity has an error when name is invalid', () => {
    expect(() => {
      new User({
        id: 5,
        name: '',
        email: 'user1@gmail.com',
        role: ROLE.STAFF,
        RA: '21.00000-1',
        password:'Password1@'
      })
    }).toThrowError(EntityError)
    expect(() => {
      new User({
        id: 5,
        name: '',
        email: 'user1@gmail.com',
        role: ROLE.STAFF,
        RA: '21.00000-1',
        password:'Password1@'
      })
    }).toThrowError('Field props.name is not valid')
  })
  it('Assert User Entity has an error when email is invalid', () => {
    expect(() => {
      new User({
        id: 5,
        name: 'user1',
        email: 'user1m',
        role: ROLE.STAFF,
        RA: '21.00000-1',
        password:'Password1@'
      })
    }).toThrowError(EntityError)
    expect(() => {
      new User({
        id: 5,
        name: 'user1',
        email: 'user1m',
        role: ROLE.STAFF,
        RA: '21.00000-1',
        password:'Password1@'
      })
    }).toThrowError('Field props.email is not valid')
  })
  it('Assert User Entity has errors with role not passed', () => {
    expect(() => {
      new User({
        id: 5,
        name: 'user1',
        email: 'user1@gmail.com',
        RA: '21.00000-1',
        password:'Password1@'
      })
    }).toThrowError(EntityError)
    expect(() => {
      new User({
        id: 5,
        name: 'user1',
        email:'user1@gmail.com',
        RA: '21.00000-1',
        password:'Password1@'
      })
    }).toThrowError('Field props.role is not valid')
  })
})

it('Assert User Entity has errors with RA not passed', () => {
  expect(() => {
    new User({
      id: 5,
      name: 'user1',
      email: 'user1@gmail.com',
      role: ROLE.STAFF,
      RA: '21.00000-',
      password:'Password1@'
    })
  }).toThrowError(EntityError)
  expect(() => {
    new User({
      id: 5,
      name: 'user1',
      email:'user1@gmail.com',
      role: ROLE.STAFF,
      RA: '21.00000-',
      password:'Password1@'
    })
  }).toThrowError('Field props.RA is not valid')
})

it('Assert User Entity has errors with password not passed', () => {
  expect(() => {
    new User({
      id: 5,
      name: 'user1',
      email: 'user1@gmail.com',
      role: ROLE.STAFF,
      RA: '21.00000-2',
      password:'Password1'
    })
  }).toThrowError(EntityError)
  expect(() => {
    new User({
      id: 5,
      name: 'user1',
      email:'user1@gmail.com',
      role: ROLE.STAFF,
      RA: '21.00000-2',
      password:'Password1'
    })
  }).toThrowError('Field props.password is not valid')
})