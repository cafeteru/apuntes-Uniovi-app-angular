import { TestBed } from '@angular/core/testing';

import { RoleTypeGuard } from './role-type-guard.service';

describe('RoleType' +
  'Guard', () => {
  let guard: RoleTypeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RoleTypeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
