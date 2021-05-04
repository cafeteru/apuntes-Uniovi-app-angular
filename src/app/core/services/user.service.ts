import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Page } from '../models/server/page';
import { OptionsPage } from '../models/server/options-page';
import { UserStatistics } from '../models/statistics/user-statistics';
import { RoleType } from '../models/enums/role-type';
import { ServiceUtils } from './service-utils';

@Injectable({
  providedIn: 'root'
})
/**
 * Service to manage user
 */
export class UserService {
  private url = `${environment.urlApi}/users`;

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * Returns all user
   *
   * @param options Options
   * @param user User
   */
  findAll(options?: OptionsPage, user?: User): Observable<Page<User>> {
    return this.httpClient.post<Page<User>>(
      `${this.url}${options ? options.toApi() : ''}`, user,
      ServiceUtils.getHttpOptions());
  }

  findAllByRole(role: RoleType): Observable<User[]> {
    return this.httpClient.get<Page<User>>(`${this.url}/role/${role}`,
      ServiceUtils.getHttpOptions())
      .pipe(map((page) => page?.content));
  }

  /**
   * Returns a user by id
   *
   * @param id User´s id
   */
  findById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.url}/${id}`,
      ServiceUtils.getHttpOptions());
  }

  /**
   * Create a user
   *
   * @param user User to create
   */
  create(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.url}/create`, user,
      ServiceUtils.getHttpOptions());
  }

  /**
   * Update a user
   *
   * @param user User to create
   */
  update(user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.url}/${user.id}`, user,
      ServiceUtils.getHttpOptions());
  }

  /**
   * Change the selected language of a user
   *
   * @param lang Selected language
   */
  changeLanguage(lang: string): Observable<boolean> {
    return this.httpClient.head(`${this.url}/lang/${lang}`, {
      observe: 'response',
      responseType: 'json',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: localStorage.authorization,
      })
    }).pipe(
      map((x) => x.status === 200)
    );
  }

  /**
   * Disable a user
   *
   * @param id User´s id
   * @param active New value to user´s active
   */
  disable(id: number, active: boolean): Observable<User> {
    return this.httpClient.patch<User>(
      `${this.url}/disable/${id}/${active}`, {},
      ServiceUtils.getHttpOptions());
  }

  /**
   * Delete a user
   *
   * @param id User´s id
   */
  delete(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.url}/${id}`,
      ServiceUtils.getHttpOptions());
  }

  /**
   * Get user statistics
   */
  getStatistics(): Observable<UserStatistics> {
    return this.httpClient.get<UserStatistics>(`${this.url}/statistics`,
      ServiceUtils.getHttpOptions());
  }
}
