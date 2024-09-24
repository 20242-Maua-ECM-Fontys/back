import { describe, it, expect } from 'vitest'
import { UserRepositoryMock } from '../../../../src/shared/infra/repositories/user_repository_mock'
import { GetAllUsersUsecase } from '../../../../src/modules/get_all_users/app/get_all_users_usecase'
import { GetAllUsersController } from '../../../../src/modules/get_all_users/app/get_all_users_controller'
import { HttpRequest } from '../../../../src/shared/helpers/external_interfaces/http_models'

describe('Assert Get All Users controller is correct at all', () => {
  it('Should activate controller correctly', async () => {
    const repo = new UserRepositoryMock()
    const usecase = new GetAllUsersUsecase(repo)
    const controller = new GetAllUsersController(usecase)
    const request = new HttpRequest({}, {}, {})

    const response = await controller.handle(request)

    expect(response?.statusCode).toBe(200)
    expect(response?.body['message']).toBe('All users have been retrieved successfully')
  })
})