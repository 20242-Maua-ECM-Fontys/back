export enum WEEK_DAY {
  MON = 'MON',
  TUE = 'TUE',
  WED = 'WED',
  THU = 'THU',
  FRI = 'FRI',
  SAT = 'SAT',
}

export function toEnum(value: string): WEEK_DAY {
  switch (value) {
    case 'MON':
      return WEEK_DAY.MON
    case 'TUE':
      return WEEK_DAY.TUE
    case 'WED':
      return WEEK_DAY.WED
    case 'THU':
      return WEEK_DAY.THU
    case 'FRI':
      return WEEK_DAY.FRI
    case 'SAT':
      return WEEK_DAY.SAT
    default:
      throw new Error('Invalid value')
  }
}
