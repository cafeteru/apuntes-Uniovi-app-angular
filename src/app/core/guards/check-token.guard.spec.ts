import { TestBed } from '@angular/core/testing';

import { CheckTokenGuard } from './check-token.guard';
import { CoreModule } from '../core.module';
import { SharedModule } from '../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { userRoutes } from '../../components/admin/user/user-routing.module';
import { TestUtils } from '../utils/test-utils';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { LoadingState } from '../../store/reducers/loading.reducer';
import { UserState } from '../../store/reducers/user.reducer';
import { User } from '../models/user';
import { AppState } from '../../store/app.reducer';

describe('CheckTokenGuard', () => {
  let guard: CheckTokenGuard;
  let router: Router;
  let location: Location;
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
    });
    guard = TestBed.inject(CheckTokenGuard);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    store = TestBed.inject(MockStore);
    localStorage.clear();
  });

  afterEach(() => {
    TestUtils.cleanSweetAlert();
    guard.ngOnDestroy();
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('check with valid token', () => {
    const exp = new Date((new Date().getTime() / 1_000) + 30_000).getTime();
    localStorage.setItem('exp', exp.toString());
    localStorage.setItem('authorization', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzd' +
      'WIiOiJhZG1pbiIsInJvbGUiOiJST0xFX0FETUlOIiwiaWQiOjEsImV4cCI6MTYyMDYxMzYwMn0.cQw7n' +
      'oVDHVTqhiLdrdFDVS1iT9aFYuTa625pO8GSlXgfXdb-buvWJlmLKfM1nb2rf0wb5IE6cg3aw2WvCwdxDQ');
    expect(guard.canLoad()).toBeTrue();
  });

  it('check with invalid token', () => {
    const exp = new Date((new Date().getTime() / 1_000) - 30_000).getTime();
    localStorage.setItem('exp', exp.toString());
    expect(guard.canLoad()).toBeFalse();
  });

  it('check with null token', () => {
    expect(guard.canLoad()).toBeFalse();
  });
});
