import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
    private httpClient: HttpClient,
    private store: Store<AppState>
  ) {
  }

  /**
   * Gets user authentication
   *
   * @param loginData User with username and password
   */
  login(loginData: LoginData): Observable<void> {
    return this.httpClient.post<ResponseLogin>(this.url, loginData).pipe(
      map((res) => {
        const iToken = jwt_decode<IToken>(res.authorization);
        localStorage.setItem('authorization', res.authorization);
        localStorage.setItem('exp', iToken.exp.toString());
        this.store.dispatch(userActions.loadUser({id: iToken.id}));
      })
    );
  }

  /**
   * Delete logged user data
   */
  logout(): void {
    localStorage.clear();
    this.store.dispatch(userActions.logout());
  }
}
