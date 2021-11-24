import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherMenuComponent } from './teacher-menu.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '../../../core/core.module';
import { SharedModule } from '../../../shared/shared.module';
import { TestUtils } from '../../../core/utils/test-utils';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { LoadingState } from '../../../store/reducers/loading.reducer';
import { UserState } from '../../../store/reducers/user.reducer';
import { User } from '../../../core/models/user';
import { AppState } from '../../../store/app.reducer';

describe('TeacherMenuComponent', () => {
  let component: TeacherMenuComponent;
  let fixture: ComponentFixture<TeacherMenuComponent>;
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
      declarations: [TeacherMenuComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        CoreModule,
        SharedModule,
        TestUtils.getLanguages(),
      ],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
