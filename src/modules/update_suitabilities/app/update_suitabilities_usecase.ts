import { Suitability } from '../../../shared/domain/entities/suitability'
import { IScheduleRepository } from '../../../shared/domain/repositories/schedule_repository_interface'
import { InvalidRole } from '../../../shared/helpers/errors/usecase_errors'
import { ROLE } from '../../../shared/domain/enums/role_enum'
import { EntityError } from '../../../shared/helpers/errors/domain_errors'
import { Subject } from '../../../shared/domain/entities/subject'

export class UpdateSuitabilitiesUsecase {
  constructor(private repo: IScheduleRepository) {
    this.repo = repo
  }

  async execute(userId: number, subjects: string[]): Promise<boolean> {
    // check if user exists
    const user = await this.repo.getUser(userId)

    // check if user is a professor
    if (user.role !== ROLE.PROFESSOR && user.role !== ROLE.COORDINATOR) {
      throw new InvalidRole(
        `${ROLE.PROFESSOR} or ${ROLE.COORDINATOR}`,
        ROLE.STAFF,
      )
    }
    for (const subject of subjects) {
      if (!Subject.validateCode(subject)) {
        throw new EntityError('codeSubject')
      }
    }

    const suitabilities = subjects.map((subject) => {
      return new Suitability({
        userId: userId,
        codeSubject: subject,
      })
    })

    // delete all suitabilities for user
    await this.repo.deleteSuitabilityByUserId(userId)

    // create new suitabilities
    for (const suitability of suitabilities) {
      await this.repo.createSuitability(suitability)
    }

    return true
  }
}
