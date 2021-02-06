import { TestBed } from '@angular/core/testing';

import { UserResolver } from './user-resolver.service';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserResolver', () => {
  let resolver: UserResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        LoggerTestingModule,
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });
    resolver = TestBed.inject(UserResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
