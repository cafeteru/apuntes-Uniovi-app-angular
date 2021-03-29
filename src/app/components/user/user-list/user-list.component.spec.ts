import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
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
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { LoadingState } from '../../../store/reducers/loading.reducer';
import { UserState } from '../../../store/reducers/user.reducer';
import { AppState } from '../../../store/app.reducer';

describe('UsersListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: UserService;
  let store: MockStore;
  const loadingState: LoadingState = {
    isLoading: false,
    loadedUser: false
  };

  const userState: UserState = {
    user: new User()
  };

  const initialState: AppState = {
    loadingState,
    userState
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        UserListComponent
      ],
      imports: [
        HttpClientTestingModule,
        TestUtils.getLanguages(),
        CoreModule,
        SharedModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        UserService,
        provideMockStore({initialState}),
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ]
    }).compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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

  it('check delete with response yes', fakeAsync(() => {
      const spy = spyOn(userService, 'delete').and.callFake(() => of(true));
      component.askDelete(1);
      tick();
      const listButtons = document.getElementsByClassName('swal2-confirm');
      expect(listButtons.length).toBe(1);
      const confirmButton = listButtons[0] as HTMLButtonElement;
      confirmButton.click();
      tick();
      expect(spy).toHaveBeenCalled();
      flush();
    })
  );

  it('check delete with response no', fakeAsync(() => {
      const spy = spyOn(userService, 'delete');
      component.askDelete(1);
      tick();
      const listButtons = document.getElementsByClassName('swal2-deny');
      expect(listButtons.length).toBe(1);
      const cancelButton = listButtons[0] as HTMLButtonElement;
      cancelButton.click();
      tick();
      expect(spy).not.toHaveBeenCalled();
      flush();
    })
  );

  it('check error delete', fakeAsync(() => {
      const spy = spyOn(userService, 'delete').and.returnValue(throwError({status: 404}));
      component.askDelete(1);
      tick();
      const listButtons = document.getElementsByClassName('swal2-confirm');
      const confirmButton = listButtons[0] as HTMLButtonElement;
      confirmButton.click();
      tick();
      expect(spy).toHaveBeenCalled();
      flush();
    })
  );
});
