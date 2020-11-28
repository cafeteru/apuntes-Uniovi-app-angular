export class User {
  username: string;
  password: string;

  constructor() {
    this.username = '';
    this.password = '';
  }

  toString(): string {
    const user = {...this};
    delete user.password;
    return JSON.stringify(user);
  }
}
