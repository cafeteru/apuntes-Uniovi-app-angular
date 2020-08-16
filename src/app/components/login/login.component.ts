import {Component, OnInit} from '@angular/core';
import {NGXLogger} from 'ngx-logger';
import {TranslationService} from '../../core/services/translation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private logger: NGXLogger,
    private translationService: TranslationService
  ) {
  }

  ngOnInit(): void {
    this.logger.debug(LoginComponent.name, 'ngOnInit()', 'start');
    this.logger.debug(LoginComponent.name, 'ngOnInit()', 'end');
  }

}
