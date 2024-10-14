import { MODALITY, toEnum as ModalityToEnum } from '../enums/modality_enum'
import { CLASSTYPE, toEnum as ClasstypeToEnum } from '../enums/class_type_enum'
import { EntityError } from '../../helpers/errors/domain_errors'

export type ClassProps = {
  id: string
  name: string
  modality: MODALITY
  classType: CLASSTYPE
  subjectCode: string
  roomCode?: string
}

export type JsonProps = {
  classId: string
  name: string
  modality: string
  classType: string
  subjectCode: string
  roomCode?: string
}
const CLASS_ID_LENGTH = 36
const CLASS_NAME_MIN_LENGTH = 3

export class Class {
  constructor(public props: ClassProps) {
    if (!Class.validateId(props.id)) {
      throw new EntityError('props.id')
    }
    this.props.id = props.id

    if (!Class.validateName(props.name)) {
      throw new EntityError('props.name')
    }
    this.props.name = props.name

    if (!Class.validateModality(props.modality as MODALITY)) {
      throw new EntityError('props.modality')
    }
    this.props.modality = props.modality

    if (!Class.validateClassType(props.classType as CLASSTYPE)) {
      throw new EntityError('props.classType')
    }
    this.props.classType = props.classType

    if (!Class.validateCode(props.subjectCode)) {
      throw new EntityError('props.subjectCode')
    }
    this.props.subjectCode = props.subjectCode

    if (!Class.validateRoomCode(props.roomCode)) {
      throw new EntityError('props.roomCode')
    }
    this.props.roomCode = props.roomCode
  }

  static validateId(id: string): boolean {
    if (id === null) {
      return false
    }
    if (id.length !== CLASS_ID_LENGTH) {
      return false
    }
    return true
  }

  static validateName(name: string): boolean {
    if (name === null) {
      return false
    }
    if (name.length < CLASS_NAME_MIN_LENGTH) {
      return false
    }
    return true
  }

  static validateModality(modality: MODALITY): boolean {
    if (modality === null) {
      return false
    }
    if (Object.values(MODALITY).includes(modality) === false) {
      return false
    }
    return true
  }

  static validateClassType(classType: CLASSTYPE): boolean {
    if (classType === null) {
      return false
    }
    if (Object.values(CLASSTYPE).includes(classType) === false) {
      return false
    }
    return true
  }

  static validateCode(subjectCode: string): boolean {
    if (subjectCode === null || !subjectCode.match(/^[A-Z]{3}\d{3}$/)) {
      return false
    } else {
      return true
    }
  }

  static validateRoomCode(roomCode: string | undefined): boolean {
    if (roomCode === null || roomCode === undefined) {
      return true
    } else if (!roomCode.match(/^[A-Z]\d{2,3}$/)) {
      return false
    } else if (typeof roomCode != 'string') {
        return false
    }
    return true
  }

  static fromJSON(json: JsonProps) {
    return new Class({
      id: json.classId,
      name: json.name,
      modality: ModalityToEnum(json.modality as string),
      classType: ClasstypeToEnum(json.classType as string),
      subjectCode: json.subjectCode,
    })
  }

  toJSON() {
    return {
      id: this.props.id,
      name: this.props.name,
      modality: this.props.modality,
      classType: this.props.classType,
      subjectCode: this.props.subjectCode,
    }
  }

  get id(): string {
    return this.props.id
  }

  get name(): string {
    return this.props.name
  }

  get modality(): MODALITY {
    return this.props.modality
  }

  get classType(): CLASSTYPE {
    return this.props.classType
  }

  get subjectCode(): string {
    return this.props.subjectCode
  }

  get roomCode(): string | undefined {
    return this.props.roomCode
  }

  set id(id: string) {
    if (!Class.validateId(id)) {
      throw new EntityError('id')
    }
    this.props.id = id
  }

  set name(name: string) {
    if (!Class.validateName(name)) {
      throw new EntityError('name')
    }
    this.props.name = name
  }

  set modality(modality: MODALITY) {
    if (!Class.validateModality(modality)) {
      throw new EntityError('modality')
    }
    this.props.modality = modality
  }

  set classType(classType: CLASSTYPE) {
    if (!Class.validateClassType(classType)) {
      throw new EntityError('classType')
    }
    this.props.classType = classType
  }

  set subjectCode(subjectCode: string) {
    if (!Class.validateCode(subjectCode)) {
      throw new EntityError('subjectCode')
    }
    this.props.subjectCode = subjectCode
  }

  set roomCode(roomCode: string | undefined) {
    if (!Class.validateRoomCode(roomCode)) {
      throw new EntityError('roomCode')
    }
    this.props.roomCode = roomCode
  }
}
