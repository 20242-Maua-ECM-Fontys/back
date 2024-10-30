import { describe, it, expect,beforeEach } from 'vitest';
import { GetProfessorsByClassUsecase} from '../../../../src/modules/get_professors_by_class/app/get_professors_by_class_usecase';
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock';
import { NoItemsFound } from '../../../../src/shared/helpers/errors/usecase_errors';
describe('GetProfessorsByClassUsecase', () => {
  let usecase: GetProfessorsByClassUsecase;
  let scheduleRepository: ScheduleRepositoryMock;

  beforeEach(() => {
    scheduleRepository = new ScheduleRepositoryMock();
    usecase = new GetProfessorsByClassUsecase(scheduleRepository);
  });

  it('should return a list of professors for a valid classId', async () => {
    const classId = '0a8c5357-1f07-5b24-9845-9318c47ab923'; // Class ID presente no mock
    const result = await usecase.execute(classId);

    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThan(0);
    result.forEach(professor => {
      expect(professor.role).toBe('PROFESSOR');
      expect(professor).toHaveProperty('name');
      expect(professor).toHaveProperty('email');
      expect(professor).toHaveProperty('RA');
    });
  });

  it('should throw NoItemsFound if no professors are suitable for the class', async () => {
    const classId = '0a8c5357-1f07-5b24-9845-9318c47ab9aa'; // Class ID sem professores adequados

    await expect(usecase.execute(classId)).rejects.toThrow(NoItemsFound);
  });

  it('should throw an error if classId is invalid', async () => {
    const invalidClassId = 'invalid-class-id';
  
    await expect(usecase.execute(invalidClassId)).rejects.toThrow('No items found for classId');
  });
  
});
