import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoginService } from '../../core/services/login.service';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../core/services/user.service';
import { BaseComponent } from '../../core/base/base.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { User } from '../../core/models/user';
import { changeLanguage } from '../../store/actions/user.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
/**
 * Component to display the navbar
 */
export class NavbarComponent extends BaseComponent implements OnInit {
  @Output() changeSidenavEmitter = new EventEmitter<boolean>();
  @Output() closeEmitter = new EventEmitter<boolean>();
  localStorage = localStorage;
  language = 'es';
  user: User;

  constructor(
    protected translateService: TranslateService,
    private loginService: LoginService,
    private userService: UserService,
    private store: Store<AppState>
  ) {
    super(translateService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.subscriptions.push(this.store.select('userState').subscribe(
      userState => {
        this.user = userState.user;
      })
    );
  }

  /**
   * Get class to show flag of selected language
   */
  get selectedLanguage(): string {
    return 'flag-icon flag-icon-' + this.language;
  }

  /**
   * Change the language to display the application
   *
   * @param language Selected language
   */
  useLanguage(language: string): void {
    this.language = language;
    this.translateService.use(language);
    this.store.dispatch(changeLanguage({language}));
    if (localStorage.authorization) {
      this.subscriptions.push(
        this.userService.changeLanguage(language).subscribe()
      );
    }
  }

  openSidenav(): void {
    this.changeSidenavEmitter.emit(true);
  }

  logout(): void {
    this.loginService.logout();
    this.closeEmitter.emit(true);
  }
}
