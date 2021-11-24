import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectStudentsComponent } from './subject-students.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '../../../../../core/core.module';
import { SharedModule } from '../../../../../shared/shared.module';
import { TestUtils } from '../../../../../core/utils/test-utils';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SubjectStudentsComponent', () => {
  let component: SubjectStudentsComponent;
  let fixture: ComponentFixture<SubjectStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubjectStudentsComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        CoreModule,
        SharedModule,
        TestUtils.getLanguages(),
        BrowserAnimationsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
