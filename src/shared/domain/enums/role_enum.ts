export enum ROLE {
  PROFESSOR = 'PROFESSOR',
  STAFF = 'STAFF',
  COORDINATOR = 'COORDINATOR',
}
export function toEnum(value: string): ROLE {
  switch (value) {
    case 'PROFESSOR':
      return ROLE.PROFESSOR
    case 'STAFF':
      return ROLE.STAFF
    case 'COORDINATOR':
      return ROLE.COORDINATOR
    default:
      throw new Error('Invalid value')
  }
}
