import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OptionsPage } from '../models/server/options-page';
import { Observable } from 'rxjs';
import { Page } from '../models/server/page';
import { Subject } from '../models/subject';
import { SubjectStatistics } from '../models/statistics/subject-statistics';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private url = `${environment.urlApi}/subjects`;

  constructor(
    private httpClient: HttpClient
  ) {
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
    return this.httpClient.post<Page<Subject>>(`${this.url}${options.toApi()}`, subject,
      SubjectService.getHttpOptions());
  }

  /**
   * Create a subject
   *
   * @param subject Subject to create
   */
  create(subject: Subject): Observable<Subject> {
    return this.httpClient.post<Subject>(`${this.url}/create`,
      subject, SubjectService.getHttpOptions());
  }

  /**
   * Returns a subject by id
   *
   * @param id Subject´s id
   */
  findById(id: number): Observable<Subject> {
    return this.httpClient.get<Subject>(`${this.url}/${id}`,
      SubjectService.getHttpOptions());
  }

  /**
   * Disable a subject
   *
   * @param id Subject´s id
   * @param active New value to subject´s active
   */
  disable(id: number, active: boolean): Observable<Subject> {
    return this.httpClient.patch<Subject>(
      `${this.url}/disable/${id}/${active}`, {}, SubjectService.getHttpOptions());
  }

  /**
   * Delete a subject
   *
   * @param id Subject´s id
   */
  delete(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.url}/${id}`, SubjectService.getHttpOptions());
  }

  /**
   * Get subject statistics
   */
  getStatistics(): Observable<SubjectStatistics> {
    return this.httpClient.get<SubjectStatistics>(`${this.url}/statistics`,
      SubjectService.getHttpOptions());
  }
}
