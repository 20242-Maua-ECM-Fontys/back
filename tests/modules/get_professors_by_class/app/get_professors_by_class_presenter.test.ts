import { describe, it, expect, beforeEach } from 'vitest';
import { GetProfessorsByClassPresenter } from '../../../../src/modules/get_professors_by_class/app/get_professors_by_class_presenter';
import { HttpRequest } from '../../../../src/shared/helpers/external_interfaces/http_models';
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock';

describe('Tests for GetProfessorsByClassPresenter', () => {
  let repo: ScheduleRepositoryMock;

  beforeEach(() => {
    repo = new ScheduleRepositoryMock();
  });

  it('Should return 200 and list of professors for a valid classId', async () => {
    const event = new HttpRequest(
      { classId: '0a8c5357-1f07-5b24-9845-9318c47ab923' },
      undefined,
      {},
      undefined
    );

    const response = await GetProfessorsByClassPresenter(event, repo);

    expect(response?.statusCode).toEqual(200);
    expect(response?.data).toEqual({
      message: "professors by class returned",
      professors: {
        "3":{
      "RA": "33.00000-3",
      "availabilities":{
        "0a8c5357-1f07-5b24-9845-9318c4000000":{
          "endTime": 560,
          "isTaken": false,
          "startTime": 460,
          "weekDay": "MON",
        },
        "0a8c5357-1f07-5b24-9845-9318c4000001":{
          "endTime": 670,
          "isTaken": false,
          "startTime": 570,
          "weekDay": "MON",
        },
        "0a8c5357-1f07-5b24-9845-9318c4000002":{
          "endTime": 560,
          "isTaken": false,
          "startTime": 460,
          "weekDay": "TUE",
        },
        "0a8c5357-1f07-5b24-9845-9318c4000003":{
          "endTime": 670,
          "isTaken": false,
          "startTime": 570,
          "weekDay": "TUE",
        },
        "0a8c5357-1f07-5b24-9845-9318c4000004":{
          "endTime": 560,
          "isTaken": false,
          "startTime": 460,
          "weekDay": "WED",
        },
        "0a8c5357-1f07-5b24-9845-9318c4000005":{
          "endTime": 670,
          "isTaken": false,
          "startTime": 570,
          "weekDay": "WED",
        },
        "0a8c5357-1f07-5b24-9845-9318c4000006":{
          "endTime": 560,
          "isTaken": false,
          "startTime": 460,
          "weekDay": "THU",
        },
        "0a8c5357-1f07-5b24-9845-9318c4000007":{
          "endTime": 670,
          "isTaken": false,
          "startTime": 570,
          "weekDay": "THU",
        },
        "0a8c5357-1f07-5b24-9845-9318c4000008":{
          "endTime": 560,
          "isTaken": false,
          "startTime": 460,
          "weekDay": "FRI",
        },
        "0a8c5357-1f07-5b24-9845-9318c4000009":{
          "endTime": 670,
          "isTaken": true,
          "startTime": 570,
          "weekDay": "FRI",
        },
      },
      "email": "user3@gmail.com",
      "name": "user3",
    },
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

  it('Should return 400 BadRequest when classId is missing', async () => {
    const event = new HttpRequest(
      {},
      undefined,
      {},
      undefined
    );

    const response = await GetProfessorsByClassPresenter(event, repo);

    expect(response?.statusCode).toEqual(400);
    expect(response?.data).toEqual({
      "body": "Field classId is missing",
    });
  });

  it('Should return 404 NotFound when classId does not exist', async () => {
    const event = new HttpRequest(
      { classId: 'invalidClassId' },
      undefined,
      {},
      undefined
    );

    const response = await GetProfessorsByClassPresenter(event, repo);

    expect(response?.statusCode).toEqual(400);
    expect(response?.data).toEqual({
      "body":  "Field classId is not valid",
    });
  });

 
});