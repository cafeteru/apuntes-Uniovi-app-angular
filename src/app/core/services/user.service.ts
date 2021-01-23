import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { NGXLogger } from 'ngx-logger';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root'
})
/**
 * Service to manage user
 */
export class UserService {
  private URL = `${environment.urlAPI}/users`;
  private httpOptions: {} = {
    responseType: 'json',
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: localStorage.Authorization,
    })
  };

  constructor(
    private logger: NGXLogger,
    private http: HttpClient
  ) {
    this.logger.debug(UserService.name, 'constructor()', 'start');
    this.logger.debug(UserService.name, 'constructor()', 'end');
  }

  /**
   * Returns all user
   */
  findAll(): Observable<User[]> {
    this.logger.debug(UserService.name, `findAll()`, 'start');
    return this.http.get<Page<User>>(this.URL, this.httpOptions).pipe(
      map((x) => x.content),
      tap(() => this.logger.debug(UserService.name, `findAll()`, 'start'))
    );
  }

  save(user: User): Observable<User> {
    return this.http.post<User>(`${this.URL}/create`, user, this.httpOptions);
  }
}
