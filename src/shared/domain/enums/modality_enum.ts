export enum MODALITY {
  IN_PERSON = 'IN_PERSON',
  REMOTE = 'REMOTE',
  HYBRID = 'HYBRID',
}

export function toEnum(value: string): MODALITY {
  switch (value) {
    case 'IN_PERSON':
      return MODALITY.IN_PERSON
    case 'REMOTE':
      return MODALITY.REMOTE
    case 'HYBRID':
      return MODALITY.HYBRID
    default:
      throw new Error('Invalid value')
  }
}
