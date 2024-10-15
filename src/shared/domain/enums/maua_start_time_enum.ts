const interval = 100

export enum MAUA_START_TIME {
  H07_40_09_20 = 560 - interval,
  H09_30_11_10 = 670 - interval,
  H11_20_13_00 = 780 - interval,
  H13_30_15_10 = 890 - interval,
  H15_20_17_00 = 1000 - interval,
  H16_50_18_30 = 1110 - interval,
  H19_00_20_40 = 1240 - interval,
  H20_50_22_30 = 1350 - interval,
}

export function toEnum(value: number): MAUA_START_TIME {
  switch (value) {
    case 460:
      return MAUA_START_TIME.H07_40_09_20
    case 570:
      return MAUA_START_TIME.H09_30_11_10
    case 680:
      return MAUA_START_TIME.H11_20_13_00
    case 790:
      return MAUA_START_TIME.H13_30_15_10
    case 900:
      return MAUA_START_TIME.H15_20_17_00
    case 1010:
      return MAUA_START_TIME.H16_50_18_30
    case 1140:
      return MAUA_START_TIME.H19_00_20_40
    case 1250:
      return MAUA_START_TIME.H20_50_22_30
    default:
      throw new Error('Invalid value')
  }
}
