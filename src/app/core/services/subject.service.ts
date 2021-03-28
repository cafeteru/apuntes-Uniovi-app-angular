import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { NGXLogger } from 'ngx-logger';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OptionsPage } from '../models/server/options-page';
import { Observable } from 'rxjs';
import { Page } from '../models/server/page';
import { tap } from 'rxjs/operators';
import { Subject } from '../models/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private url = `${environment.urlApi}/subjects`;

  constructor(
    private logger: NGXLogger,
    private http: HttpClient
  ) {
    this.logger.debug(SubjectService.name, 'constructor()', 'start');
    this.logger.debug(SubjectService.name, 'constructor()', 'end');
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
   * Returns all subjects
   *
   * @param options Options
   * @param subject User
   */
  findAll(options: OptionsPage, subject?: Subject): Observable<Page<Subject>> {
    this.logger.debug(SubjectService.name, `findAll()`, 'start');
    return this.http.post<Page<Subject>>(`${this.url}${options.toApi()}`, subject,
      SubjectService.getHttpOptions()).pipe(
      tap(() => this.logger.debug(SubjectService.name, `findAll()`, 'end'))
    );
  }

  /**
   * Create a subject
   *
   * @param subject Subject to create
   */
  create(subject: Subject): Observable<Subject> {
    this.logger.debug(SubjectService.name, `save(subject: ${subject})`, 'start');
    return this.http.post<Subject>(`${this.url}/create`, subject, SubjectService.getHttpOptions()).pipe(
      tap(() => this.logger.debug(SubjectService.name, `save(subject: ${subject})`, 'end'))
    );
  }
}
