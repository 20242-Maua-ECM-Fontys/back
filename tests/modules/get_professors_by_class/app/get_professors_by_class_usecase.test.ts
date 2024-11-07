import { describe, it, expect, beforeEach } from 'vitest';
import { GetProfessorsByClassUsecase } from '../../../../src/modules/get_professors_by_class/app/get_professors_by_class_usecase';
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock';
import { NoItemsFound } from '../../../../src/shared/helpers/errors/repo_error';

describe('GetProfessorsByClassUsecase', () => {
  let usecase: GetProfessorsByClassUsecase;
  let scheduleRepository: ScheduleRepositoryMock;

  beforeEach(() => {
    scheduleRepository = new ScheduleRepositoryMock();
    usecase = new GetProfessorsByClassUsecase(scheduleRepository);
  });

  it('should return a list of professors with availabilities for a valid classId', async () => {
    const classId = '0a8c5357-1f07-5b24-9845-9318c47ab923';
    const result = await usecase.execute(classId);

    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThan(0);

    result.forEach(professor => {
      expect(professor).toHaveProperty('name');
      expect(professor).toHaveProperty('email');
      expect(professor).toHaveProperty('RA');

      expect(professor).toHaveProperty('availabilities');
      expect(professor.availabilities).toBeInstanceOf(Array);

      professor.availabilities.forEach(availability => {
        expect(availability).toHaveProperty('availabilityId');
        expect(availability).toHaveProperty('weekDay');
        expect(availability).toHaveProperty('startTime');
        expect(availability).toHaveProperty('endTime');
        expect(availability).toHaveProperty('isTaken');
      });
    });
  });

  it('should return an empty array if no professors are suitable for the class', async () => {
    const classId = '0a8c5357-1f07-5b24-9845-9318c47ab9aa';
    const result = await usecase.execute(classId);
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(0);
  });

  it('should throw a NoItemsFound error if classId is invalid', async () => {
    const invalidClassId = 'invalid-class-id';

    await expect(usecase.execute(invalidClassId)).rejects.toThrow(NoItemsFound);
  });
});
