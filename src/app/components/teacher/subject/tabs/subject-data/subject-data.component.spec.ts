import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectDataComponent } from './subject-data.component';

describe('SubjectDataComponent', () => {
  let component: SubjectDataComponent;
  let fixture: ComponentFixture<SubjectDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
