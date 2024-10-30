
import { User } from '../../../shared/domain/entities/user';


export class GetProfessorsByClassViewModel {
  private professors: { [key: string]: { name: string, email: string, RA: string } } = {};

  constructor(users: User[]) {
    users.forEach(user => {
      this.professors[user.id] = {
        name: user.name,
        email: user.email,
        RA: user.RA,
      };
    });
  }

  toJSON() {
    return this.professors;
  }
}
