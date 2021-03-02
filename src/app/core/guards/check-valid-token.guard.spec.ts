import { TestBed } from '@angular/core/testing';

import { CheckValidTokenGuard } from './check-valid-token.guard';
import { CoreModule } from '../core.module';
import { SharedModule } from '../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { userRoutes } from '../../components/user/user-routing.module';
import { TestUtils } from '../utils/test-utils';

describe('CheckValidTokenGuard', () => {
  let guard: CheckValidTokenGuard;
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
        CheckValidTokenGuard
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ]
    });
    guard = TestBed.inject(CheckValidTokenGuard);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  afterEach(() => {
    const list = document.getElementsByClassName('swal2-container swal2-center swal2-backdrop-show');
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < list.length; i++) {
      list[i].remove();
    }
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('check with valid token', () => {
    guard.ngOnDestroy();
    const exp = new Date((new Date().getTime() / 1_000) + 30_000).getTime();
    localStorage.setItem('exp', exp.toString());
    expect(guard.canActivate()).toBeTrue();
  });

  it('check with invalid token', () => {
    const exp = new Date((new Date().getTime() / 1_000) - 30_000).getTime();
    localStorage.setItem('exp', exp.toString());
    expect(guard.canActivate()).toBeFalse();
  });

  it('check with null token', () => {
    localStorage.clear();
    expect(guard.canActivate()).toBeFalse();
    guard.ngOnDestroy();
  });
});
