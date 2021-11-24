import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectStatisticsComponent } from './subject-statistics.component';
import { CoreModule } from '../../../core/core.module';
import { SharedModule } from '../../shared.module';
import { TestUtils } from '../../../core/utils/test-utils';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { LoadingState } from '../../../store/reducers/loading.reducer';
import { UserState } from '../../../store/reducers/user.reducer';
import { User } from '../../../core/models/user';
import { AppState } from '../../../store/app.reducer';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SubjectService } from '../../../core/services/subject.service';
import { of } from 'rxjs';
import { SubjectStatistics } from '../../../core/models/statistics/subject-statistics';

describe('SubjectStatisticsComponent', () => {
  let component: SubjectStatisticsComponent;
  let fixture: ComponentFixture<SubjectStatisticsComponent>;
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
      declarations: [SubjectStatisticsComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        CoreModule,
        SharedModule,
        TestUtils.getLanguages(),
        ChartsModule,
      ],
      providers: [SubjectService, provideMockStore({ initialState })],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    subjectService = fixture.debugElement.injector.get(SubjectService);
    spyOn(subjectService, 'getStatistics').and.callFake(() =>
      of(new SubjectStatistics())
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
