import { MODALITY, ModalityToEnum } from '../enums/modality_enum'
import { CLASSTYPE, ClasstypeToEnum } from '../enums/class_type_enum'
import { EntityError } from '../../helpers/errors/domain_errors'

export type ClassProps = {
  id: string
  name: string
  modality: MODALITY
  classType: CLASSTYPE
}

export type JsonProps = {
  classId: string
  name: string
  modality: string
  classType: string
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

  static fromJSON(json: JsonProps) {
    return new Class({
      id: json.classId,
      name: json.name,
      modality: ModalityToEnum(json.modality as string),
      classType: ClasstypeToEnum(json.classType as string),
    })
  }

  toJSON() {
    return {
      id: this.props.id,
      name: this.props.name,
      modality: this.props.modality,
      classType: this.props.classType,
    }
  }
}
