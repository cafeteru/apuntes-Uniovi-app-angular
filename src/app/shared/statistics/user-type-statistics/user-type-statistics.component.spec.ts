import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTypeStatisticsComponent } from './user-type-statistics.component';

describe('UserTypeStatisticsComponent', () => {
  let component: UserTypeStatisticsComponent;
  let fixture: ComponentFixture<UserTypeStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTypeStatisticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTypeStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
