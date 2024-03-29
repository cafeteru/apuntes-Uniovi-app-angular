import { Injectable, OnDestroy } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import * as userActions from '../../store/actions/user.actions';
import jwt_decode from 'jwt-decode';
import { IToken } from '../services/login.service';
import { take } from 'rxjs/operators';

const ERROR_TOKEN_INVALID = marker('error.token.invalid');

@Injectable({
  providedIn: 'root',
})
/**
 * Guard to verify that the user is registering and is validated
 */
export class CheckTokenGuard implements CanLoad, OnDestroy {
  private subscriptions: Subscription[];

  constructor(
    private router: Router,
    private translateService: TranslateService,
    private store: Store<AppState>
  ) {
    this.subscriptions = [];
  }

  canLoad(): boolean {
    const exp = localStorage.exp;
    if (exp && !isNaN(localStorage.exp) && Date.now() < Number(exp) * 1_000) {
      const iToken = jwt_decode<IToken>(localStorage?.authorization);
      this.subscriptions.push(
        this.store
          .select('loadingState')
          .pipe(take(1))
          .subscribe((loadingState) => {
            if (!loadingState.loadedUser) {
              this.store.dispatch(userActions.loadUser({ id: iToken.id }));
            }
          })
      );
      return true;
    }
    this.router.navigate(['/']).then(() => {
      this.store.dispatch(userActions.logout());
      this.subscriptions.push(
        this.translateService.get(ERROR_TOKEN_INVALID).subscribe((res) => {
          Swal.fire({
            icon: 'warning',
            title: res,
          }).then();
        })
      );
    });
    return false;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
