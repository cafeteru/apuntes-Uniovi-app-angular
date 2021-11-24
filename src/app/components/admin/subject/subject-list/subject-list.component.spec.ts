import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectListComponent } from './subject-list.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { LoadingState } from '../../../../store/reducers/loading.reducer';
import { UserState } from '../../../../store/reducers/user.reducer';
import { User } from '../../../../core/models/user';
import { AppState } from '../../../../store/app.reducer';
import { CoreModule } from '../../../../core/core.module';
import { SharedModule } from '../../../../shared/shared.module';
import { TestUtils } from '../../../../core/utils/test-utils';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubjectService } from '../../../../core/services/subject.service';

describe('SubjectListComponent', () => {
  let component: SubjectListComponent;
  let fixture: ComponentFixture<SubjectListComponent>;
  let subjectService: SubjectService;
  let store: MockStore;
  const loadingState: LoadingState = {
    isLoading: false,
    loadedUser: false,
  };

  const userState: UserState = {
    user: new User(),
  };

  const initialState: AppState = {
    loadingState,
    userState,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubjectListComponent],
      imports: [
        HttpClientTestingModule,
        TestUtils.getLanguages(),
        CoreModule,
        SharedModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [SubjectService, provideMockStore({ initialState })],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    subjectService = fixture.debugElement.injector.get(SubjectService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
