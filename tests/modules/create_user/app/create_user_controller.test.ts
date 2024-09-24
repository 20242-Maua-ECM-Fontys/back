import { describe, it, expect } from 'vitest'
import { UserRepositoryMock } from '../../../../src/shared/infra/repositories/user_repository_mock'
import { HttpRequest } from '../../../../src/shared/helpers/external_interfaces/http_models'
import { CreateUserUsecase } from '../../../../src/modules/create_user/app/create_user_usecase'
import { CreateUserController } from '../../../../src/modules/create_user/app/create_user_controller'

describe('Assert Create User controller is correct at all', () => {
  it('Should activate controller correctly', async () => {
    const repo = new UserRepositoryMock()
    const usecase = new CreateUserUsecase(repo)
    const controller = new CreateUserController(usecase)

    const request = new HttpRequest(undefined, undefined, { id: '5', name: 'usuario1', email: 'usuario1@gmail.com' })

    const response = await controller.handle(request)

    expect(response?.statusCode).toEqual(201)
    expect(response?.body['id']).toEqual(5)
    expect(response?.body['name']).toEqual('usuario1')
    expect(response?.body['email']).toEqual('usuario1@gmail.com')
    expect(response?.body['state']).toEqual('PENDING')
  })
  it('Should throw 400 statusCode when not pass id', async () => {
    const repo = new UserRepositoryMock()
    const usecase = new CreateUserUsecase(repo)
    const controller = new CreateUserController(usecase)

    const request = new HttpRequest(undefined, undefined, { name: 'usuario1', email: 'usuario1@gmail.com' })

    const response = await controller.handle(request)

    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toBe('Field id is missing')
  })
  it('Should throw 400 statusCode when pass id incorrect type', async () => {
    const repo = new UserRepositoryMock()
    const usecase = new CreateUserUsecase(repo)
    const controller = new CreateUserController(usecase)

    const request = new HttpRequest(undefined, undefined, { id: 999, name: 'usuario1', email: 'usuario1@gmail.com' })

    const response = await controller.handle(request)

    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toBe('Field id isn\'t in the right type.\n Received: number.\n Expected: string.')
  })
  it('Should throw 400 statusCode when not pass name', async () => {
    const repo = new UserRepositoryMock()
    const usecase = new CreateUserUsecase(repo)
    const controller = new CreateUserController(usecase)
    
    const request = new HttpRequest(undefined, undefined, { id: 5, email: 'usuario1@gmail.com' })
    
    const response = await controller.handle(request)
    
    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toBe('Field name is missing')
  })
  it('Should throw 400 statusCode when pass name incorrect type', async () => {
    const repo = new UserRepositoryMock()
    const usecase = new CreateUserUsecase(repo)
    const controller = new CreateUserController(usecase)

    const request = new HttpRequest(undefined, undefined, { id: '5', name: true, email: 'usuario1@gmail.com' })

    const response = await controller.handle(request)

    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toBe('Field name isn\'t in the right type.\n Received: boolean.\n Expected: string.')
  })
  it('Should throw 400 statusCode when not pass email', async () => {
    const repo = new UserRepositoryMock()
    const usecase = new CreateUserUsecase(repo)
    const controller = new CreateUserController(usecase)
    
    const request = new HttpRequest(undefined, undefined, { id: '1', name: 'usuario1' })
    
    const response = await controller.handle(request)
    
    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toBe('Field email is missing')
  })
  it('Should throw 400 statusCode when pass email incorrect type', async () => {
    const repo = new UserRepositoryMock()
    const usecase = new CreateUserUsecase(repo)
    const controller = new CreateUserController(usecase)

    const request = new HttpRequest(undefined, undefined, { id: '5', name: 'usuario1', email: 333 })

    const response = await controller.handle(request)

    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toBe('Field email isn\'t in the right type.\n Received: number.\n Expected: string.')
  })
  it('Should throw 400 statusCode when pass email incorrectly', async () => {
    const repo = new UserRepositoryMock()
    const usecase = new CreateUserUsecase(repo)
    const controller = new CreateUserController(usecase)

    const request = new HttpRequest(undefined, undefined, { id: '5', name: 'usuario1', email: 'digao' })

    const response = await controller.handle(request)

    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toBe('Field email is not valid')
  })
})
