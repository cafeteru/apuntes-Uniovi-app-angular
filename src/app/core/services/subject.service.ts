import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { OptionsPage } from '../models/server/options-page';
import { Observable } from 'rxjs';
import { Page } from '../models/server/page';
import { Subject } from '../models/subject';
import { SubjectStatistics } from '../models/statistics/subject-statistics';
import { ServiceUtils } from './service-utils';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  private url = `${environment.urlApi}/subjects`;

  constructor(private httpClient: HttpClient) {}

  /**
   * Returns all subjects
   *
   * @param options Options
   * @param subject User
   */
  findAll(options: OptionsPage, subject?: Subject): Observable<Page<Subject>> {
    return this.httpClient.post<Page<Subject>>(
      `${this.url}${options.toApi()}`,
      subject,
      ServiceUtils.getHttpOptions()
    );
  }

  /**
   * Create a subject
   *
   * @param subject Subject to create
   */
  create(subject: Subject): Observable<Subject> {
    return this.httpClient.post<Subject>(
      `${this.url}/create`,
      subject,
      ServiceUtils.getHttpOptions()
    );
  }

  /**
   * Returns a subject by id
   *
   * @param id Subject´s id
   */
  findById(id: number): Observable<Subject> {
    return this.httpClient.get<Subject>(
      `${this.url}/${id}`,
      ServiceUtils.getHttpOptions()
    );
  }

  /**
   * Update a subject
   *
   * @param subject Subject to create
   */
  update(subject: Subject): Observable<Subject> {
    return this.httpClient.put<Subject>(
      `${this.url}/${subject.id}`,
      subject,
      ServiceUtils.getHttpOptions()
    );
  }

  /**
   * Disable a subject
   *
   * @param id Subject´s id
   * @param active New value to subject´s active
   */
  disable(id: number, active: boolean): Observable<Subject> {
    return this.httpClient.patch<Subject>(
      `${this.url}/disable/${id}/${active}`,
      {},
      ServiceUtils.getHttpOptions()
    );
  }

  /**
   * Delete a subject
   *
   * @param id Subject´s id
   */
  delete(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(
      `${this.url}/${id}`,
      ServiceUtils.getHttpOptions()
    );
  }

  /**
   * Get subject statistics
   */
  getStatistics(): Observable<SubjectStatistics> {
    return this.httpClient.get<SubjectStatistics>(
      `${this.url}/statistics`,
      ServiceUtils.getHttpOptions()
    );
  }
}
