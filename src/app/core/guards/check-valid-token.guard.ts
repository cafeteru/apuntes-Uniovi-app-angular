import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { NGXLogger } from 'ngx-logger';

const ERROR_TOKEN_INVALID = marker('error.token.invalid');

@Injectable({
  providedIn: 'root'
})
/**
 * Guard to verify that the user is registering and is validated
 */
export class CheckValidTokenGuard implements CanActivate, OnDestroy {
  private subscription: Subscription;

  constructor(
    private logger: NGXLogger,
    private router: Router,
    private translateService: TranslateService
  ) {
    this.logger.debug(CheckValidTokenGuard.name, 'constructor()', 'start');
    this.logger.debug(CheckValidTokenGuard.name, 'constructor()', 'end');
  }

  canActivate(): boolean {
    const exp = localStorage.exp;
    if (exp && !isNaN(localStorage.exp) && Date.now() < (Number(exp) * 1_000)) {
      return true;
    }
    this.subscription = this.translateService.get(ERROR_TOKEN_INVALID).subscribe(
      res => {
        Swal.fire({
          icon: 'warning',
          title: (res),
        }).then(
          () => {
            this.router.navigate(['/']).then();
          }
        );
      }
    );
    return false;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
