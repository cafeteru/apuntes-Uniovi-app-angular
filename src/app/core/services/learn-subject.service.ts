import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { LearnSubject } from '../models/learn-subject';
import { Page } from '../models/server/page';
import { OptionsPage } from '../models/server/options-page';
import { ServiceUtils } from './service-utils';

@Injectable({
  providedIn: 'root',
})
export class LearnSubjectService {
  private url = `${environment.urlApi}/learnSubjects`;

  constructor(private httpClient: HttpClient) {}

  create(
    id: number,
    learnSubjects: LearnSubject[]
  ): Observable<LearnSubject[]> {
    return this.httpClient.post<LearnSubject[]>(
      `${this.url}/create/${id}`,
      learnSubjects,
      ServiceUtils.getHttpOptions()
    );
  }

  findStudentsBySubjectId(
    id: number,
    options?: OptionsPage
  ): Observable<Page<User>> {
    return this.httpClient.get<Page<User>>(
      `${this.url}/subject/${id}`,
      ServiceUtils.getHttpOptions()
    );
  }
}
