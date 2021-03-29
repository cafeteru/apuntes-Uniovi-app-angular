import { Component, ViewChild } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('drawer', {static: true}) drawer: MatDrawer;

  constructor(
    private translateService: TranslateService
  ) {
  }

  closeDrawer(): void {
    if (this.drawer.opened) {
      this.drawer.close().then();
    }
  }

  changeDrawerState(): void {
    this.drawer.toggle().then();
  }

  useLanguage(language: string): void {
    this.translateService.use(language);
  }
}
