import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../core/services/login.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  localStorage = localStorage;
  language = 'es';

  constructor(
    public loginService: LoginService,
    private translateService: TranslateService
  ) {
  }

  ngOnInit(): void {
  }

  getSelectedLanguage(): string {
    return 'flag-icon flag-icon-' + this.language;
  }

  useLanguage(language: string): void {
    this.language = language;
    this.translateService.use(language);
  }
}
