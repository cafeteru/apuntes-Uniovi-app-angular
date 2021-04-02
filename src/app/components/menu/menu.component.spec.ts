import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { TestUtils } from '../../core/utils/test-utils';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { LoadingState } from '../../store/reducers/loading.reducer';
import { UserState } from '../../store/reducers/user.reducer';
import { User } from '../../core/models/user';
import { AppState } from '../../store/app.reducer';
import { ChartsModule } from 'ng2-charts';
import { UserService } from '../../core/services/user.service';
import { UserStatistics } from '../../core/models/statistics/user-statistics';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let userService: UserService;
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MenuComponent
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        CoreModule,
        SharedModule,
        TestUtils.getLanguages(),
        ChartsModule
      ],
      providers: [
        UserService,
        provideMockStore({initialState})
      ]
    }).compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = fixture.debugElement.injector.get(UserService);
    spyOn(userService, 'getStatistics').and.callFake(() => of(new UserStatistics()));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
