/**
 * Represents user
 */
import { RoleType } from './types/role-type';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

const ROLE_TYPE_ADMIN = marker('role-type.admin');
const ROLE_TYPE_TEACHER = marker('role-type.teacher');
const ROLE_TYPE_STUDENT = marker('role-type.student');

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

  /**
   * Create string from user data
   */
  toString(): string {
    const user = {...this};
    delete user.password;
    return JSON.stringify(user);
  }

  getRoleName(): string {
    switch (this.role) {
      case RoleType.ADMIN:
        return ROLE_TYPE_ADMIN;
      case RoleType.STUDENT:
        return ROLE_TYPE_STUDENT;
      case RoleType.TEACHER:
        return ROLE_TYPE_TEACHER;
      default:
        return '';
    }
  }
}
