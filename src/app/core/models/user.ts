import { RoleType } from './types/role-type';

/**
 * Represents user
 */
export class User {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone: string;
  active: boolean;
  img: string;
  birthDate: Date;
  username: string;
  password: string;
  role: RoleType;
  identificationType: string;
  numberIdentification: string;

  constructor() {
    this.active = true;
  }

  /**
   * Create string from user data
   */
  toString(): string {
    const user = {...this};
    delete user.password;
    return JSON.stringify(user);
  }
}
