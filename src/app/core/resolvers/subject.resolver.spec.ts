import { TestBed } from '@angular/core/testing';

import { SubjectResolver } from './subject.resolver';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';
import { SubjectService } from '../services/subject.service';
import { RouterTestingModule } from '@angular/router/testing';
import { TestUtils } from '../utils/test-utils';
import { subjectRoutes } from '../../components/subject/subject-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Subject } from '../models/subject';

describe('SubjectResolver', () => {
  let resolver: SubjectResolver;
  let service: SubjectService;
  let httpMock: HttpTestingController;
  let route: ActivatedRoute;
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(subjectRoutes),
        TestUtils.getLanguages()
      ],
      providers: [
        SubjectService,
        {
          provide: ActivatedRoute,
          useValue: {snapshot: {paramMap: convertToParamMap({id: 1})}}
        },
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ]
    });
    resolver = TestBed.inject(SubjectResolver);
    service = TestBed.inject(SubjectService);
    httpMock = TestBed.inject(HttpTestingController);
    route = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  afterEach(() => {
    httpMock.verify();
    TestUtils.cleanSweetAlert();
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('check with existed subject', () => {
    const id = 1;
    const subject = new Subject();
    resolver.resolve(route.snapshot).subscribe(
      (res) => {
        expect(res).toBeTruthy();
        expect(res).toBe(subject);
      }
    );
    const req = httpMock.expectOne(`${environment.urlApi}/subjects/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(subject);
  });

  it('check with no existed subject', () => {
    const id = 1;
    spyOn(service, 'findById').and.callThrough();
    resolver.resolve(route.snapshot).subscribe(
      () => {
      },
      () => {
        expect(location.path()).toBe('/subjects');
      }
    );
    const req = httpMock.expectOne(`${environment.urlApi}/subjects/${id}`);
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('error'));
  });
});
