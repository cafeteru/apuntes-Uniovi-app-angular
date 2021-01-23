import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../../core/base/base.component';
import { LoginService } from '../../core/services/login.service';
import { User } from '../../core/models/user';
import { FormGroupUtil } from '../../core/utils/form-group-util';
import { Router } from '@angular/router';

const ERROR_LOGIN_TITLE = marker('error.login.title');
const ERROR_LOGIN_TEXT = marker('error.login.text');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {
  formGroup: FormGroup;
  disable: boolean;

  constructor(
    protected logger: NGXLogger,
    protected translateService: TranslateService,
    private router: Router,
    private loginService: LoginService
  ) {
    super(logger, translateService);
    this.logger.debug(LoginComponent.name, 'constructor()', 'start');
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

  login(): void {
    this.logger.debug(LoginComponent.name, 'login()', 'start');
    if (FormGroupUtil.valid(this.formGroup)) {
      this.changeDisable();
      const user = new User();
      user.username = this.formGroup.controls.username.value;
      user.password = this.formGroup.controls.password.value;
      this.subscriptions.push(
        this.loginService.login(user).subscribe(
          () => {
            this.router.navigateByUrl('/menu').then();
            this.logger.debug(LoginComponent.name, 'login()', 'end');
          },
          () => {
            this.showAlert(ERROR_LOGIN_TITLE, ERROR_LOGIN_TEXT, 'error',
              () => this.changeDisable());
            this.logger.error(LoginComponent.name, 'login()', 'error');
          },
        )
      );
      return;
    }
    this.logger.debug(LoginComponent.name, 'ngOnInit()', 'end');
  }

  changeDisable(): void {
    this.disable = !this.disable;
  }
}
