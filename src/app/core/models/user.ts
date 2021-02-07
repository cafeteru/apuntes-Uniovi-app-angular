import { RoleType } from './enums/role-type';
import { Address } from './address';
import { LanguageType } from './enums/language-type';
import { IdentificationType } from './enums/identification-type';

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
  numberIdentification: IdentificationType;
  address: Address;
  language: LanguageType;

  constructor() {
    this.active = true;
    this.address = new Address();
    this.language = LanguageType.ES;
  }

  /**
   * Create string from user data
   */
  toString(): string {
    const user = {...this};
    delete user.password;
    delete user.img;
    return JSON.stringify(user);
  }
}
