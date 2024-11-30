import { IScheduleRepository } from '../../../shared/domain/repositories/schedule_repository_interface'
import { NoItemsFound } from '../../../../src/shared/helpers/errors/repo_error'
import { EntityError } from '../../../../src/shared/helpers/errors/domain_errors'
import { Possibility } from '../../../shared/domain/entities/possibility'

export class GetPossibilitiesByScheduleUsecase {
  constructor(private repo: IScheduleRepository) {}

  async execute(
    scheduleId: string,
    groupNumber: number,
  ): Promise<Possibility[]> {
    if (!Possibility.validateScheduleId(scheduleId)) {
      throw new EntityError('scheduleId')
    }

    // check if schedule exists
    if (!(await this.repo.getSchedule(scheduleId, groupNumber))) {
      throw new NoItemsFound('scheduleId')
    }

    const possibilities =
      await this.repo.getPossibilitiesByScheduleId(scheduleId)

    return possibilities
  }
}
