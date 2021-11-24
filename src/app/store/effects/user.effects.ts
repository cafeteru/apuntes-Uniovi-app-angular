import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../core/services/user.service';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as userActions from '../actions/user.actions';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.loadUser),
      mergeMap((action) =>
        this.userService.findById(action.id).pipe(
          map((user) => userActions.loadUserSuccess({ user })),
          catchError(() => of(userActions.logout()))
        )
      )
    )
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}
