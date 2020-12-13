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
  role: string;
  identificationType: string;
  numberIdentification: string;

  toString(): string {
    const user = {...this};
    delete user.password;
    return JSON.stringify(user);
  }
}
