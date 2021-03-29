import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { LoadingState } from './store/reducers/loading.reducer';
import { UserState } from './store/reducers/user.reducer';
import { User } from './core/models/user';
import { AppState } from './store/app.reducer';

describe('AppComponent', () => {
  let store: MockStore;
  const loadingState: LoadingState = {
    isLoading: false,
    loadedUser: false
  };

  const userState: UserState = {
    user: new User()
  };

  const initialState: AppState = {
    loadingState,
    userState
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        CoreModule,
        SharedModule,
        TranslateModule.forRoot(),
      ],
      declarations: [
        AppComponent,
        NavbarComponent
      ],
      providers: [
        provideMockStore({initialState}),
      ]
    }).compileComponents();
    store = TestBed.inject(MockStore);
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
