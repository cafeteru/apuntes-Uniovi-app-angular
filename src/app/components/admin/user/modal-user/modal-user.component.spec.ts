import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUserComponent } from './modal-user.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '../../../../core/core.module';
import { SharedModule } from '../../../../shared/shared.module';
import { User } from '../../../../core/models/user';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TestUtils } from '../../../../core/utils/test-utils';
import { Address } from '../../../../core/models/address';
import { LanguageType } from '../../../../core/models/enums/language-type';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { of } from 'rxjs';
import { RoleType } from '../../../../core/models/enums/role-type';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { LoadingState } from '../../../../store/reducers/loading.reducer';
import { UserState } from '../../../../store/reducers/user.reducer';
import { AppState } from '../../../../store/app.reducer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

const BTN_ADD = marker('button.add');
const BTN_UPDATE = marker('button.update');
const TITLE_ADD = marker('modal.user.title.add');
const TITLE_UPDATE = marker('modal.user.title.update');

const matDialogRefMock = {
  close: () => of()
};

describe('ModalUserComponent', () => {
  let component: ModalUserComponent;
  let fixture: ComponentFixture<ModalUserComponent>;
  let userService: UserService;
  let user: User;
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
    const address: Address = {
      city: undefined,
      id: undefined,
      postalCode: undefined,
      street: undefined
    };
    user = {
      address,
      role: undefined,
      active: undefined,
      birthDate: undefined,
      email: undefined,
      id: undefined,
      identificationType: undefined,
      img: undefined,
      name: undefined,
      numberIdentification: undefined,
      password: undefined,
      phone: undefined,
      surname: undefined,
      username: undefined,
      language: LanguageType.ES
    };
    await TestBed.configureTestingModule({
      declarations: [
        ModalUserComponent
      ],
      imports: [
        FormsModule,
        RouterTestingModule,
        CoreModule,
        SharedModule,
        TestUtils.getLanguages(),
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
      ],
      providers: [
        UserService,
        {
          provide: MatDialogRef,
          useValue: matDialogRefMock
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: user
        },
        provideMockStore({initialState}),
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ]
    }).compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = fixture.debugElement.injector.get(UserService);
  });

  afterEach(() => TestUtils.cleanSweetAlert());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check change text button', () => {
    component.ngOnInit();
    expect(component.textSaveOrUpdate).toBe(BTN_ADD);
    user.id = 1;
    component.ngOnInit();
    expect(component.textSaveOrUpdate).toBe(BTN_UPDATE);
  });

  it('check change title', () => {
    user.id = undefined;
    component.ngOnInit();
    expect(component.title).toBe(TITLE_ADD);
    user.id = 1;
    component.ngOnInit();
    expect(component.title).toBe(TITLE_UPDATE);
  });

  it('check saveOrUpdateService', () => {
    const spyAdd = spyOn(userService, 'create').and.callFake(() => of(user));
    const spyUpdate = spyOn(userService, 'update').and.callFake(() => of(user));
    component.formGroup.controls.name.setValue('name');
    component.formGroup.controls.surname.setValue('surname');
    component.formGroup.controls.username.setValue('username');
    component.formGroup.controls.password.setValue('password');
    component.formGroup.controls.role.setValue(RoleType.ROLE_STUDENT.toString());
    component.saveOrUpdate();
    expect(spyAdd).toHaveBeenCalled();
    user.id = 1;
    component.formGroup.controls.img.setValue('password');
    component.saveOrUpdate();
    expect(spyUpdate).toHaveBeenCalled();
  });
});
