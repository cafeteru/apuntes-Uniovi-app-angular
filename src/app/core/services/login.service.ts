import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NGXLogger} from 'ngx-logger';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {map, tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import jwt_decode from 'jwt-decode';

interface ResponseLogin {
  Authorization: string;
}

interface IToken {
  username: string;
  role: string;
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private URL = `${environment.urlAPI}/login`;

  constructor(
    private logger: NGXLogger,
    private http: HttpClient
  ) {
    this.logger.debug(LoginService.name, 'constructor()', 'start');
    this.logger.debug(LoginService.name, 'constructor()', 'end');
  }

  /**
   * Gets user authentication
   *
   * @param user User with username and password
   */
  login(user: User): Observable<void> {
    this.logger.debug(LoginService.name, `login(user: ${user.toString()})`, 'start');
    localStorage.clear();
    return this.http.post<ResponseLogin>(`${this.URL}`, user).pipe(
      map((res) => {
        const result = jwt_decode<IToken>(res.Authorization);
        localStorage.setItem('Authorization', res.Authorization);
        localStorage.setItem('username', result.username);
        localStorage.setItem('id', result.id.toString());
        localStorage.setItem('role', result.role);
      }),
      tap(() => this.logger.debug(LoginService.name, `login(user: ${user.toString()})`, 'start'))
    );
  }

  logout(): void {
      this.logger.debug(LoginService.name, `logout()`, 'start');
      localStorage.clear();
      this.logger.debug(LoginService.name, `logout()`, 'end');
  }
}
