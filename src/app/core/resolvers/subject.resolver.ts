import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SubjectService } from '../services/subject.service';
import { Subject } from '../models/subject';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SubjectResolver implements Resolve<Subject> {
  constructor(private subjectService: SubjectService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Subject> {
    const id = Number(route.paramMap.get('id'));
    return this.subjectService.findById(id).pipe(
      catchError(() => {
        this.router.navigateByUrl('/subjects').then();
        return of(null);
      })
    );
  }
}
