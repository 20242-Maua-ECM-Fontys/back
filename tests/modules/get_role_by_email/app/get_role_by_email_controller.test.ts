import { describe, it, expect } from 'vitest'
import { GetRoleByEmailController } from '../../../../src/modules/get_role_by_email/app/get_role_by_email_controller'
import { GetRoleByEmailUsecase } from '../../../../src/modules/get_role_by_email/app/get_role_by_email_usecase'
import { HttpRequest } from '../../../../src/shared/helpers/external_interfaces/http_models'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'

describe('Assert GetRoleByEmailController is correct at all', () => {
  it('Should get role by email correctly', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetRoleByEmailUsecase(repo)

    const email = '21.00784-5@maua.br'
    const expectedRole = 'PROFESSOR'

    const controller = new GetRoleByEmailController(usecase)
    const httpRequest = new HttpRequest(
      {
        email
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(200)
    expect(response?.data.role).toEqual(expectedRole)
  })

  it('Should return BadRequest: missing email', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetRoleByEmailUsecase(repo)

    const email = undefined

    const controller = new GetRoleByEmailController(usecase)
    const httpRequest = new HttpRequest(
      {
        email
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(400)
    expect(response?.data.body).toEqual('Field email is missing')
  })

  it('Should return BadRequest: invalid email format', async () => {
    const repo =  new ScheduleRepositoryMock()
    const usecase = new GetRoleByEmailUsecase(repo)

    const email = 'invalid-email'

    const controller = new GetRoleByEmailController(usecase)
    const httpRequest = new HttpRequest(
      {
        email
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.statusCode).toEqual(400)
    expect(response?.data.body).toEqual('Invalid email format')
  })

  it('Should return NotFound: email does not exist', async () => {
    const repo =  new ScheduleRepositoryMock()
    const usecase = new GetRoleByEmailUsecase(repo)

    const email = 'nonexistent@example.com'

    const controller = new GetRoleByEmailController(usecase)
    const httpRequest = new HttpRequest(
      {
        email
      },
      undefined,
      {},
      undefined,
    )

    const response = await controller.execute(httpRequest)
    expect(response?.data.body).toEqual("No items found for email")
    expect(response?.statusCode).toEqual(404)
   
  })
  
 
})
