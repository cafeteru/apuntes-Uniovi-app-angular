import {Injectable, OnDestroy} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';
import {Subscription} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {marker} from '@biesbjerg/ngx-translate-extract-marker';

const ERROR_TOKEN_INVALID = marker('error.token.invalid');

interface Token {
  role: string;
  id: number;
  exp: number;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class CheckValidTokenGuard implements CanActivate, OnDestroy {
  private subscription: Subscription;

  constructor(
    private router: Router,
    private translateService: TranslateService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const authorization = localStorage.Authorization;
    if (authorization) {
      const parts = authorization.split(' ');
      if (parts.length === 2) {
        const auth = parts[1];
        const token = jwt_decode<Token>(auth);
        if (token.exp && Date.now() < (token.exp * 1000)) {
          return true;
        }
      }
    }
    this.subscription = this.translateService.get(ERROR_TOKEN_INVALID).subscribe(
      res => {
        Swal.fire({
          icon: 'warning',
          title: (res)
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
