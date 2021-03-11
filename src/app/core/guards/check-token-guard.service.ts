import { Injectable, OnDestroy } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
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
export class CheckTokenGuard implements CanLoad, OnDestroy {
  private subscription: Subscription;

  constructor(
    private logger: NGXLogger,
    private router: Router,
    private translateService: TranslateService
  ) {
    this.logger.debug(CheckTokenGuard.name, 'constructor()', 'start');
    this.logger.debug(CheckTokenGuard.name, 'constructor()', 'end');
  }

  canLoad(): boolean {
    this.logger.debug(CheckTokenGuard.name, 'canLoad()', 'start');
    const exp = localStorage.exp;
    if (exp && !isNaN(localStorage.exp) && Date.now() < (Number(exp) * 1_000)) {
      this.logger.debug(CheckTokenGuard.name, 'canLoad()', 'end');
      return true;
    }
    this.router.navigate(['/']).then(
      () => {
        this.subscription = this.translateService.get(ERROR_TOKEN_INVALID).subscribe(
          res => {
            Swal.fire({
              icon: 'warning',
              title: (res),
            }).then();
          }
        );
      }
    );
    this.logger.debug(CheckTokenGuard.name, 'canLoad()', 'end');
    return false;
  }

  ngOnDestroy(): void {
    this.logger.debug(CheckTokenGuard.name, 'ngOnDestroy()', 'start');
    this.subscription?.unsubscribe();
    this.logger.debug(CheckTokenGuard.name, 'ngOnDestroy()', 'end');
  }

}
