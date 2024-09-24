export enum STATE {
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED'
}

export function toEnum(value: string): STATE {
  switch (value) {
    case 'APPROVED':
      return STATE.APPROVED
    case 'PENDING':
      return STATE.PENDING
    case 'REJECTED':
      return STATE.REJECTED
    default:
      throw new Error('Invalid value')
  }
}
