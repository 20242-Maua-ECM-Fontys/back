export class GetRoleByEmailViewModel {
  private role: string;

  constructor(role: string) {
    this.role = role;
  }

  toJSON() {
    return {
      role: this.role,
    };
  }
}
