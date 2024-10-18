import { Readable } from 'stream'
import csv from 'csv-parser'

import { ROLE } from '../../../shared/domain/enums/role_enum'
import { User } from '../../../shared/domain/entities/user'
import { Subject } from '../../../shared/domain/entities/subject'
import { toEnum as periodToEnum } from '../../../shared/domain/enums/period_enum'
import { toEnum as modalityToEnum } from '../../../shared/domain/enums/modality_enum'
import { toEnum as classTypeToEnum } from '../../../shared/domain/enums/class_type_enum'
import { Class } from '../../../shared/domain/entities/class'
import {
  InvalidCSVFormat,
  InvalidCSVRowType,
} from '../../../shared/helpers/errors/usecase_errors'
import { IScheduleRepository } from '../../../shared/domain/repositories/schedule_repository_interface'

interface ParsedData {
  type: 'professor' | 'subject' | 'class'
  classId: string
  name: string
  classModality: string
  classType: string
  subjectCode: string
  subjectPeriod: string
  professorEmail: string
  professorRa: string
  professorPassword: string
  roomCode: string
  scheduleId: string
}

function bufferToStream(buffer: Buffer): Readable {
  const stream = new Readable()
  stream.push(buffer)
  stream.push(null) // Indica o fim do stream
  return stream
}

export class UploadCSVUsecase {
  constructor(private repo: IScheduleRepository) {}

  async execute(buffer: Buffer): Promise<string> {
    const userList: User[] = []
    const subjectList: Subject[] = []
    const classList: Class[] = []
    let repo_len = this.repo.getUsersLength()
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
              repo_len = repo_len + 1
              const newId = repo_len
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
              const newRoomCode = row.roomCode || undefined
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
                roomCode: newRoomCode,
                scheduleId: row.scheduleId!,
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
              row.professorEmail === 'professorEmail' &&
              row.professorRa === 'professorRa' &&
              row.professorPassword === 'professorPassword' &&
              row.roomCode === 'roomCode' &&
              row.scheduleId === 'scheduleId'
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
              async (newUser) => await this.repo.createUser(newUser),
            )
            subjectList.forEach(
              async (newSubject) => await this.repo.createSubject(newSubject),
            )
            classList.forEach(
              async (newClass) => await this.repo.createClass(newClass),
            )
            resolve('ok') // Retorna 'ok' ao final da execução
          } else if (noProblems === 'invalidCSVRowType') {
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
