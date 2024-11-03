import { User } from '../../../shared/domain/entities/user';

interface ProfessorInfo {
  name: string;
  email: string;
  RA: string;
}

export class GetProfessorsByClassViewmodel {
  private professors: { [key: string]: ProfessorInfo } = {};

  constructor(users: User[]) {
    users.forEach(user => {
      this.professors[user.id] = {
        name: user.name,
        email: user.email,
        RA: user.RA,
      };
    });
  }

  toJSON(): { message: string, data: { [key: string]: ProfessorInfo } } {
    return {
      message: "professors by class returned",
      data: this.professors,
    };
  }
}
