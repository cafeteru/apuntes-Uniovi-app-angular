import { TestBed } from '@angular/core/testing';

import { UserResolver } from './user-resolver.service';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../services/user.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { User } from '../models/user';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { userRoutes } from '../../components/user/user-routing.module';
import { Location } from '@angular/common';
import { TestUtils } from '../utils/test-utils';

describe('UserResolver', () => {
  let resolver: UserResolver;
  let service: UserService;
  let httpMock: HttpTestingController;
  let route: ActivatedRoute;
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        LoggerTestingModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(userRoutes),
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
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
    route = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  afterEach(() => {
    httpMock.verify();
  });

  afterEach(() => {
    TestUtils.cleanSweetAlert();
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('check with existed user', () => {
    const id = 1;
    const user = new User();
    resolver.resolve(route.snapshot).subscribe(
      (res) => {
        expect(res).toBeTruthy();
        expect(res).toBe(user);
      }
    );
    const req = httpMock.expectOne(`${environment.urlApi}/users/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(user);
  });

  it('check with no existed user', () => {
    const id = 1;
    spyOn(service, 'findById').and.callThrough();
    resolver.resolve(route.snapshot).subscribe(
      () => {
      },
      () => {
        expect(location.path()).toBe('/users');
      }
    );
    const req = httpMock.expectOne(`${environment.urlApi}/users/${id}`);
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('error'));
  });
});
