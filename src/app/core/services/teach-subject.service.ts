import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TeachSubject } from '../models/teach-subject';
import { User } from '../models/user';
import { Subject } from '../models/subject';
import { ServiceUtils } from './service-utils';

@Injectable({
  providedIn: 'root'
})
export class TeachSubjectService {
  private url = `${environment.urlApi}/teachSubjects`;

  constructor(
    private httpClient: HttpClient
  ) {
  }

  create(id: number, teachSubjects: TeachSubject[]): Observable<TeachSubject[]> {
    return this.httpClient.post<TeachSubject[]>(`${this.url}/create/${id}`,
      teachSubjects, ServiceUtils.getHttpOptions());
  }

  findTeachersBySubjectId(id: number): Observable<User[]> {
    return this.httpClient.get<User[]>(
      `${this.url}/subject/${id}`, ServiceUtils.getHttpOptions());
  }

  findSubjectsByTeacherId(id: number): Observable<Subject[]> {
    return this.httpClient.get<Subject[]>(
      `${this.url}/teacher/${id}`, ServiceUtils.getHttpOptions());
  }
}
