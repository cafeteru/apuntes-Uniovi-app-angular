import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUnitSubjectComponent } from './modal-unit-subject.component';

describe('ModalAddUnitSubjectComponent', () => {
  let component: ModalUnitSubjectComponent;
  let fixture: ComponentFixture<ModalUnitSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUnitSubjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUnitSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
