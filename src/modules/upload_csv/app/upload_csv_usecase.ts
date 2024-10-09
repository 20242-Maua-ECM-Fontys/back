import { Readable } from 'stream'
import csv from 'csv-parser'

import { IClassRepository } from '../../../shared/domain/repositories/class_repository_interface'
import { IRoomRepository } from '../../../shared/domain/repositories/room_repository_interface'
import { ISubjectRepository } from '../../../shared/domain/repositories/subject_repository_interface'
import { IUserRepository } from '../../../shared/domain/repositories/user_repository_interface'
import { ROLE } from '../../../shared/domain/enums/role_enum'
import { User } from '../../../shared/domain/entities/user'
import { Room } from '../../../shared/domain/entities/room'
import { Subject } from '../../../shared/domain/entities/subject'
import { toEnum as periodToEnum } from '../../../shared/domain/enums/period_enum'
import { toEnum as modalityToEnum } from '../../../shared/domain/enums/modality_enum'
import { toEnum as classTypeToEnum } from '../../../shared/domain/enums/class_type_enum'
import { Class } from '../../../shared/domain/entities/class'
import {
  InvalidCSVFormat,
  InvalidCSVRowType,
} from '../../../shared/helpers/errors/usecase_errors'

interface ParsedData {
  type: 'professor' | 'room' | 'subject' | 'class'
  classId: string
  name: string
  classModality: string
  classType: string
  subjectCode: string
  subjectPeriod: string
  roomBlock: string
  roomNumber: string
  roomCapacity: string
  professorEmail: string
  professorRa: string
  professorPassword: string
}

function bufferToStream(buffer: Buffer): Readable {
  const stream = new Readable()
  stream.push(buffer)
  stream.push(null) // Indica o fim do stream
  return stream
}

export class UploadCSVUsecase {
  constructor(
    private userRepo: IUserRepository,
    private roomRepo: IRoomRepository,
    private subjectRepo: ISubjectRepository,
    private classRepo: IClassRepository,
  ) {}

  async execute(buffer: Buffer): Promise<string> {
    const userList: User[] = []
    const roomList: Room[] = []
    const subjectList: Subject[] = []
    const classList: Class[] = []
    let noProblems = ''
    let possibleRowTypeError = ''
    let rowNumber = 0
    let rowError = 0
    let entireRow: string[]

    return new Promise((resolve, reject) => {
      // I want to print a matrix (json inside json) with all the rows and values from the csv buffer
      bufferToStream(buffer)
        .pipe(csv())
        .on('data', (row: ParsedData) => {
          try {
            if (row.type === 'professor') {
              const newId = this.userRepo.getLength() + 1
              const newName = row.name
              const newEmail = row.professorEmail
              const newRA = row.professorRa
              const newPassword = row.professorPassword

              if (
                newName === '' ||
                newEmail === '' ||
                newRA === '' ||
                newPassword === ''
              ) {
                noProblems = 'invalidCSVFormat'
                return
              }

              const newUser = new User({
                id: newId,
                name: newName,
                email: newEmail,
                role: ROLE.PROFESSOR,
                RA: newRA,
                password: newPassword,
              })
              userList.push(newUser)
            } else if (row.type === 'room') {
              const newId = row.roomBlock! + row.roomNumber!
              const newCapacity = parseInt(row.roomCapacity!)
              const newBlock = row.roomBlock!
              const newNumber = row.roomNumber!
              if (newBlock === '' || newNumber === '' || isNaN(newCapacity)) {
                noProblems = 'invalidCSVFormat'
                return
              }
              const newRoom = new Room({
                id: newId,
                block: row.roomBlock!,
                roomNumber: row.roomNumber!,
                capacity: newCapacity,
              })
              roomList.push(newRoom)
            } else if (row.type === 'subject') {
              const newPeriod = periodToEnum(row.subjectPeriod!)
              const newCode = row.subjectCode!
              const newName = row.name!
              if (newCode === '' || newName === '') {
                noProblems = 'invalidCSVFormat'
                return
              }
              const newSubject = new Subject({
                code: row.subjectCode!,
                name: row.name!,
                period: newPeriod,
              })
              subjectList.push(newSubject)
            } else if (row.type === 'class') {
              const newModality = modalityToEnum(row.classModality!)
              const newType = classTypeToEnum(row.classType!)
              const newClassId = row.classId!
              const newSubjectCode = row.subjectCode!
              const newName = row.name!
              if (
                newClassId === '' ||
                newSubjectCode === '' ||
                newName === ''
              ) {
                noProblems = 'invalidCSVFormat'
                return
              }
              const newClass = new Class({
                id: row.classId!,
                name: row.name!,
                modality: newModality,
                classType: newType,
                subjectCode: row.subjectCode!,
              })
              classList.push(newClass)
            } else if (
              row.type === 'type' &&
              row.classId === 'classId' &&
              row.name === 'name' &&
              row.classModality === 'classModality' &&
              row.classType === 'classType' &&
              row.subjectCode === 'subjectCode' &&
              row.subjectPeriod === 'subjectPeriod' &&
              row.roomBlock === 'roomBlock' &&
              row.roomNumber === 'roomNumber' &&
              row.roomCapacity === 'roomCapacity' &&
              row.professorEmail === 'professorEmail' &&
              row.professorRa === 'professorRa' &&
              row.professorPassword === 'professorPassword'
            ) {
              // Do nothing
            } else {
              noProblems = 'invalidCSVRowType'
              possibleRowTypeError = row.type
              rowError = rowNumber
              entireRow = Object.entries(row).map(
                ([key, value]) => `${key}: ${value}`,
              )
            }
            rowNumber++
          } catch (error) {
            noProblems = 'invalidCSVFormat'
          }
        })
        .on('end', () => {
          if (noProblems === '') {
            userList.forEach(
              async (newUser) => await this.userRepo.createUser(newUser),
            )
            roomList.forEach(
              async (newRoom) => await this.roomRepo.createRoom(newRoom),
            )
            subjectList.forEach(
              async (newSubject) =>
                await this.subjectRepo.createSubject(newSubject),
            )
            classList.forEach(
              async (newClass) => await this.classRepo.createClass(newClass),
            )
            resolve('ok') // Retorna 'ok' ao final da execução
          } else if (noProblems === 'invalidCSVRowType') {
            // create a string with the entire row
            const entireRowString = entireRow.join(', ')
            reject(new InvalidCSVRowType(possibleRowTypeError, rowError))
          } else if (noProblems === 'invalidCSVFormat') {
            reject(new InvalidCSVFormat())
          }
        })
        .on('error', (error) => {
          reject(error)
        })
    })
  }
}
