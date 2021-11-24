import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherSubjectDetailsComponent } from './teacher-subject-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '../../../../core/core.module';
import { SharedModule } from '../../../../shared/shared.module';
import { TestUtils } from '../../../../core/utils/test-utils';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UnitsSubjectComponent } from '../tabs/units-subject/units-subject.component';

describe('TeacherSubjectDetailsComponent', () => {
  let component: TeacherSubjectDetailsComponent;
  let fixture: ComponentFixture<TeacherSubjectDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeacherSubjectDetailsComponent, UnitsSubjectComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        CoreModule,
        SharedModule,
        TestUtils.getLanguages(),
        BrowserAnimationsModule,
      ],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherSubjectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
