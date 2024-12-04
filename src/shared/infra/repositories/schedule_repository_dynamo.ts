/* eslint-disable @typescript-eslint/no-explicit-any */
import { IScheduleRepository } from '../../../shared/domain/repositories/schedule_repository_interface'
import { User } from '../../domain/entities/user'
import { ROLE } from '../../domain/enums/role_enum'
import { Class } from '../../../shared/domain/entities/class'
import { MODALITY } from '../../../shared/domain/enums/modality_enum'
import { CLASSTYPE } from '../../../shared/domain/enums/class_type_enum'
import { Subject } from '../../../shared/domain/entities/subject'
import { PERIOD } from '../../../shared/domain/enums/period_enum'
import { Suitability } from '../../../shared/domain/entities/suitability'
import { Possibility } from '../../../shared/domain/entities/possibility'
import { WEEK_DAY } from '../../../shared/domain/enums/week_day_enum'
import { MAUA_START_TIME } from '../../../shared/domain/enums/maua_start_time_enum'
import { MAUA_END_TIME } from '../../../shared/domain/enums/maua_end_time_enum'
import {
    ViolateDataRule,
    DuplicatedItem,
    NoItemsFound,
} from '../../../shared/helpers/errors/repo_error'
import { Schedule } from '../../../shared/domain/entities/schedule'
import { Availability } from '../../../shared/domain/entities/availability'
import { AvFullfilled } from '../../../shared/domain/entities/avFullfilled'
import { ACADEMIC_PERIOD } from '../../../shared/domain/enums/academic_period_enum'
import { DynamoDatasource } from '../external/dynamo/datasources/dynamo_datasource'
import { Environments } from '../../../shared/environments'
import { UserDynamoDTO } from '../dto/user_dynamo_dto'
import { ClassDynamoDTO } from '../dto/class_dynamo_dto'

export class ScheduleRepositoryDynamo implements IScheduleRepository {
    constructor(
        private dynamo: DynamoDatasource = new DynamoDatasource(
            Environments.getEnvs().dynamoTableName,
            Environments.getEnvs().dynamoPartitionKey,
            Environments.getEnvs().region,
            undefined,
            undefined,
            Environments.getEnvs().endpointUrl,
            Environments.getEnvs().dynamoSortKey,
        ),
    ) {}

    // #region User methods
    async updateCounter(): Promise<number> {
        const num = await this.dynamo.getItem('COUNTER', 'COUNTER')
        console.log('num - [UPDATE_CONTER] - ', num)

        if (num && num.Item && num.Item.COUNTER !== undefined) {
            const counter = Number(num['Item']['COUNTER']['N'])

            await this.dynamo.updateItem('COUNTER', 'COUNTER', {
                'COUNTER': counter + 1,
            })

            return counter + 1
        } else {
            throw new Error('Failed to retrieve or update the counter.')
        }
    }

    static userPartitionKeyFormat(): string {
        return `user`
    }

    static userSortKeyFormat(id: number, role: ROLE): string {
        return `${role}#${id}`
    }

    getUsersLength(): number {
        return 10
    }

    async getUserCounter(): Promise<number> {
        const number = await this.updateCounter()
        return number
    }

    async getUser(id: number): Promise<User> {
        throw new Error('Method not implemented.')
    }

    async getUserByEmail(email: string): Promise<User> {
        throw new Error('Method not implemented.')
    }

    async getRoleByEmail(email: string): Promise<ROLE | null> {
        throw new Error('Method not implemented.')
    }

    async createUser(user: User): Promise<User> {
        throw new Error('Method not implemented.')
        //   const exists = this.users.find(
        //     (u) => u.id === user.id || u.email === user.email,
        // )
        // if (exists) {
        //     if (exists.id === user.id) {
        //         throw new DuplicatedItem('userId')
        //     } else {
        //         throw new DuplicatedItem('email')
        //     }
        // }
        // this.users.push(user)
        // return user
        // const id = await this.getUserCounter()
        // const userDto = UserDynamoDTO.fromEntity(user)
        // await this.dynamo.putItem(
        //     userDto.toDynamo(),
        //     ScheduleRepositoryDynamo.userPartitionKeyFormat(),
        //     ScheduleRepositoryDynamo.userSortKeyFormat(id, user.role),
        // )
        // return Promise.resolve(userDto.toEntity())
    }

    async updateUser(
        id: number,
        newName: string,
        newEmail: string,
    ): Promise<User> {
        throw new Error('Method not implemented.')
    }

    async deleteUser(id: number): Promise<User> {
        throw new Error('Method not implemented.')
    }

    async getProfessorsByClass(classId: string): Promise<User[]> {
        throw new Error('Method not implemented.')
    }

    async getUsersByRole(role: ROLE): Promise<User[]> {
        throw new Error('Method not implemented.')
    }

    async getUsersWithAvailabilitiesAndSuitabilities(
        userIds: number[],
    ): Promise<
        Record<
            number,
            {
                user: User
                suitabilities: Suitability[]
                availabilities: {
                    data: Availability
                    scheduleFullfilled: string | undefined
                }[]
            }
        >
    > {
        throw new Error('Method not implemented.')
    }

    // #region Class methods
    static classPartitionKeyFormat(): string {
        return `class`
    }

    static classSortKeyFormat(classId: string, scheduleId: string): string {
        return `${classId}#${scheduleId}`
    }

    async getClass(classId: string): Promise<Class> {
        throw new Error('Method not implemented.')
    }

    async getAllClasses(): Promise<Class[]> {
        throw new Error('Method not implemented.')
    }

    async getClassesByScheduleId(scheduleId: string): Promise<Class[]> {
        throw new Error('Method not implemented.')
    }

    async createClass(newClass: Class): Promise<Class> {
        const classDto = ClassDynamoDTO.fromEntity(newClass)
        try {
            await this.dynamo.putItem(
                classDto.toDynamo(),
                ScheduleRepositoryDynamo.classPartitionKeyFormat(),
                ScheduleRepositoryDynamo.classSortKeyFormat(
                    newClass.id,
                    newClass.scheduleId,
                ),
                {
                    ConditionExpression: 'attribute_not_exists(id)',
                },
            )
        } catch (err) {
            if (
                (err as { name: string }).name ===
                'ConditionalCheckFailedException'
            ) {
                throw new DuplicatedItem('Class')
            } else {
                throw err
            }
        }

        return Promise.resolve(classDto.toEntity())
    }

    async getClassesByIds(
        classesIds: string[],
    ): Promise<Record<string, Class>> {
        throw new Error('Method not implemented.')
    }

    async getFullfilledDataByClassId(
        classId: string,
    ): Promise<{ professorId: number; possibilityId: string } | null> {
        throw new Error('Method not implemented.')
    }

    // #region Subject methods
    async getSubject(code: string): Promise<Subject> {
        throw new Error('Method not implemented.')
    }

    async getAllSubjects(): Promise<Subject[]> {
        throw new Error('Method not implemented.')
    }

    async createSubject(subject: Subject): Promise<Subject> {
        throw new Error('Method not implemented.')
    }

    // #region Suitability methods
    static suitabilityPartitionKeyFormat(): string {
        return `suitability`
    }

    static suitabilitySortKeyFormat(
        subjectCode: string,
        userId: number,
    ): string {
        return `${subjectCode}#${userId}`
    }

    async createSuitability(suitability: Suitability): Promise<Suitability> {
        throw new Error('Method not implemented.')
    }

    async deleteSuitabilityByUserId(userId: number): Promise<Suitability[]> {
        throw new Error('Method not implemented.')
    }

    async getSuitabilitiesByUserId(userId: number): Promise<Suitability[]> {
        throw new Error('Method not implemented.')
    }

    // #region Schedule methods
    async getSchedule(id: string, groupNumber: number): Promise<Schedule> {
        throw new Error('Method not implemented.')
    }

    async getAllSchedules(): Promise<Schedule[]> {
        throw new Error('Method not implemented.')
    }

    async createSchedule(schedule: Schedule): Promise<Schedule> {
        throw new Error('Method not implemented.')
    }

    async getSchedulesByUserId(userId: number): Promise<Schedule[]> {
        throw new Error('Method not implemented.')
    }

    // #region Possibility methods
    async getPossibility(possibilityId: string): Promise<Possibility> {
        throw new Error('Method not implemented.')
    }

    async getPossibilitiesByScheduleId(
        scheduleId: string,
    ): Promise<Possibility[]> {
        throw new Error('Method not implemented.')
    }

    async createPossibility(possibility: Possibility): Promise<Possibility> {
        throw new Error('Method not implemented.')
    }

    async getPossibilitiesByIds(
        possibilitiesIds: string[],
    ): Promise<Record<string, Possibility>> {
        throw new Error('Method not implemented.')
    }

    // #region Availability methods
    async getAvailability(id: string): Promise<Availability> {
        throw new Error('Method not implemented.')
    }

    async getAvailabilitiesByUserId(userId: number): Promise<Availability[]> {
        throw new Error('Method not implemented.')
    }

    async deleteAvailability(id: string): Promise<Availability> {
        throw new Error('Method not implemented.')
    }

    async createAvailability(
        availability: Availability,
    ): Promise<Availability> {
        throw new Error('Method not implemented.')
    }

    // #region AvFullfilled methods
    async getAllAvsFullfilled(): Promise<AvFullfilled[]> {
        throw new Error('Method not implemented.')
    }

    async createAvFullfilled(
        avFullfilled: AvFullfilled,
    ): Promise<AvFullfilled> {
        throw new Error('Method not implemented.')
    }

    async createAvsFullfilled(
        avsFullfilled: AvFullfilled[],
    ): Promise<AvFullfilled[]> {
        throw new Error('Method not implemented.')
    }

    async deleteAvsFullfilledByScheduleId(
        scheduleId: string,
    ): Promise<AvFullfilled[]> {
        throw new Error('Method not implemented.')
    }
}
