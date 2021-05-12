import { TestBed } from '@angular/core/testing';

import { RoleTypeGuard } from './role-type.guard';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { LoadingState } from '../../store/reducers/loading.reducer';
import { UserState } from '../../store/reducers/user.reducer';
import { User } from '../models/user';
import { AppState } from '../../store/app.reducer';
import { Router } from '@angular/router';
import { CoreModule } from '../core.module';
import { RouterTestingModule } from '@angular/router/testing';
import { userRoutes } from '../../components/admin/user/user-routing.module';
import { TestUtils } from '../utils/test-utils';
import { SharedModule } from '../../shared/shared.module';
import { CheckTokenGuard } from './check-token.guard';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('RoleType' +
  'Guard', () => {
  let guard: RoleTypeGuard;
  let router: Router;
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        RouterTestingModule.withRoutes(userRoutes),
        TestUtils.getLanguages(),
        SharedModule
      ],
      providers: [
        CheckTokenGuard,
        provideMockStore({initialState}),
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ]
    }).compileComponents();
    store = TestBed.inject(MockStore);
    guard = TestBed.inject(RoleTypeGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
