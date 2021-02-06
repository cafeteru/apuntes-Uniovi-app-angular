import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import jwt_decode from 'jwt-decode';

interface ResponseLogin {
  Authorization: string;
}

interface IToken {
  username: string;
  role: string;
  id: number;
  exp: number;
}

export interface LoginData {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
/**
 * Service to identify user
 */
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
   * @param loginData User with username and password
   */
  login(loginData: LoginData): Observable<void> {
    this.logger.debug(LoginService.name, `login(user: ${loginData.toString()})`, 'start');
    return this.http.post<ResponseLogin>(this.URL, loginData).pipe(
      map((res) => {
        const result = jwt_decode<IToken>(res.Authorization);
        localStorage.setItem('Authorization', res.Authorization);
        localStorage.setItem('username', result.username);
        localStorage.setItem('id', result.id.toString());
        localStorage.setItem('role', result.role);
        localStorage.setItem('exp', result.exp.toString());
      }),
      tap(() => this.logger.debug(LoginService.name, `login(user: ${loginData.toString()})`, 'start'))
    );
  }

  /**
   * Delete logged user data
   */
  logout(): void {
    this.logger.debug(LoginService.name, `logout()`, 'start');
    localStorage.clear();
    this.logger.debug(LoginService.name, `logout()`, 'end');
  }
}
