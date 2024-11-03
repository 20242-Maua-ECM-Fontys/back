export enum PERIOD {
  MORNING = 'MORNING',
  AFTERNOON = 'AFTERNOON',
  EVENING = 'EVENING',
}
export function toEnum(value: string): PERIOD {
  switch (value) {
    case 'MORNING':
      return PERIOD.MORNING
    case 'AFTERNOON':
      return PERIOD.AFTERNOON
    case 'EVENING':
      return PERIOD.EVENING
    default:
      throw new Error('Invalid value')
  }
}
