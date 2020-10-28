import {Component, OnInit} from '@angular/core';
import {NGXLogger} from 'ngx-logger';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private logger: NGXLogger,
  ) {
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
    if (this.formGroup.valid) {
      Swal.fire({
        icon: 'success',
        title: ('error.login.title'),
        text: ('error.login.title')
      }).then();
    } else {
      Swal.fire({
        icon: 'error',
        title: ('error.login.title'),
        text: ('error.login.text')
      }).then();
    }
  }
}
