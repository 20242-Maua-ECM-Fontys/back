import { describe, it, expect } from 'vitest';
import { GetProfessorAvailabilityController } from '../../../../src/modules/get_all_professor_availabilities/app/get_professor_availabilities_controller';
import { GetProfessorAvailabilityUsecase } from '../../../../src/modules/get_all_professor_availabilities/app/get_professor_availabilities_usecase';
import { HttpRequest } from '../../../../src/shared/helpers/external_interfaces/http_models';
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock';

describe('Tests for GetProfessorAvailabilityController', () => {
    it('should return a list of availabilities for an existing professor', async () => {
        const repo = new ScheduleRepositoryMock();
        const usecase = new GetProfessorAvailabilityUsecase(repo);
        const controller = new GetProfessorAvailabilityController(usecase);
        const request = new HttpRequest({
            params: { professorId: 4 },
        });
        const response = await controller.execute(request);

        expect(response?.statusCode).toBe(200);
        expect(response?.body.message).toEqual(
            'availabilities by professor returned',
        );
        expect(Array.isArray(response?.body.availabilities)).toBe(true);
        expect(response?.body.availabilities.length).toBeGreaterThan(0);
    });

    it('should return 404 if no availabilities are found for professorId', async () => {
        const repo = new ScheduleRepositoryMock();
        const usecase = new GetProfessorAvailabilityUsecase(repo);
        const controller = new GetProfessorAvailabilityController(usecase);
        const request = new HttpRequest({
            params: { professorId: 20 },
        });
        const response = await controller.execute(request);

        expect(response?.statusCode).toBe(404);
        expect(response?.body).toEqual('No items found for professorId');
    });

    it('should return 400 if professorId is missing', async () => {
        const repo = new ScheduleRepositoryMock();
        const usecase = new GetProfessorAvailabilityUsecase(repo);
        const controller = new GetProfessorAvailabilityController(usecase);
        const request = new HttpRequest({});
        const response = await controller.execute(request);

        expect(response?.statusCode).toBe(400);
        expect(response?.body).toEqual('Field professorId is missing');
    });

    it('should return 400 if professorId is not a number', async () => {
        const repo = new ScheduleRepositoryMock();
        const usecase = new GetProfessorAvailabilityUsecase(repo);
        const controller = new GetProfessorAvailabilityController(usecase);
        const request = new HttpRequest({
            params: { professorId: 'invalid' },
        });
        const response = await controller.execute(request);

        expect(response?.statusCode).toBe(400);
        expect(response?.body).toEqual(
            "Field professorId isn't in the right type.\n" +
            ' Received: invalid.\n' +
            ' Expected to be a number.',
        );
    });

    it('should return 400 if professorId is an invalid number (negative)', async () => {
        const repo = new ScheduleRepositoryMock();
        const usecase = new GetProfessorAvailabilityUsecase(repo);
        const controller = new GetProfessorAvailabilityController(usecase);
        const request = new HttpRequest({
            params: { professorId: -1 },
        });
        const response = await controller.execute(request);

        expect(response?.statusCode).toBe(400);
        expect(response?.body).toEqual('Field professorId is not valid');
    });
});
