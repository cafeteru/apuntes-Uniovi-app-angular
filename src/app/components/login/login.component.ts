import {Component, OnInit} from '@angular/core';
import {NGXLogger} from 'ngx-logger';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {marker} from '@biesbjerg/ngx-translate-extract-marker';
import {TranslateService} from '@ngx-translate/core';
import {BaseComponent} from '../../core/base/base.component';
import {Subscription} from 'rxjs';

const SUCCESS_LOGIN_TITLE = marker('success.login.title');
const SUCCESS_LOGIN_TEXT = marker('success.login.text');
const ERROR_LOGIN_TITLE = marker('error.login.title');
const ERROR_LOGIN_TEXT = marker('error.login.text');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    protected logger: NGXLogger,
    private translateService: TranslateService
  ) {
    super(logger);
    this.logger.debug(LoginComponent.name, 'constructor()', 'start');
    this.logger.debug(LoginComponent.name, 'constructor()', 'end');
  }

  ngOnInit(): void {
    this.logger.debug(LoginComponent.name, 'ngOnInit()', 'start');
    this.formGroup = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
    this.logger.debug(LoginComponent.name, 'ngOnInit()', 'end');
  }

  login(): void {
    let subscription: Subscription;
    if (this.formGroup.valid) {
      subscription = this.translateService.get([SUCCESS_LOGIN_TITLE, SUCCESS_LOGIN_TEXT])
        .subscribe(res => {
            Swal.fire({
              icon: 'success',
              title: (res[SUCCESS_LOGIN_TITLE]),
              text: (res[SUCCESS_LOGIN_TEXT])
            }).then();
          }
        );
    } else {
      subscription = this.translateService.get([ERROR_LOGIN_TITLE, ERROR_LOGIN_TEXT])
        .subscribe(res => {
            Swal.fire({
              icon: 'error',
              title: (res[ERROR_LOGIN_TITLE]),
              text: (res[ERROR_LOGIN_TEXT])
            }).then();
          }
        );
    }
    this.subscriptions.push(subscription);
  }
}
