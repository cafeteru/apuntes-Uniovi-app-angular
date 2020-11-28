import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NGXLogger} from 'ngx-logger';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

export interface ResponseLogin {
  Authorization: string;
  username: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly URL = `${environment.urlAPI}/login`;

  constructor(
    private logger: NGXLogger,
    private http: HttpClient
  ) {
    this.logger.debug(LoginService.name, 'constructor()', 'start');
    this.logger.debug(LoginService.name, 'constructor()', 'end');
  }

  login(user: User): Observable<ResponseLogin> {
    this.logger.debug(LoginService.name, `login(user: ${user.toString()})`, 'start');
    return this.http.post<ResponseLogin>(`${this.URL}`, user).pipe(
      tap(() => this.logger.debug(LoginService.name, `login(user: ${user.toString()})`, 'start'))
    );
  }
}
