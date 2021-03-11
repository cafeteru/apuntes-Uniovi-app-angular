import { RoleType } from './enums/role-type';
import { Address } from './address';
import { LanguageType } from './enums/language-type';
import { IdentificationType } from './enums/identification-type';

/**
 * Represents users
 */
export class User {

  constructor(
    public id: number = undefined,
    public name: string = undefined,
    public surname: string = undefined,
    public email: string = undefined,
    public phone: string = undefined,
    public active = true,
    public img: string = undefined,
    public birthDate: Date = undefined,
    public username: string = undefined,
    public password: string = undefined,
    public role: RoleType = undefined,
    public identificationType: string = undefined,
    public numberIdentification: IdentificationType = undefined,
    public address = new Address(),
    public language = LanguageType.ES
  ) {
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
