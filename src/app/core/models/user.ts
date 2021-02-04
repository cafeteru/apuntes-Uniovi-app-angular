import { RoleType } from './enums/role-type';
import { Address } from './address';

/**
 * Represents users
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
  address: Address;
  language: string;

  constructor() {
    this.active = true;
    this.address = new Address();
    this.language = 'es';
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
