import { GetProfessorsByClassViewmodel } from '../../../../src/modules/get_professors_by_class/app/get_professors_by_class_viewmodel';
import { it, expect, describe } from 'vitest';
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock';
import { GetProfessorsByClassUsecase } from '../../../../src/modules/get_professors_by_class/app/get_professors_by_class_usecase';
import { WEEK_DAY } from '../../../../src/shared/domain/enums/week_day_enum';
import { MAUA_START_TIME } from '../../../../src/shared/domain/enums/maua_start_time_enum';
import { MAUA_END_TIME } from '../../../../src/shared/domain/enums/maua_end_time_enum';



describe('GetProfessorsByClassViewmodel', () => {
  it('should correctly transform professors data to JSON format', async () => {
    const repo = new ScheduleRepositoryMock();
    const usecase = new GetProfessorsByClassUsecase(repo);

    const professors= await usecase.execute('0a8c5357-1f07-5b24-9845-9318c47ab923');
  
    const viewModel = new GetProfessorsByClassViewmodel(professors);
    const result = viewModel.toJSON();

    expect(result).toEqual({
      message: "professors by class returned",
      "professors": {
        "4":  {
          
          name: "user4",
          email: "user4@gmail.com",
          RA: "44.00000-4",
        availabilities: {
          "0a8c5357-1f07-5b24-9845-9318c400000a": { endTime: 560, isTaken: true, startTime: 460, weekDay: "MON" },
        "0a8c5357-1f07-5b24-9845-9318c400000b":  { endTime: 670, isTaken: false, startTime: 570, weekDay: "MON" },
        "0a8c5357-1f07-5b24-9845-9318c400000c":   { endTime: 780, isTaken: false, startTime: 680, weekDay: "MON" },
        "0a8c5357-1f07-5b24-9845-9318c400000d":  { endTime: 890, isTaken: false, startTime: 790, weekDay: "MON" },
        "0a8c5357-1f07-5b24-9845-9318c400000e":   { endTime: 1000, isTaken: false, startTime: 900, weekDay: "MON" },
        "0a8c5357-1f07-5b24-9845-9318c400000f":  { endTime: 1110, isTaken: false, startTime: 1010, weekDay: "MON" },
        "0a8c5357-1f07-5b24-9845-9318c4000010":    { endTime: 1240, isTaken: false, startTime: 1140, weekDay: "MON" },
        "0a8c5357-1f07-5b24-9845-9318c4000011":    { endTime: 1350, isTaken: false, startTime: 1250, weekDay: "MON" },
        }
        }
      }
    });
  });

  it('should return an empty data object if no professors are provided', () => {
    const formattedProfessors: { id: string; name: string; email: string; RA: string; availabilities: [] }[] = [];

    const viewModel = new GetProfessorsByClassViewmodel(formattedProfessors);
    const result = viewModel.toJSON();

    expect(result).toEqual({
      message: "professors by class returned",
      professors:  {}
    });
  });
});
