import { describe, it, expect } from 'vitest'
import { UserRepositoryMock } from '../../../../src/shared/infra/repositories/user_repository_mock'
import { UpdateUserUsecase } from '../../../../src/modules/update_user/app/update_user_usecase'
import { UpdateUserController } from '../../../../src/modules/update_user/app/update_user_controller'
import { HttpRequest } from '../../../../src/shared/helpers/external_interfaces/http_models'

describe('Assert Update User controller is correct at all', () => {
  it('Should activate controller correctly', async () => {
    const repo = new UserRepositoryMock()
    const usecase = new UpdateUserUsecase(repo)
    const controller = new UpdateUserController(usecase)

    const request = new HttpRequest(undefined, undefined, { id: '1', name: 'usuario1', email: 'usuario1@gmail.com' })

    const response = await controller.handle(request)

    expect(response?.statusCode).toEqual(200)
    expect(response?.body['id']).toEqual(1)
    expect(response?.body['name']).toEqual('usuario1')
    expect(response?.body['email']).toEqual('usuario1@gmail.com')
    expect(response?.body['state']).toEqual('PENDING')
  })
  it('Should throw 400 statusCode when not pass id', async () => {
    const repo = new UserRepositoryMock()
    const usecase = new UpdateUserUsecase(repo)
    const controller = new UpdateUserController(usecase)

    const request = new HttpRequest(undefined, undefined, { name: 'usuario1', email: 'usuario1@gmail.com' })

    const response = await controller.handle(request)

    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toBe('Field id is missing')
  })
  it('Should throw 400 statusCode when not pass name', async () => {
    const repo = new UserRepositoryMock()
    const usecase = new UpdateUserUsecase(repo)
    const controller = new UpdateUserController(usecase)

    const request = new HttpRequest(undefined, undefined, { id: '1', email: 'usuario1@gmail.com' })

    const response = await controller.handle(request)

    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toBe('Field name is missing')
  })
  it('Should throw 400 statusCode when not pass email', async () => {
    const repo = new UserRepositoryMock()
    const usecase = new UpdateUserUsecase(repo)
    const controller = new UpdateUserController(usecase)

    const request = new HttpRequest(undefined, undefined, { id: '1', name: 'usuario1' })

    const response = await controller.handle(request)

    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toBe('Field email is missing')
  })
  it('Should throw 404 statusCode when not found user', async () => {
    const repo = new UserRepositoryMock()
    const usecase = new UpdateUserUsecase(repo)
    const controller = new UpdateUserController(usecase)

    const request = new HttpRequest(undefined, undefined, { id: '100', name: 'usuario1', email: 'usuário1@gmail.com' })

    const response = await controller.handle(request)

    expect(response?.statusCode).toEqual(404)
    expect(response?.body).toBe('No items found for id')
  })
})
