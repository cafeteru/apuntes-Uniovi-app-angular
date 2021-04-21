import { TestBed } from '@angular/core/testing';

import { IToken, LoginData, LoginService, ResponseLogin } from './login.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RoleType } from '../models/enums/role-type';
import * as jwt from 'jwt-simple';
import { encode } from 'jwt-simple';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { LoadingState } from '../../store/reducers/loading.reducer';
import { UserState } from '../../store/reducers/user.reducer';
import { User } from '../models/user';
import { AppState } from '../../store/app.reducer';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;
  let store: MockStore;
  const loadingState: LoadingState = {
    isLoading: false,
    loadedUser: false
  };

  const user = new User();
  user.username = 'username';
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
        HttpClientTestingModule
      ],
      providers: [
        LoginService,
        provideMockStore({initialState})
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ]
    });
    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
    store = TestBed.inject(MockStore);
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
      role: RoleType.ROLE_ADMIN
    };
    localStorage.setItem('authorization', encode(content, 'test'));
    service.login(loginData).subscribe(
      () => {
        expect(localStorage.getItem('authorization')).not.toBeNull();
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
