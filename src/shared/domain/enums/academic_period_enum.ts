export enum ACADEMIC_PERIOD {
  ANNUAL = 'ANNUAL',
  FIRST_SEMESTER = '1SEM',
  SECOND_SEMESTER = '2SEM',
}

export function toEnum(value: string): ACADEMIC_PERIOD {
  switch (value) {
    case 'ANNUAL':
      return ACADEMIC_PERIOD.ANNUAL;
    case '1SEM':
      return ACADEMIC_PERIOD.FIRST_SEMESTER;
    case '2SEM':
      return ACADEMIC_PERIOD.SECOND_SEMESTER;
    default:
      throw new Error('Invalid value');
  }
}
