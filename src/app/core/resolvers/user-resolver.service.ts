import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { catchError } from 'rxjs/operators';

/**
 * Resolver to load user´s data
 */
@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<User> {
  constructor(
    private userService: UserService,
    private router: Router,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    const id = Number(route.paramMap.get('id'));
    return this.userService.findById(id).pipe(
      catchError(() => {
        this.router.navigateByUrl('/users').then();
        return of(null);
      })
    );
  }
}
