import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from '../navbar/navbar.component';
import { TestUtils } from '../../core/utils/test-utils';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginService } from '../../core/services/login.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormGroupUtil } from '../../core/utils/form-group-util';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { of, throwError } from 'rxjs';
import { rootRoutes } from '../../app-routing.module';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let location: Location;
  let loginService: LoginService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
        NavbarComponent
      ],
      imports: [
        LoggerTestingModule,
        RouterTestingModule.withRoutes(rootRoutes),
        CoreModule,
        SharedModule,
        TestUtils.getLanguages(),
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
      ],
      providers: [
        LoginService
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loginService = fixture.debugElement.injector.get(LoginService);
  });

  afterEach(() => {
    TestUtils.cleanSweetAlert();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check login with empty fields', () => {
    FormGroupUtil.clean(component.formGroup);
    expect(component.formGroup.valid).toBeFalse();
    component.login();
    expect(component.disable).toBeFalse();
  });

  it('check login with only username', () => {
    FormGroupUtil.clean(component.formGroup);
    component.formGroup.controls.username.setValue('username');
    expect(component.formGroup.valid).toBeFalse();
    component.login();
    expect(component.disable).toBeFalse();
  });

  it('check login with only password', () => {
    FormGroupUtil.clean(component.formGroup);
    component.formGroup.controls.password.setValue('password');
    expect(component.formGroup.valid).toBeFalse();
    component.login();
    expect(component.disable).toBeFalse();
  });

  it('check login with valid values and valid user', fakeAsync(
    () => {
      spyOn(loginService, 'login').and.returnValue(of(void 0));
      const spyRoute = spyOn(router, 'navigateByUrl').and.callFake(() => new Promise(void 0));
      FormGroupUtil.clean(component.formGroup);
      component.formGroup.controls.username.setValue('username');
      component.formGroup.controls.password.setValue('password');
      expect(component.formGroup.valid).toBeTrue();
      component.login();
      tick();
      expect(spyRoute).toHaveBeenCalled();
    })
  );

  it('check login with valid values and invalid user', () => {
    spyOn(loginService, 'login').and.returnValue(throwError({status: 404}));
    FormGroupUtil.clean(component.formGroup);
    component.formGroup.controls.username.setValue('username');
    component.formGroup.controls.password.setValue('password');
    expect(component.formGroup.valid).toBeTrue();
    component.login();
    expect(component.disable).toBeTrue();
  });
});
