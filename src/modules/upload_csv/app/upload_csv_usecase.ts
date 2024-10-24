import { Readable } from 'stream'
import csv from 'csv-parser'

import { ROLE } from '../../../shared/domain/enums/role_enum'
import { User } from '../../../shared/domain/entities/user'
import { Subject } from '../../../shared/domain/entities/subject'
import { Schedule } from '../../../shared/domain/entities/schedule'
import { toEnum as periodToEnum } from '../../../shared/domain/enums/period_enum'
import { toEnum as modalityToEnum } from '../../../shared/domain/enums/modality_enum'
import { toEnum as classTypeToEnum } from '../../../shared/domain/enums/class_type_enum'
import { toEnum as academicPeriodToEnum } from '../../../shared/domain/enums/academic_period_enum'
import { Class } from '../../../shared/domain/entities/class'
import {
  InvalidCSVFormat,
  InvalidCSVRowType,
} from '../../../shared/helpers/errors/usecase_errors'
import { IScheduleRepository } from '../../../shared/domain/repositories/schedule_repository_interface'
//import { v4 as uuidv4 } from 'uuid'
import { as } from 'vitest/dist/chunks/reporters.DAfKSDh5'
import { EntityError } from '../../../shared/helpers/errors/domain_errors'

interface ParsedData {
  type: 'professor' | 'subject' | 'class' | 'schedule'
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
  courseName: string
  coordEmail: string
  academicPeriod: string
}

function bufferToStream(buffer: Buffer): Readable {
  const stream = new Readable()
  stream.push(buffer)
  stream.push(null) // Indica o fim do stream
  return stream
}
type CourseSchedule = {
  scheduleId: string
  courseName: string
  coordEmail: string
  academicPeriod: string
}
export class UploadCSVUsecase {
  constructor(private repo: IScheduleRepository) {}

  async execute(buffer: Buffer): Promise<string> {
    const userList: User[] = []
    const subjectList: Subject[] = []
    const classList: Class[] = []
    const scheduleList: CourseSchedule[] = []
    let repo_len = this.repo.getUsersLength()
    let noProblems = ''
    let possibleRowTypeError = ''
    let rowNumber = 0
    let rowError = 0
    let entireRow: string[]
    const schedulePromises: Promise<void>[] = []

    return new Promise((resolve, reject) => {
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
                scheduleId: row.scheduleId!,
              })
              classList.push(newClass)
            } else if (row.type === 'schedule') {
              const newScheduleId = row.scheduleId!
              const newCourseName = row.courseName!
              const newCoordEmail = row.coordEmail!
              const newAcademicPeriod = academicPeriodToEnum(
                row.academicPeriod!,
              )

              if (
                newScheduleId === '' ||
                newCourseName === '' ||
                newCoordEmail === ''
              ) {
                noProblems = 'invalidCSVFormat'
                return
              }

              const schedulePromise = {
                scheduleId: newScheduleId,
                courseName: newCourseName,
                coordEmail: newCoordEmail,
                academicPeriod: newAcademicPeriod,
              }

              scheduleList.push(schedulePromise)
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
        .on('end', async () => {
          if (noProblems === '') {
            try {
              for (const newUser of userList) {
                await this.repo.createUser(newUser)
              }
              for (const newSubject of subjectList) {
                await this.repo.createSubject(newSubject)
              }
              for (const newClass of classList) {
                await this.repo.createClass(newClass)
              }
              for (const newSchedule of scheduleList) {
                const newScheduleId = newSchedule.scheduleId
                const newCourseName = newSchedule.courseName
                const newCoordEmail = newSchedule.coordEmail
                const newAcademicPeriod = newSchedule.academicPeriod
                const user = await this.repo.getUserByEmail(newCoordEmail)
                const groupNumber = 1
                if (!Schedule.validateScheduleId(newScheduleId)) {
                  throw new EntityError('scheduleId')
                }
                const courseGrade = parseInt(newScheduleId.charAt(3))
                const schedule = new Schedule({
                  scheduleId: newScheduleId,
                  courseName: newCourseName,
                  userId: user.id,
                  academicPeriod: academicPeriodToEnum(newAcademicPeriod),
                  courseGrade: courseGrade,
                  groupNumber: groupNumber,
                })
                await this.repo.createSchedule(schedule)
              }
              resolve('ok')
            } catch (error) {
              reject(error)
            }
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
