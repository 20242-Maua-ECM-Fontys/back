import { UserProps } from "../../../shared/domain/entities/user";
import { LoginUserUsecase } from "./loginUserUsecase";
import { LoginUserViewmodel } from "./loginUserViewmodel";

export class LoginUserController {

    private email: string;
    private password: string;
    private user: UserProps | null = null;


    constructor(private loginusecase: LoginUserUsecase, email: string, password: string) {
        this.email = email
        this.password = password
    }

    public async login() {
        try {
            this.user = await this.loginusecase.execute(this.email, this.password);

            if (this.user) {
                const loginviewmodel = new LoginUserViewmodel(this.user);
                return loginviewmodel.toJSON();
            } else {
                return { message: "Invalid credentials" };
            }
        } catch (error) {
            
            return { message: "Login failed" };
        }
    }
}
