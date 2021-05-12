import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitsSubjectComponent } from './units-subject.component';

describe('UnitsSubjectComponent', () => {
  let component: UnitsSubjectComponent;
  let fixture: ComponentFixture<UnitsSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitsSubjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitsSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
