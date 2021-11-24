import { Component, ViewChild } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { MatDrawer } from '@angular/material/sidenav';
import { User } from './core/models/user';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.reducer';
import { BaseComponent } from './core/base/base.component';
import { RoleType } from './core/models/enums/role-type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseComponent {
  @ViewChild('drawer', { static: true }) drawer: MatDrawer;
  user: User;
  roleType = RoleType;

  constructor(
    protected translateService: TranslateService,
    private store: Store<AppState>
  ) {
    super(translateService);
    this.subscriptions.push(
      this.store
        .select('userState')
        .subscribe((userState) => (this.user = userState.user))
    );
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

  getMenuUrl(): string {
    if (!this.user || !this.user.role) {
      return '/login';
    } else {
      switch (this.user.role) {
        case RoleType.ROLE_STUDENT:
          return '/student';
        case RoleType.ROLE_TEACHER:
          return '/teacher';
        default:
          return '/admin';
      }
    }
  }
}
