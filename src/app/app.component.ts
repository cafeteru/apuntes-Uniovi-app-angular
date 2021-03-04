import { Component, ViewChild } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { TranslateService } from '@ngx-translate/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('drawer', { static: true }) drawer: MatDrawer;

  constructor(
    private logger: NGXLogger,
    private translateService: TranslateService
  ) {
    this.logger.debug(AppComponent.name, 'constructor()', 'start');
    this.logger.debug(AppComponent.name, 'constructor()', 'end');
  }

  closeDrawer(): void {
    if (this.drawer.opened) {
      this.drawer.close();
    }
  }

  changeDrawerState(): void {
    this.drawer.toggle();
  }

  useLanguage(language: string): void {
    this.logger.debug(AppComponent.name, `useLanguage(language: ${language})`, 'start');
    this.translateService.use(language);
    this.logger.debug(AppComponent.name, `useLanguage(language: ${language})`, 'end');
  }
}
