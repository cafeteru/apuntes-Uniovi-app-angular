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
  private URL = `${environment.urlAPI}/users`;

  constructor(
    private logger: NGXLogger,
    private http: HttpClient
  ) {
    this.logger.debug(UserService.name, 'constructor()', 'start');
    this.logger.debug(UserService.name, 'constructor()', 'end');
  }

  /**
   * Returns all user
   *
   * @param options Options
   * @param user User
   */
  findAll(options?: OptionsPage, user?: User): Observable<Page<User>> {
    this.logger.debug(UserService.name, `findAll()`, 'start');
    return this.http.post<Page<User>>(`${this.URL}${options.toApi()}`, user, this.getHttpOptions()).pipe(
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
    return this.http.get<User>(`${this.URL}/${id}`, this.getHttpOptions()).pipe(
      tap(() => this.logger.debug(UserService.name, `findById(id: ${id})`, 'end'))
    );
  }

  /**
   * Save a user
   *
   * @param user User to save
   */
  save(user: User): Observable<User> {
    this.logger.debug(UserService.name, `save(user: ${user})`, 'start');
    return this.http.post<User>(`${this.URL}/create`, user, this.getHttpOptions()).pipe(
      tap(() => this.logger.debug(UserService.name, `save(user: ${user})`, 'end'))
    );
  }

  /**
   * Change the selected language of a user
   *
   * @param lang Selected language
   */
  changeLanguage(lang: string): Observable<boolean> {
    this.logger.debug(UserService.name, `changeLanguage(lang: ${lang})`, 'start');
    return this.http.head(`${this.URL}/lang/${lang}`, {
      observe: 'response',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.Authorization,
      })
    }).pipe(
      map(x => x.status === 200),
      tap(() => this.logger.debug(UserService.name, `changeLanguage(lang: ${lang})`, 'end'))
    );
  }

  private getHttpOptions(): {} {
    return {
      responseType: 'json',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.Authorization,
      })
    };
  }
}
