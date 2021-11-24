import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceUtils } from './service-utils';
import { UnitSubject } from '../models/unit-subject';
import { Page } from '../models/server/page';

@Injectable({
  providedIn: 'root',
})
export class UnitSubjectService {
  private url = `${environment.urlApi}/unitSubjects`;

  constructor(private httpClient: HttpClient) {}

  create(unitSubject: UnitSubject): Observable<UnitSubject> {
    return this.httpClient.post<UnitSubject>(
      `${this.url}/create`,
      unitSubject,
      ServiceUtils.getHttpOptions()
    );
  }

  findBySubjectId(id: number): Observable<Page<UnitSubject>> {
    return this.httpClient.get<Page<UnitSubject>>(
      `${this.url}/subject/${id}`,
      ServiceUtils.getHttpOptions()
    );
  }

  update(unitSubject: UnitSubject): Observable<UnitSubject> {
    return this.httpClient.post<UnitSubject>(
      `${this.url}/create`,
      unitSubject,
      ServiceUtils.getHttpOptions()
    );
  }
}
