import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../../core/base/base.component';
import { LoginData, LoginService } from '../../core/services/login.service';
import { FormGroupUtil } from '../../core/utils/form-group-util';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppState } from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import * as actions from '../../store/actions/loading.actions';

const ERROR_LOGIN_TITLE = marker('error.login.title');
const ERROR_LOGIN_TEXT = marker('error.login.text');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
/**
 * Component to display the login menu
 */
export class LoginComponent extends BaseComponent implements OnInit {
  formGroup: FormGroup;
  disable: boolean;
  subscription: Subscription;

  constructor(
    protected logger: NGXLogger,
    protected translateService: TranslateService,
    private router: Router,
    private loginService: LoginService,
    private store: Store<AppState>
  ) {
    super(logger, translateService);
    this.logger.debug(LoginComponent.name, 'constructor()', 'start');
    this.subscription = this.store.select('loadingState').subscribe(
      loadingState => this.disable = loadingState.isLoading
    );
    this.logger.debug(LoginComponent.name, 'constructor()', 'end');
  }

  ngOnInit(): void {
    this.logger.debug(LoginComponent.name, 'ngOnInit()', 'start');
    localStorage.clear();
    this.disable = false;
    this.formGroup = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
    this.logger.debug(LoginComponent.name, 'ngOnInit()', 'end');
  }

  /**
   * Submit request to login.
   */
  login(): void {
    this.logger.debug(LoginComponent.name, 'login()', 'start');
    if (FormGroupUtil.valid(this.formGroup)) {
      this.store.dispatch(actions.initLoading());
      const loginData: LoginData = {
        username: this.formGroup.controls.username.value,
        password: this.formGroup.controls.password.value
      };
      this.subscriptions.push(
        this.loginService.login(loginData).subscribe(
          () => {
            this.router.navigateByUrl('/menu').then();
            this.store.dispatch(actions.stopLoading());
            this.logger.debug(LoginComponent.name, 'login()', 'end');
          },
          () => {
            this.showAlert('error', ERROR_LOGIN_TITLE, ERROR_LOGIN_TEXT,
              () => this.store.dispatch(actions.stopLoading()));
            this.logger.error(LoginComponent.name, 'login()', 'error');
          },
        )
      );
      return;
    }
    this.logger.debug(LoginComponent.name, 'ngOnInit()', 'end');
  }
}
