import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserActiveStatisticsComponent } from './user-active-statistics.component';

describe('UserActiveStatisticsComponent', () => {
  let component: UserActiveStatisticsComponent;
  let fixture: ComponentFixture<UserActiveStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserActiveStatisticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserActiveStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
