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
  _0: 'professor' | 'room' | 'subject' | 'class' // type
  _1: string // classId
  _2: string // name -> for subject, class and professor
  _3: string // classModality
  _4: string // classType
  _5: string // subjectCode
  _6: string // subjectPeriod
  _7: string // roomBlock
  _8: string // roomNumber
  _9: string // roomCapacity
  _10: string // professorEmail
  _11: string // professorRa
  _12: string // professorPassword
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

    return new Promise((resolve, reject) => {
      bufferToStream(buffer)
        .pipe(csv())
        .on('data', (row: ParsedData) => {
          try {
            if (row._0 === 'professor') {
              const newId = this.userRepo.getLength() + 1
              const newName = row._2
              const newEmail = row._10
              const newRA = row._11
              const newPassword = row._12

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
            } else if (row._0 === 'room') {
              const newId = row._7! + row._8!
              const newCapacity = parseInt(row._9!)
              const newBlock = row._7!
              const newNumber = row._8!
              if (newBlock === '' || newNumber === '' || isNaN(newCapacity)) {
                noProblems = 'invalidCSVFormat'
                return
              }
              const newRoom = new Room({
                id: newId,
                block: row._7!,
                roomNumber: row._8!,
                capacity: newCapacity,
              })
              roomList.push(newRoom)
            } else if (row._0 === 'subject') {
              const newPeriod = periodToEnum(row._6!)
              const newCode = row._5!
              const newName = row._2!
              if (newCode === '' || newName === '') {
                noProblems = 'invalidCSVFormat'
                return
              }
              const newSubject = new Subject({
                code: row._5!,
                name: row._2!,
                period: newPeriod,
              })
              subjectList.push(newSubject)
            } else if (row._0 === 'class') {
              const newModality = modalityToEnum(row._3!)
              const newType = classTypeToEnum(row._4!)
              const newClassId = row._1!
              const newSubjectCode = row._5!
              const newName = row._2!
              if (
                newClassId === '' ||
                newSubjectCode === '' ||
                newName === ''
              ) {
                noProblems = 'invalidCSVFormat'
                return
              }
              const newClass = new Class({
                id: row._1!,
                name: row._2!,
                modality: newModality,
                classType: newType,
                subjectCode: row._5!,
              })
              classList.push(newClass)
            } else if (
              row._0 === 'type' &&
              row._1 === 'classId' &&
              row._2 === 'name' &&
              row._3 === 'classModality' &&
              row._4 === 'classType' &&
              row._5 === 'subjectCode' &&
              row._6 === 'subjectPeriod' &&
              row._7 === 'roomBlock' &&
              row._8 === 'roomNumber' &&
              row._9 === 'roomCapacity' &&
              row._10 === 'professorEmail' &&
              row._11 === 'professorRa' &&
              row._12 === 'professorPassword'
            ) {
              // Do nothing
            } else {
              noProblems = 'invalidCSVRowType'
              possibleRowTypeError = row._0
            }
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
            reject(new InvalidCSVRowType(possibleRowTypeError))
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
