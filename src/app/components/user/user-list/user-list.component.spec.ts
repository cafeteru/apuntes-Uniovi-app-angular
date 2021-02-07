import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialDesignModule } from '../../../shared/material-design/material-design.module';
import { TestUtils } from '../../../core/utils/test-utils';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UsersListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        UserListComponent
      ],
      imports: [
        LoggerTestingModule,
        HttpClientTestingModule,
        MaterialDesignModule,
        TestUtils.getLanguages(),
        BrowserAnimationsModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
