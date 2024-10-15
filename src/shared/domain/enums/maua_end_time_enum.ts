export enum MAUA_END_TIME {
    H07_40_09_20 = 560,
    H09_30_11_10 = 670,
    H11_20_13_00 = 780,
    H13_30_15_10 = 890,
    H15_20_17_00 = 1000,
    H16_50_18_30 = 1110,
    H19_00_20_40 = 1240,
    H20_50_22_30 = 1350,
}

export function toEnum(value: string): MAUA_END_TIME {
  switch (value) {
    case 'H07_40_09_20':
      return MAUA_END_TIME.H07_40_09_20
    case 'H09_30_11_10':
      return MAUA_END_TIME.H09_30_11_10
    case 'H11_20_13_00':
      return MAUA_END_TIME.H11_20_13_00
    case 'H13_30_15_10':
      return MAUA_END_TIME.H13_30_15_10
    case 'H15_20_17_00':
      return MAUA_END_TIME.H15_20_17_00
    case 'H16_50_18_30':
      return MAUA_END_TIME.H16_50_18_30
    case 'H19_00_20_40':
      return MAUA_END_TIME.H19_00_20_40
    case 'H20_50_22_30':
      return MAUA_END_TIME.H20_50_22_30
    default:
      throw new Error('Invalid value')
  }
}
