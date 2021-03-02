import { TestBed } from '@angular/core/testing';

import { UserResolver } from './user-resolver.service';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../services/user.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { User } from '../models/user';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { TestUtils } from '../utils/test-utils';
import { of } from 'rxjs';

describe('UserResolver', () => {
  let resolver: UserResolver;
  let route: ActivatedRoute;
  let location: Location;
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        LoggerTestingModule,
        HttpClientTestingModule,
        RouterTestingModule,
        TestUtils.getLanguages()
      ],
      providers: [
        UserService,
        {
          provide: ActivatedRoute,
          useValue: {snapshot: {paramMap: convertToParamMap({id: 1})}}
        },
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ]
    });
    resolver = TestBed.inject(UserResolver);
    route = TestBed.inject(ActivatedRoute);
    location = TestBed.inject(Location);
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('check with existed user', () => {
    const user = new User();
    spyOn(service, 'findById').and.callFake(() => of(user));
    resolver.resolve(route.snapshot, null).subscribe(
      (res) => {
        expect(res).toBeTruthy();
        expect(res).toBe(user);
      }
    );
  });

  it('check with no existed user',
    () => {
      spyOn(service, 'findById').and.callThrough();
      resolver.resolve(route.snapshot, null).subscribe(
        () => {
        },
        () => {
          expect(location.path()).toBe('/users');
        }
      );
    });
});
