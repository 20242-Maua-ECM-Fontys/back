import { GetRoleByEmailUsecaseResponse } from "./get_role_by_email_usecase";

export class GetRoleByEmailViewModel {
  private userData: GetRoleByEmailUsecaseResponse;
  private message: string;

  constructor(userData: GetRoleByEmailUsecaseResponse) {
    this.message = "role and userId by email returned"
    this.userData = userData;
  }

  toJSON() {
    return {
      userId: this.userData.userId,
      role: this.userData.role,
      message: this.message
    };
  }
}
