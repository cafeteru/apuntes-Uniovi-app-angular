import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSubjectComponent } from './modal-subject.component';
import { CoreModule } from '../../../../core/core.module';
import { SharedModule } from '../../../../shared/shared.module';
import { TestUtils } from '../../../../core/utils/test-utils';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { LoadingState } from '../../../../store/reducers/loading.reducer';
import { UserState } from '../../../../store/reducers/user.reducer';
import { User } from '../../../../core/models/user';
import { AppState } from '../../../../store/app.reducer';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { Subject } from '../../../../core/models/subject';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SubjectService } from '../../../../core/services/subject.service';

const matDialogRefMock = {
  close: () => of()
};

describe('ModalSubjectComponent', () => {
  let component: ModalSubjectComponent;
  let fixture: ComponentFixture<ModalSubjectComponent>;
  let subjectService: SubjectService;
  let store: MockStore;
  const subject = new Subject();
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
        ModalSubjectComponent
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
        SubjectService,
        {
          provide: MatDialogRef,
          useValue: matDialogRefMock
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: subject
        },
        provideMockStore({initialState})
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ]
    }).compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    subjectService = fixture.debugElement.injector.get(SubjectService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
