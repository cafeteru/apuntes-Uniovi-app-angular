import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherSubjectDetailsComponent } from './teacher-subject-details.component';

describe('TeacherSubjectDetailsComponent', () => {
  let component: TeacherSubjectDetailsComponent;
  let fixture: ComponentFixture<TeacherSubjectDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherSubjectDetailsComponent ]
    })
    .compileComponents();
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
