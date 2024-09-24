export enum STAGE {
  TEST = 'TEST',
  DEV = 'DEV',
  PROD = 'PROD'
}

export function toEnum(value: string): STAGE {
  switch (value) {
    case 'TEST':
      return STAGE.TEST
    case 'DEV':
      return STAGE.DEV
    case 'PROD':
      return STAGE.PROD
    default:
      throw new Error('Invalid value')
  }
}
