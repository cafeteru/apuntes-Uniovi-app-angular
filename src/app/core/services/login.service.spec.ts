import { TestBed } from '@angular/core/testing';

import { IToken, LoginData, LoginService, ResponseLogin } from './login.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RoleType } from '../models/enums/role-type';
import * as jwt from 'jwt-simple';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        LoginService
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ]
    });
    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('check login', () => {
    localStorage.clear();
    expect(localStorage.getItem('authorization')).toBeNull();
    const loginData: LoginData = {
      username: 'username',
      password: 'password'
    };
    const content: IToken = {
      username: loginData.username,
      exp: 120,
      id: 1,
      role: RoleType.ADMIN
    };
    service.login(loginData).subscribe(
      () => {
        expect(localStorage.getItem('authorization')).not.toBeNull();
        expect(localStorage.getItem('username')).toBe(content.username);
        expect(localStorage.getItem('id')).toBe(content.id.toString());
        expect(localStorage.getItem('role')).toBe(content.role);
        expect(localStorage.getItem('exp')).toBe(content.exp.toString());
      }
    );
    const req = httpMock.expectOne(`${environment.urlApi}/login`);
    expect(req.request.method).toBe('POST');
    const token: ResponseLogin = {
      authorization: jwt.encode(content, 'key')
    };
    req.flush(token);
  });

  it('check logout', () => {
    localStorage.clear();
    expect(localStorage.getItem('authorization')).toBeNull();
    localStorage.setItem('authorization', 'authorization');
    expect(localStorage.getItem('authorization')).not.toBeNull();
    service.logout();
    expect(localStorage.getItem('authorization')).toBeNull();
  });
});
