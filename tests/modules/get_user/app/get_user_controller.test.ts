import { it, expect, describe,  } from 'vitest'
import { UserRepositoryMock } from '../../../../src/shared/infra/repositories/user_repository_mock'
import { GetUserUsecase } from '../../../../src/modules/get_user/app/get_user_usecase'
import { GetUserController } from '../../../../src/modules/get_user/app/get_user_controller'
import { HttpRequest } from '../../../../src/shared/helpers/external_interfaces/http_models'

describe('Assert Get User controller is correct at all', () => {
  it('Assert Get User controller is correct when creating', async () => {
    const repo = new UserRepositoryMock()
    const usecase = new GetUserUsecase(repo)
    const controller = new GetUserController(usecase)

    const request = new HttpRequest(undefined, undefined, { id: '1' })

    const response = await controller.handle(request)

    expect(response?.statusCode).toEqual(200)
    expect(response?.body['id']).toEqual(1)
    expect(response?.body['name']).toEqual('user1')
    expect(response?.body['email']).toEqual('user1@gmail.com')
    expect(response?.body['state']).toEqual('PENDING')
    expect(response?.body['message']).toEqual('The user was retrieved successfully')

  })
  it('Assert Get User controller is not correct when not pass id', async () => {
    const repo = new UserRepositoryMock()
    const usecase = new GetUserUsecase(repo)
    const controller = new GetUserController(usecase)

    const request = new HttpRequest(undefined, undefined, { id: undefined })

    const response = await controller.handle(request)

    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toBe('Field id is missing')
  })
  it('Assert Get User controller is not correct when pass id with wrong type', async () => {
    const repo = new UserRepositoryMock()
    const usecase = new GetUserUsecase(repo)
    const controller = new GetUserController(usecase)

    const request = new HttpRequest(undefined, undefined, { id: 10 })

    const response = await controller.handle(request)

    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toBe('Field id isn\'t in the right type.\n Received: number.\n Expected: string.')
  })
  it('Assert Get User controller is not correct when pass a not found id value', async () => {
    const repo = new UserRepositoryMock()
    const usecase = new GetUserUsecase(repo)
    const controller = new GetUserController(usecase)

    const request = new HttpRequest(undefined, undefined, { id: '999' })

    const response = await controller.handle(request)

    expect(response?.statusCode).toEqual(404)
    expect(response?.body).toBe('No items found for id')
  })
})