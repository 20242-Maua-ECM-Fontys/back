import { describe, it, expect, beforeEach } from 'vitest'
import { GetProfessorsByClassPresenter } from '../../../../src/modules/get_professors_by_class/app/get_professors_by_class_presenter'
import { HttpRequest } from '../../../../src/shared/helpers/external_interfaces/http_models'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'

describe('Tests for GetProfessorsByClassPresenter', () => {
  let repo: ScheduleRepositoryMock

  beforeEach(() => {
    repo = new ScheduleRepositoryMock()
  })

  it('Should return 200 and list of professors for a valid classId', async () => {
    const event = new HttpRequest(
      { classId: '0a8c5357-1f07-5b24-9845-9318c47ab923' },
      undefined,
      {},
      undefined,
    )

    const response = await GetProfessorsByClassPresenter(event, repo)

    expect(response?.statusCode).toEqual(200)
    expect(response?.data).toEqual({
      data: {
        '4': {
          RA: '44.00000-4',
          email: 'user4@gmail.com',
          name: 'user4',
        },
        '7': {
          RA: '66.00000-6',
          email: 'viraw@mon.cm',
          name: 'Austin Green',
        },
      },
      message: 'professors by class returned',
    })
  })

  it('Should return 400 BadRequest when classId is missing', async () => {
    const event = new HttpRequest({}, undefined, {}, undefined)

    const response = await GetProfessorsByClassPresenter(event, repo)

    expect(response?.statusCode).toEqual(400)
    expect(response?.data).toEqual({
      body: 'Field classId is missing',
    })
  })

  it('Should return 404 NotFound when classId does not exist', async () => {
    const event = new HttpRequest(
      { classId: 'invalidClassId' },
      undefined,
      {},
      undefined,
    )

    const response = await GetProfessorsByClassPresenter(event, repo)

    expect(response?.statusCode).toEqual(400)
    expect(response?.data).toEqual({
      body: 'Field classId is not valid',
    })
  })
})
