import { CLASSTYPE } from '../../../shared/domain/enums/class_type_enum'
import { MODALITY } from '../../../shared/domain/enums/modality_enum'
import { Class } from '../../domain/entities/class'
import { IClassRepository } from '../../domain/repositories/class_repository_interface'
import { NoItemsFound } from '../../helpers/errors/usecase_errors'

export class ClassRepositoryMock implements IClassRepository {
  private classes: Class[] = [
    new Class({
      id: '0a8c5357-1f07-5b24-9845-9318c47ab923',
      name: 'Linguagens de Programacao II',
      modality: MODALITY.IN_PERSON,
      classType: CLASSTYPE.THEORY,
      subjectCode: 'ECM256',
    }),
    new Class({
      id: '0a8c5357-1f07-5b24-9845-9318c47ac923',
      name: 'Linguagens de Programacao II',
      modality: MODALITY.IN_PERSON,
      classType: CLASSTYPE.THEORY,
      subjectCode: 'ECM256',
    }),
    new Class({
      id: '0a8c5357-1f07-5b24-9845-9318c47ac922',
      name: 'Physics I',
      modality: MODALITY.REMOTE,
      classType: CLASSTYPE.THEORY,
      subjectCode: 'EFB207',
    }),
    new Class({
      id: '0a8c5357-1f07-5b24-9845-9318c47ac921',
      name: 'Physics I',
      modality: MODALITY.IN_PERSON,
      classType: CLASSTYPE.LAB,
      subjectCode: 'EFB207',
    }),
  ]

  getLength(): number {
    return this.classes.length
  }

  async getClass(id: string): Promise<Class> {
    const selectedClass = this.classes.find((c) => c.id === id)
    if (!selectedClass) {
      throw new NoItemsFound('id')
    }
    return selectedClass
  }

  async getAllClasss(): Promise<Class[]> {
    return this.classes
  }

  async createClass(newClass: Class): Promise<Class> {
    this.classes.push(newClass)
    return newClass
  }
}
