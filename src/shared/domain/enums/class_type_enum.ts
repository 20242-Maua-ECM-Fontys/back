export enum CLASSTYPE {
  THEORY = 'THEORY',
  PRACTICE = 'PRACTICE',
  LAB = 'LAB',
}

export function ClasstypeToEnum(value: string): CLASSTYPE {
  switch (value) {
    case 'THEORY':
      return CLASSTYPE.THEORY
    case 'PRACTICE':
      return CLASSTYPE.PRACTICE
    case 'LAB':
      return CLASSTYPE.LAB
    default:
      throw new Error('Invalid value')
  }
}
