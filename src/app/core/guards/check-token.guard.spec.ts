import { TestBed } from '@angular/core/testing';

import { CheckTokenGuard } from './check-token-guard.service';
import { CoreModule } from '../core.module';
import { SharedModule } from '../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { userRoutes } from '../../components/user/user-routing.module';
import { TestUtils } from '../utils/test-utils';

describe('CheckTokenGuard', () => {
  let guard: CheckTokenGuard;
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        RouterTestingModule.withRoutes(userRoutes),
        TestUtils.getLanguages(),
        SharedModule
      ],
      providers: [
        CheckTokenGuard
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ]
    });
    guard = TestBed.inject(CheckTokenGuard);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  afterEach(() => {
    TestUtils.cleanSweetAlert();
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('check with valid token', () => {
    guard.ngOnDestroy();
    const exp = new Date((new Date().getTime() / 1_000) + 30_000).getTime();
    localStorage.setItem('exp', exp.toString());
    expect(guard.canLoad()).toBeTrue();
  });

  it('check with invalid token', () => {
    const exp = new Date((new Date().getTime() / 1_000) - 30_000).getTime();
    localStorage.setItem('exp', exp.toString());
    expect(guard.canLoad()).toBeFalse();
  });

  it('check with null token', () => {
    localStorage.clear();
    expect(guard.canLoad()).toBeFalse();
    guard.ngOnDestroy();
  });
});
