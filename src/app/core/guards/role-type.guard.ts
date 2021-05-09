import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { RoleType } from '../models/enums/role-type';
import jwt_decode from 'jwt-decode';
import { IToken } from '../services/login.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

const ERROR_ROLE_INVALID = marker('error.token.role.invalid');

@Injectable({
  providedIn: 'root'
})
export class RoleTypeGuard implements CanActivate, OnDestroy {
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private translateService: TranslateService,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const roleTypeI = RoleType[route.data.role];
    const iToken = jwt_decode<IToken>(localStorage?.authorization);
    const roleType = RoleType[iToken.role];
    if (roleType === RoleType.ROLE_ADMIN || roleType === roleTypeI) {
      return true;
    }
    this.router.navigate(['/']).then(
      () => {
        this.subscriptions.push(this.translateService.get(ERROR_ROLE_INVALID).subscribe(
          res => {
            Swal.fire({
              icon: 'warning',
              title: (res),
            }).then();
          }
          )
        );
      }
    );
    return false;
  }

  ngOnDestroy(): void {
    this.subscriptions.map(subscription => subscription.unsubscribe());
  }
}
