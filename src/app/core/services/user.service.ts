import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { NGXLogger } from 'ngx-logger';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Page } from '../models/server/page';
import { OptionsPage } from '../models/server/options-page';

@Injectable({
  providedIn: 'root'
})

/**
 * Service to manage user
 */
export class UserService {
  private url = `${environment.urlApi}/users`;

  constructor(
    private logger: NGXLogger,
    private http: HttpClient
  ) {
    this.logger.debug(UserService.name, 'constructor()', 'start');
    this.logger.debug(UserService.name, 'constructor()', 'end');
  }

  private static getHttpOptions(responseType: string = 'json'): unknown {
    return {
      responseType,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: localStorage.authorization,
      })
    };
  }


  /**
   * Returns all user
   *
   * @param options Options
   * @param user User
   */
  findAll(options: OptionsPage, user?: User): Observable<Page<User>> {
    this.logger.debug(UserService.name, `findAll()`, 'start');
    return this.http.post<Page<User>>(`${this.url}${options.toApi()}`, user, UserService.getHttpOptions()).pipe(
      tap(() => this.logger.debug(UserService.name, `findAll()`, 'end'))
    );
  }

  /**
   * Returns a user by id
   *
   * @param id User´s id
   */
  findById(id: number): Observable<User> {
    this.logger.debug(UserService.name, `findById(id: ${id})`, 'start');
    return this.http.get<User>(`${this.url}/${id}`, UserService.getHttpOptions()).pipe(
      tap(() => this.logger.debug(UserService.name, `findById(id: ${id})`, 'end')),
    );
  }

  /**
   * Create a user
   *
   * @param user User to create
   */
  create(user: User): Observable<User> {
    this.logger.debug(UserService.name, `save(user: ${user})`, 'start');
    return this.http.post<User>(`${this.url}/create`, user, UserService.getHttpOptions()).pipe(
      tap(() => this.logger.debug(UserService.name, `save(user: ${user})`, 'end'))
    );
  }

  /**
   * Update a user
   *
   * @param user User to create
   */
  update(user: User): Observable<User> {
    this.logger.debug(UserService.name, `update(user: ${user})`, 'start');
    return this.http.put<User>(`${this.url}/update/${user.id}`, user, UserService.getHttpOptions()).pipe(
      tap(() => this.logger.debug(UserService.name, `update(user: ${user})`, 'end'))
    );
  }

  /**
   * Change the selected language of a user
   *
   * @param lang Selected language
   */
  changeLanguage(lang: string): Observable<boolean> {
    this.logger.debug(UserService.name, `changeLanguage(lang: ${lang})`, 'start');
    return this.http.head(`${this.url}/lang/${lang}`, {
      observe: 'response',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: localStorage.authorization,
      })
    }).pipe(
      map((x) => x.status === 200),
      tap(() => this.logger.debug(UserService.name, `changeLanguage(lang: ${lang})`, 'end'))
    );
  }
}
