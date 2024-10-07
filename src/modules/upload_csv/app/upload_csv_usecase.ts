import { Readable } from "stream";
import csv from 'csv-parser';

import { IClassRepository } from "../../../shared/domain/repositories/class_repository_interface"
import { IRoomRepository } from "../../../shared/domain/repositories/room_repository_interface"
import { ISubjectRepository } from "../../../shared/domain/repositories/subject_repository_interface"
import { IUserRepository } from "../../../shared/domain/repositories/user_repository_interface"
import { ROLE } from "../../../shared/domain/enums/role_enum";
import { User } from "../../../shared/domain/entities/user";
import { Room } from "../../../shared/domain/entities/room";
import { Subject } from "../../../shared/domain/entities/subject";
import { toEnum as periodToEnum } from "../../../shared/domain/enums/period_enum";
import { toEnum as modalityToEnum } from "../../../shared/domain/enums/modality_enum";
import { toEnum as classTypeToEnum } from "../../../shared/domain/enums/class_type_enum";
import { Class } from "../../../shared/domain/entities/class";

interface ParsedData {
  _0: 'professor' | 'room' | 'subject' | 'class'; // type
  _1: string; // classId
  _2: string; // name -> for subject, class and professor
  _3: string; // classModality
  _4: string; // classType
  _5: string; // subjectCode
  _6: string; // subjectPeriod
  _7: string; // roomBlock
  _8: string; // roomNumber
  _9: string; // roomCapacity
  _10: string; // professorEmail
  _11: string; // professorRA
  _12: string; // professorPassword
}

function bufferToStream(buffer: Buffer): Readable {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null); // Indica o fim do stream
  return stream;
}

export class UploadCSVUsecase {
  constructor(
    private userRepo: IUserRepository, 
    private roomRepo: IRoomRepository,
    private subjectRepo: ISubjectRepository,
    private classRepo: IClassRepository
  ) {}

  async execute(buffer: Buffer): Promise<void> {
    bufferToStream(buffer)
      .pipe(csv())
      .on('data', (row: ParsedData) => {
        if (row._0 === 'professor') {
          try {
            const newId = this.userRepo.getLength() + 1;
            const newUser = new User({
              id: newId,
              name: row.name!,
              email: row.professorEmail!,
              role: ROLE.PROFESSOR,
              RA: row.professorRA!,
              password: row.professorPassword!,
            });
            this.userRepo.createUser(newUser);
          }
          catch (error) {
            throw new Error('Invalid professor format');
          }

        } else if (row._0 === 'room') {
          try {
            const newId = row.roomBlock! + row.roomNumber!;
            const newCapacity = parseInt(row.roomCapacity!);
            const newRoom = new Room({
              id: newId,
              block: row.roomBlock!,
              roomNumber: row.roomNumber!,
              capacity: newCapacity,
            });
            this.roomRepo.createRoom(newRoom);
          }
          catch (error) {
            throw new Error('Invalid room format');
          }

        } else if (row._0 === 'subject') {
          try {
            const newPeriod = periodToEnum(row.subjectPeriod!);
            const newSubject = new Subject({
              code: row.subjectCode!,
              name: row.name!,
              period: newPeriod,
            });
            this.subjectRepo.createSubject(newSubject);
          }
          catch (error) {
            throw new Error('Invalid subject format');
          }
        } else if (row._0 === 'class') {
          try {
            const newModality = modalityToEnum(row.classModality!);
            const newType = classTypeToEnum(row.classType!);
            const newClass = new Class({
              id: row.classId!,
              name: row.name!,
              modality: newModality,
              classType: newType,
              subjectCode: row.subjectCode!,
            });
            this.classRepo.createClass(newClass);
          }
          catch (error) {
            throw new Error('Invalid class format');
          }
        } else {
          throw new Error('Invalid type');
        }
      })
      .on('error', (err) => {
        console.error('Error processing CSV:', err);
      });
  }
}