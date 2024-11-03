import { it, expect, describe } from 'vitest';
import { GetProfessorsByClassUsecase } from '../../../../src/modules/get_professors_by_class/app/get_professors_by_class_usecase';
import { GetProfessorsByClassController } from '../../../../src/modules/get_professors_by_class/app/get_professors_by_class_controller';
import { HttpRequest } from '../../../../src/shared/helpers/external_interfaces/http_models';
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock';
import { EntityError} from '../../../../src/shared/helpers/errors/domain_errors'
describe('Assert GetProfessorsByClassController is correct at all', () => {
  it('should return a list of professors for a valid classId', async () => {
    const repo = new ScheduleRepositoryMock();
    const usecase = new GetProfessorsByClassUsecase(repo);
    const controller = new GetProfessorsByClassController(usecase);

    const request = new HttpRequest(undefined, undefined, {
      classId: '0a8c5357-1f07-5b24-9845-9318c47ab923', 
    });

    const response = await controller.execute(request);

    expect(response.statusCode).toEqual(200);
    expect(response.data).toEqual({ "data": {
      "4": {
        "RA": "44.00000-4",
        "email": "user4@gmail.com",
        "name": "user4",
      }, },
        "message": "professors by class returned",
    });
  });
  it('should return a empty list', async () => {
    const repo = new ScheduleRepositoryMock();
    const usecase = new GetProfessorsByClassUsecase(repo);
    const controller = new GetProfessorsByClassController(usecase);

    const request = new HttpRequest(undefined, undefined, {
      classId:  '0a8c5357-1f07-5b24-9845-9318c47ab9aa',
    });

    const response = await controller.execute(request);

    expect(response.statusCode).toEqual(200);
    expect(response.data).toEqual({ "data": { },
        "message": "professors by class returned",
    });
  });
  it('should return a 400 error for an invalid classId', async () => {
    const repo = new ScheduleRepositoryMock();
    const usecase = new GetProfessorsByClassUsecase(repo);
    const controller = new GetProfessorsByClassController(usecase);

    const request = new HttpRequest(undefined, undefined, {
      classId: '0a8c5357-1f07-5b24-9845-9318c47abaa', 
    });

    const response = await controller.execute(request);


    expect(response.data.body).toBe("Field classId is not valid");
    expect(response.statusCode).toEqual(400);
  });

  it('should return a 400 error if classId is missing', async () => {
    const repo = new ScheduleRepositoryMock();
    const usecase = new GetProfessorsByClassUsecase(repo);
    const controller = new GetProfessorsByClassController(usecase);

    const request = new HttpRequest(undefined, undefined, {
      classId: undefined, 
    });

    const response = await controller.execute(request);

    expect(response.statusCode).toEqual(400);
    expect(response.data.body).toBe('Field classId is missing');
  });

  it('should return a 400 error if classId is not a string', async () => {
    const request = new HttpRequest(undefined, undefined, {
      classId: 2, 
    });
    const repo = new ScheduleRepositoryMock();
    const usecase = new GetProfessorsByClassUsecase(repo);
    const controller = new GetProfessorsByClassController(usecase);

    const response = await controller.execute(request);

  
    expect(response.statusCode).toEqual(400);
    expect(response.data.body).toBe("Field classId is not valid");

  });
  it('should return a 400 error if classId is not a valid UUID', async () => {

    const request = new HttpRequest(undefined, undefined, {
      classId: '11111111-1111-1111-1111-111111111@@1', 
    });
    const repo = new ScheduleRepositoryMock();
    const usecase = new GetProfessorsByClassUsecase(repo);
    const controller = new GetProfessorsByClassController(usecase);

    const response = await controller.execute(request);

    expect(response.statusCode).toEqual(400);
    expect(response.data.body).toBe('Field classId is not valid');
  });
});
