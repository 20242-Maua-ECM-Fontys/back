// get_professors_by_class_viewmodel.test.ts
import { GetProfessorsByClassViewModel } from '../../../../src/modules/get_professors_by_class/app/get_professors_by_class_viewmodel';
import { User } from '../../../../src/shared/domain/entities/user';
import { ROLE } from '../../../../src/shared/domain/enums/role_enum';
import { it, expect, describe } from 'vitest'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'
import { GetProfessorsByClassUsecase } from '../../../../src/modules/get_professors_by_class/app/get_professors_by_class_usecase';
describe('GetProfessorsByClassViewModel', () => {
  it('should correctly transform professors data to JSON format', async () => {
   

    const repo = new ScheduleRepositoryMock()
    const usecase = new GetProfessorsByClassUsecase(repo)
    
    const professors = await usecase.execute('0a8c5357-1f07-5b24-9845-9318c47ab923')
    
    const viewModel = new GetProfessorsByClassViewModel(professors);
    const result = viewModel.toJSON();


    expect(result).toEqual({
      
      "4":  {
        "RA": "44.00000-4",
        "email": "user4@gmail.com",
        "name": "user4",
    }});
  });

  it('should return an empty array if no professors are provided', () => {
    // Empty input data
    const professors: User[] = [];

    // Execute ViewModel transformation
    const viewModel = new GetProfessorsByClassViewModel(professors);
    const result = viewModel.toJSON();

    // Expect result to be an empty array
    expect(result).toEqual({});
  });
});
