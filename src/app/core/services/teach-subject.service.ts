import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TeachSubject } from '../models/teach-subject';

@Injectable({
  providedIn: 'root'
})
export class TeachSubjectService {
  private url = `${environment.urlApi}/teachSubjects`;

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

  create(teachSubjects: TeachSubject[]): Observable<TeachSubject[]> {
    return this.httpClient.post<TeachSubject[]>(`${this.url}/create`,
      teachSubjects, TeachSubjectService.getHttpOptions());
  }
}
