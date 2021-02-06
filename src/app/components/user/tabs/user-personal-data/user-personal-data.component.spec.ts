import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPersonalDataComponent } from './user-personal-data.component';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from '../../../../shared/shared.module';
import { TestUtils } from '../../../../core/utils/test-utils';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserPersonalDataComponent', () => {
  let component: UserPersonalDataComponent;
  let fixture: ComponentFixture<UserPersonalDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserPersonalDataComponent],
      imports: [
        LoggerTestingModule,
        HttpClientTestingModule,
        RouterTestingModule,
        SharedModule,
        TestUtils.getLanguages(),
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPersonalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
