import { EntityError } from '../../../shared/helpers/errors/domain_errors'
import { Suitability } from '../../../shared/domain/entities/suitability'
import { NoItemsFound } from '../../../shared/helpers/errors/usecase_errors'
import { User } from '../../../shared/domain/entities/user'
import { IScheduleRepository } from '../../../shared/domain/repositories/schedule_repository_interface'

export class GetSuitabilitiesByProfessorUsecase {
  constructor(private repo: IScheduleRepository) {}

  async execute(userId: number): Promise<Suitability[]> {
    if (!User.validateId(userId)) {
      throw new EntityError('userId')
    }
    // check if user exists
    await this.repo.getUser(userId)

    const suitabilities = await this.repo.getSuitabilitiesByUserId(userId)
    if (suitabilities.length === 0) {
      throw new NoItemsFound('suitabilities')
    }
    return suitabilities
  }
}
