import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../../core/base/base.component';
import { IToken, LoginData, LoginService } from '../../core/services/login.service';
import { FormGroupUtil } from '../../core/utils/form-group-util';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppState } from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import * as actions from '../../store/actions/loading.actions';
import jwt_decode from 'jwt-decode';
import { RoleType } from '../../core/models/enums/role-type';

const ERROR_LOGIN_TITLE = marker('error.login.title');
const ERROR_LOGIN_TEXT = marker('error.login.text');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
/**
 * Component to display the login admin-menu
 */
export class LoginComponent extends BaseComponent implements OnInit {
  formGroup: FormGroup;
  disable: boolean;
  subscription: Subscription;

  constructor(
    protected translateService: TranslateService,
    private router: Router,
    private loginService: LoginService,
    private store: Store<AppState>
  ) {
    super(translateService);
    this.subscription = this.store.select('loadingState').subscribe(
      loadingState => this.disable = loadingState.isLoading
    );
  }

  ngOnInit(): void {
    localStorage.clear();
    this.disable = false;
    this.formGroup = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  /**
   * Submit request to login.
   */
  login(): void {
    if (FormGroupUtil.valid(this.formGroup)) {
      this.store.dispatch(actions.initLoading());
      const loginData: LoginData = {
        username: this.formGroup.controls.username.value,
        password: this.formGroup.controls.password.value
      };
      this.subscriptions.push(
        this.loginService.login(loginData).subscribe(
          () => {
            const iToken = jwt_decode<IToken>(localStorage?.authorization);
            let url = '/menu';
            switch (RoleType[iToken.role]) {
              case RoleType.ROLE_STUDENT:
                url += '/student';
                break;
              case RoleType.ROLE_TEACHER:
                url += '/teacher';
                break;
            }
            this.router.navigateByUrl(url).then();
            this.store.dispatch(actions.stopLoading());
          },
          () => {
            this.showAlert('error', ERROR_LOGIN_TITLE, ERROR_LOGIN_TEXT,
              () => this.store.dispatch(actions.stopLoading()));
          },
        )
      );
    }
  }
}
