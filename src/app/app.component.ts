import { Component } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private logger: NGXLogger,
    private translateService: TranslateService
  ) {
    this.logger.debug(AppComponent.name, 'constructor()', 'start');
    this.logger.debug(AppComponent.name, 'constructor()', 'end');
  }

  useLanguage(language: string): void {
    this.translateService.use(language);
  }
}
