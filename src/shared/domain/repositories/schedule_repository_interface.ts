import { Availability } from '../entities/availability'
import { AvFullfilled } from '../entities/avFullfilled'
import { Class } from '../entities/class'
import { Possibility } from '../entities/possibility'
import { Schedule } from '../entities/schedule'
import { Subject } from '../entities/subject'
import { Suitability } from '../entities/suitability'
import { User } from '../entities/user'
import { ROLE } from '../enums/role_enum'

export interface IScheduleRepository {
    // User methods
    getUser(id: number): Promise<User>
    getUsersByRole(role: ROLE): Promise<User[]>
    createUser(user: User): Promise<User>
    updateUser(id: number, newName: string, newEmail: string): Promise<User>
    deleteUser(id: number): Promise<User>
    getUserByEmail(email: string): Promise<User>
    getRoleByEmail(email: string): Promise<ROLE | null>
    getProfessorsByClass(classId: string): Promise<User[]>
    getUsersWithAvailabilitiesAndSuitabilities(usersIds: number[]): Promise<
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
    >

    // Class methods
    getClass(id: string): Promise<Class>
    getAllClasses(): Promise<Class[]>
    createClass(newClass: Class): Promise<Class>
    getClassesByIds(classesIds: string[]): Promise<Record<string, Class>>
    getClassesByScheduleId(scheduleId: string): Promise<Class[]>
    getFullfilledDataByClassId(
        classId: string,
    ): Promise<{ professorId: number; possibilityId: string } | null>

    // Subject methods
    getSubject(code: string): Promise<Subject>
    getAllSubjects(): Promise<Subject[]>
    createSubject(subject: Subject): Promise<Subject>

    // Suitability methods
    createSuitability(suitability: Suitability): Promise<Suitability>
    getSuitabilitiesByUserId(userId: number): Promise<Suitability[]>
    deleteSuitabilityByUserId(userId: number): Promise<Suitability[]>

    // Schedule methods
    getSchedule(id: string, groupNumber: number): Promise<Schedule>
    getAllSchedules(): Promise<Schedule[]>
    createSchedule(schedule: Schedule): Promise<Schedule>
    getSchedulesByUserId(userId: number): Promise<Schedule[]>

    // Possibility methods
    getPossibility(id: string): Promise<Possibility>
    getPossibilitiesByScheduleId(scheduleId: string): Promise<Possibility[]>
    createPossibility(possibility: Possibility): Promise<Possibility>
    getPossibilitiesByIds(
        possibilitiesIds: string[],
    ): Promise<Record<string, Possibility>>

    // Availability methods
    getAvailability(id: string): Promise<Availability>
    getAvailabilitiesByUserId(userId: number): Promise<Availability[]>
    deleteAvailability(id: string): Promise<Availability>
    createAvailability(availability: Availability): Promise<Availability>
    getAvailabilitiesByUserId(userId: number): Promise<Availability[]>

    // AvFullfilled methods
    getAllAvsFullfilled(): Promise<AvFullfilled[]>
    createAvFullfilled(avFullfilled: AvFullfilled): Promise<AvFullfilled>
    createAvsFullfilled(avsFullfilled: AvFullfilled[]): Promise<AvFullfilled[]> // by now, because it is just used on update_availabilities_fullfilled (that already validates everything), this method doesn't validate anything
    deleteAvsFullfilledByScheduleId(scheduleId: string): Promise<AvFullfilled[]>
}
