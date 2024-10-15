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

export function toEnum(value: number): MAUA_END_TIME {
  switch (value) {
    case 560:
      return MAUA_END_TIME.H07_40_09_20
    case 670:
      return MAUA_END_TIME.H09_30_11_10
    case 780:
      return MAUA_END_TIME.H11_20_13_00
    case 890:
      return MAUA_END_TIME.H13_30_15_10
    case 1000:
      return MAUA_END_TIME.H15_20_17_00
    case 1110:
      return MAUA_END_TIME.H16_50_18_30
    case 1240:
      return MAUA_END_TIME.H19_00_20_40
    case 1350:
      return MAUA_END_TIME.H20_50_22_30
    default:
      throw new Error('Invalid value')
  }
}
