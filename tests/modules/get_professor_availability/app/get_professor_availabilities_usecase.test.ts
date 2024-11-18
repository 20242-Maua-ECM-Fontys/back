import { describe, it, expect } from 'vitest';
import { GetProfessorAvailabilityUsecase } from '../../../../src/modules/get_all_professor_availabilities/app/get_professor_availabilities_usecase';
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock';
import { EntityError } from '../../../../src/shared/helpers/errors/domain_errors'
import { Availability } from '../../../../src/shared/domain/entities/availability';
import { InvalidRole } from '../../../../src/shared/helpers/errors/usecase_errors';
import { NOTFOUND } from 'dns';

describe('Tests for getting professor availability usecase', () =>  {
    it('should return a list of availabilities for an existing professor', async () => {
        const repo = new ScheduleRepositoryMock();
        const usecase = new GetProfessorAvailabilityUsecase(repo);

        const response = await usecase.execute(4);

        expect(response.length).toEqual(8);
    });

    it('should throw an error for the wrong role', async () => {
        const repo = new ScheduleRepositoryMock()
        const usecase = new GetProfessorAvailabilityUsecase(repo)

        await expect(usecase.execute(1)).rejects.toThrow(InvalidRole)
    });
    
    it('Should throw an error if user does not exist', async () => {
        const repo = new ScheduleRepositoryMock()
        const usecase = new GetProfessorAvailabilityUsecase(repo)
        const id = repo.getUsersLength() + 1;
        await expect(usecase.execute(id)).rejects.toThrow("No items found for userId")
      });
    

    it('Should throw an error if userId is invalid', async () => {
        const repo = new ScheduleRepositoryMock()
        const usecase = new GetProfessorAvailabilityUsecase(repo)

        await expect(usecase.execute(-1)).rejects.toThrow(EntityError)
      })
    }
)