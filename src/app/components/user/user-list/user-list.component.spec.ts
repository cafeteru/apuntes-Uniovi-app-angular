import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestUtils } from '../../../core/utils/test-utils';
import { SharedModule } from '../../../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '../../../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user';
import { of, throwError } from 'rxjs';

describe('UsersListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        UserListComponent
      ],
      imports: [
        LoggerTestingModule,
        HttpClientTestingModule,
        TestUtils.getLanguages(),
        CoreModule,
        SharedModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
      ],
      providers: [
        UserService
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = fixture.debugElement.injector.get(UserService);
    userService = fixture.debugElement.injector.get(UserService);
  });

  afterEach(() => {
    TestUtils.cleanSweetAlert();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check disable', fakeAsync(() => {
      const spy = spyOn(userService, 'disable').and.callFake(() => of(new User()));
      component.disable(1, true);
      tick();
      expect(spy).toHaveBeenCalled();
      component.disable(1, false);
      tick();
      expect(spy).toHaveBeenCalled();
      flush();
    })
  );

  it('check error disable', fakeAsync(() => {
      const spy = spyOn(userService, 'disable').and.returnValue(throwError({status: 404}));
      component.disable(1, true);
      tick();
      expect(spy).toHaveBeenCalled();
      component.disable(1, false);
      tick();
      expect(spy).toHaveBeenCalled();
      flush();
    })
  );
});
