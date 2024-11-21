import { EntityError } from '../../../shared/helpers/errors/domain_errors'
import { Suitability } from '../../../shared/domain/entities/suitability'
import { InvalidRole } from '../../../shared/helpers/errors/usecase_errors'
import { User } from '../../../shared/domain/entities/user'
import { IScheduleRepository } from '../../../shared/domain/repositories/schedule_repository_interface'
import { ROLE } from '../../../shared/domain/enums/role_enum'

export class GetSuitabilitiesByProfessorUsecase {
  constructor(private repo: IScheduleRepository) {}

  async execute(userId: number): Promise<Suitability[]> {
    if (!User.validateId(userId)) {
      throw new EntityError('userId')
    }
    // check if user exists
    const user = await this.repo.getUser(userId)

    // check if user is a professor
    if (user.role === ROLE.STAFF) {
      throw new InvalidRole(`${ROLE.PROFESSOR} or ${ROLE.COORDINATOR}`, ROLE.STAFF)
    }

    const suitabilities = await this.repo.getSuitabilitiesByUserId(userId)

    return suitabilities
  }
}
