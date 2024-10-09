import { describe, it, expect, vi } from 'vitest';
import { loginUserPresenter } from '../../../../src/modules/login_user/app/login_user_presenter';
import { LoginUserController } from '../../../../src/modules/login_user/app/login_user_controller';
import { HttpRequest, HttpResponse } from  '../../../../src/shared/helpers/external_interfaces/http_models.js';


vi.mock('./login_user_usecase')
vi.mock('./login_user_controller')
vi.mock('../../../../src/shared/environments', () => ({
  Environments: {
    getUserRepo: vi.fn(),
  },
}))

describe('loginUserPresenter', () => {
  it('should return a valid HttpResponse when login is successful', async () => {

    const body = { username: 'user1', password: 'Password1@' }
    const headers = { 'Content-Type': 'application/json' }
    const query_params = {}

    const httpRequest = new HttpRequest(body, headers, query_params)

    const mockResponse = { statusCode: 200, body: { success: true }, headers: {} }
    const mockHandle = vi.fn().mockResolvedValue(mockResponse)


    LoginUserController.prototype.handle = mockHandle


    const response: HttpResponse = await loginUserPresenter(httpRequest)


    expect(mockHandle).toHaveBeenCalledWith(httpRequest) 
    expect(response.statusCode).toBe(200)                
    expect(response.body).toEqual({ success: true })     
    expect(response.headers).toEqual({})                
  })

  it('should return an error HttpResponse when login fails', async () => {

    const body = { username: 'wrong_user', password: 'wrong_password' }
    const headers = { 'Content-Type': 'application/json' }
    const query_params = {}


    const httpRequest = new HttpRequest(body, headers, query_params)

   
    const mockErrorResponse = { statusCode: 401, body: { success: false, message: 'Unauthorized' }, headers: {} }
    const mockHandle = vi.fn().mockResolvedValue(mockErrorResponse)


    LoginUserController.prototype.handle = mockHandle


    const response: HttpResponse = await loginUserPresenter(httpRequest)


    expect(mockHandle).toHaveBeenCalledWith(httpRequest)  
    expect(response.statusCode).toBe(401)     
    expect(response.body).toEqual({ success: false, message: 'Unauthorized' }) 
    expect(response.headers).toEqual({})        
  })
})
