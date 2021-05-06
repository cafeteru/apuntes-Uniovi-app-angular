import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUnitSubjectComponent } from './list-unit-subject.component';

describe('ListUnitSubjectComponent', () => {
  let component: ListUnitSubjectComponent;
  let fixture: ComponentFixture<ListUnitSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUnitSubjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUnitSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
