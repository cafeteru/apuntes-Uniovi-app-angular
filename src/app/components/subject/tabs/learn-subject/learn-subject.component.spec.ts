import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnSubjectComponent } from './learn-subject.component';

describe('LearnSubjectComponent', () => {
  let component: LearnSubjectComponent;
  let fixture: ComponentFixture<LearnSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnSubjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
