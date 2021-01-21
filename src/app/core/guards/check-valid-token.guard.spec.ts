import { TestBed } from '@angular/core/testing';

import { CheckValidTokenGuard } from './check-valid-token.guard';
import { CoreModule } from '../core.module';
import { SharedModule } from '../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('CheckValidTokenGuard', () => {
  let guard: CheckValidTokenGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        RouterTestingModule,
        SharedModule,
        TranslateModule.forRoot(),
      ]
    });
    guard = TestBed.inject(CheckValidTokenGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
