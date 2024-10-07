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
import { toEnum as roleToEnum } from "../../../shared/domain/enums/role_enum";
import { toEnum as modalityToEnum } from "../../../shared/domain/enums/modality_enum";
import { toEnum as classTypeToEnum } from "../../../shared/domain/enums/class_type_enum";
import { Class } from "@/shared/domain/entities/class";

interface ParsedData {
  type: 'professor' | 'room' | 'subject' | 'class';
  classId?: string;
  name?: string; // for subject, class and professor
  classModality?: string;
  classType?: string;
  subjectCode?: string;
  subjectPeriod?: string;
  roomBlock?: string;
  roomNumber?: string;
  roomCapacity?: string;
  professorEmail?: string;
  professorRA?: string;
  professorPassword?: string;
}

export class CreateUserUsecase {
  constructor(
    private userRepo: IUserRepository, 
    private roomRepo: IRoomRepository,
    private subjectRepo: ISubjectRepository,
    private classRepo: IClassRepository
  ) {}

  async execute(buffer: Buffer): Promise<void> {
    const readableStream = new Readable();
    readableStream
      .pipe(csv())
      .on('data', (row: ParsedData) => {
        if (row.type === 'professor') {
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
            throw new Error('Invalid format');
          }

        } else if (row.type === 'room') {
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
            throw new Error('Invalid format');
          }

        } else if (row.type === 'subject') {
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
            throw new Error('Invalid format');
          }
        } else if (row.type === 'class') {
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
            throw new Error('Invalid format');
          }
        } else {
          throw new Error('Invalid type');
        }
      })
  }
}