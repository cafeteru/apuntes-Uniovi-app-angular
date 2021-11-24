import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectDetailsComponent } from './subject-details.component';
import { CoreModule } from '../../../../core/core.module';
import { SharedModule } from '../../../../shared/shared.module';
import { TestUtils } from '../../../../core/utils/test-utils';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SubjectDataComponent } from '../tabs/subject-data/subject-data.component';
import { LearnSubjectComponent } from '../tabs/learn-subject/learn-subject.component';

describe('SubjectDetailsComponent', () => {
  let component: SubjectDetailsComponent;
  let fixture: ComponentFixture<SubjectDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SubjectDetailsComponent,
        SubjectDataComponent,
        LearnSubjectComponent,
      ],
      imports: [
        CoreModule,
        SharedModule,
        TestUtils.getLanguages(),
        BrowserAnimationsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
