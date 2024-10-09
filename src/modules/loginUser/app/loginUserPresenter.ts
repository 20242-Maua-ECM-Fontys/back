import { Environments } from '../../../shared/environments';
import { LambdaHttpRequest, LambdaHttpResponse } from '../../../shared/helpers/external_interfaces/http_lambda_requests';
import { LoginUserController } from './loginUserController';
import { LoginUserUsecase } from './loginUserUsecase';
import { UserProps } from "../../../shared/domain/entities/user";

const repo = Environments.getUserRepo();
const usecase = new LoginUserUsecase(repo);

export async function loginUserPresenter(event: Record<string, any>) {
    const httpRequest = new LambdaHttpRequest(event);

    const { email, password } = httpRequest.body;

//    const userProps: Partial<UserProps> = { email, password }; // Partial to ignore empty ID and such


    const controller = new LoginUserController(usecase, email, password);

    const response = await controller.login();

    // Initialize variables for HTTP status and body
    let statusCode: number;
    let responseBody: any;

    if (response && response.message === 'the login was successful') {
        // Success: LoginUserViewmodel returns a success message
        statusCode = 200;
        responseBody = response;
    } else if (response && response.message === "Invalid credentials") {
        statusCode = 401;
        responseBody = { message: "Invalid credentials" };
    } else {
        statusCode = 500;
        responseBody = { message: "Login failed" };
    }

    // Create the Lambda HTTP Response object (with body, status code, and headers)
    const httpResponse = new LambdaHttpResponse(responseBody, statusCode, { 'Content-Type': 'application/json' });

    return httpResponse.toJSON();
}

// Lambda handler function
export async function handler(event: any, context: any) {
    const response = await loginUserPresenter(event);
    return response;
}
