import { Component } from '@angular/core';
import { LoginService } from '../../core/services/login.service';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../core/services/user.service';
import { BaseComponent } from '../../core/base/base.component';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent extends BaseComponent {
  localStorage = localStorage;
  language = 'es';

  constructor(
    protected logger: NGXLogger,
    protected translateService: TranslateService,
    public loginService: LoginService,
    public userService: UserService
  ) {
    super(logger, translateService);
  }


  get selectedLanguage(): string {
    return 'flag-icon flag-icon-' + this.language;
  }

  useLanguage(language: string): void {
    this.logger.debug(UserService.name, `useLanguage(language: ${language})`, 'start');
    this.language = language;
    this.translateService.use(language);
    if (localStorage.Authorization) {
      this.subscriptions.push(
        this.userService.changeLanguage(language).subscribe(
          () => {
            this.logger.debug(UserService.name, `useLanguage(language: ${language})`, 'end');
          },
          (error) => {
            this.logger.error(UserService.name, `useLanguage(language: ${language})`, error);
          }
        )
      );
    }
  }
}
