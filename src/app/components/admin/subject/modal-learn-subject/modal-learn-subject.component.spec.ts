import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLearnSubjectComponent } from './modal-learn-subject.component';

describe('ModalLearnSubjectComponent', () => {
  let component: ModalLearnSubjectComponent;
  let fixture: ComponentFixture<ModalLearnSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalLearnSubjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalLearnSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
