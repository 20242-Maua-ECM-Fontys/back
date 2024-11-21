import { User } from '../../../../src/shared/domain/entities/user'
import { ROLE } from '../../../../src/shared/domain/enums/role_enum'
import { EntityError } from '../../../../src/shared/helpers/errors/domain_errors'
import { describe, it, expect } from 'vitest'

describe('[User Entity Tests]', () => {
  it('Assert User Entity is correct at all', () => {
    const user = new User({
      id: 5,
      name: 'JOAO VITOR CHOUERI BRANCO',
      email: '21.01075-7@maua.br',
      role: ROLE.STAFF,
      RA: '21.01075-7',
    })

    expect(user).toBeInstanceOf(User)
  })
  it('Assert User Entity has an error when id is invalid', () => {
    expect(() => {
      new User({
        id: -5,
        name: 'John Doe',
        email: '21.01075-7@maua.br',
        role: ROLE.STAFF,
        RA: '21.01075-7',
      })
    }).toThrowError('Field props.id is not valid')
  })
  it('Assert User Entity has an error when name is invalid', () => {
    expect(() => {
      new User({
        id: 5,
        name: '',
        email: '21.01075-7@maua.br',
        role: ROLE.STAFF,
        RA: '21.01075-7',
      })
    }).toThrowError(EntityError)
    expect(() => {
      new User({
        id: 5,
        name: '',
        email: '21.01075-7@maua.br',
        role: ROLE.STAFF,
        RA: '21.01075-7',
      })
    }).toThrowError('Field props.name is not valid')
  })
  it('Assert User Entity has an error when email is invalid', () => {
    expect(() => {
      new User({
        id: 5,
        name: 'JOAO VITOR CHOUERI BRANCO',
        email: 'JOAO VITOR CHOUERI BRANCOm',
        role: ROLE.STAFF,
        RA: '21.01075-7',
      })
    }).toThrowError(EntityError)
    expect(() => {
      new User({
        id: 5,
        name: 'JOAO VITOR CHOUERI BRANCO',
        email: 'JOAO VITOR CHOUERI BRANCOm',
        role: ROLE.STAFF,
        RA: '21.01075-7',
      })
    }).toThrowError('Field props.email is not valid')
  })
  it('Assert User Entity has errors with role not passed', () => {
    expect(() => {
      new User({
        id: 5,
        name: 'JOAO VITOR CHOUERI BRANCO',
        email: '21.01075-7@maua.br',
        RA: '21.01075-7',
      })
    }).toThrowError(EntityError)
    expect(() => {
      new User({
        id: 5,
        name: 'JOAO VITOR CHOUERI BRANCO',
        email: '21.01075-7@maua.br',
        RA: '21.01075-7',
      })
    }).toThrowError('Field props.role is not valid')
  })

  it('Assert User Entity has errors with RA not passed', () => {
    expect(() => {
      new User({
        id: 5,
        name: 'JOAO VITOR CHOUERI BRANCO',
        email: '21.01075-7@maua.br',
        role: ROLE.STAFF,
        RA: 21.0,
      })
    }).toThrowError(EntityError)
    expect(() => {
      new User({
        id: 5,
        name: 'JOAO VITOR CHOUERI BRANCO',
        email: '21.01075-7@maua.br',
        role: ROLE.STAFF,
        RA: 21.0,
      })
    }).toThrowError('Field props.RA is not valid')
  })
})
