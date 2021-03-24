import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import jwt_decode from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import * as userActions from '../../store/actions/user.actions';

/**
 * Response to the login request
 */
export interface ResponseLogin {
  authorization: string;
}

/**
 * Parts of the token from the server
 */
export interface IToken {
  username: string;
  role: string;
  id: number;
  exp: number;
}

/**
 * Information required to log into the server
 */
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
  private url = `${environment.urlApi}/login`;

  constructor(
    private logger: NGXLogger,
    private http: HttpClient,
    private store: Store<AppState>
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
    return this.http.post<ResponseLogin>(this.url, loginData).pipe(
      map((res) => {
        const iToken = jwt_decode<IToken>(res.authorization);
        localStorage.setItem('authorization', res.authorization);
        localStorage.setItem('exp', iToken.exp.toString());
        this.store.dispatch(userActions.loadUser({id: iToken.id}));
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
    this.store.dispatch(userActions.logout());
    this.logger.debug(LoginService.name, `logout()`, 'end');
  }
}
