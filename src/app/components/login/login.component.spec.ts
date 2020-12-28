import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {LoggerTestingModule} from 'ngx-logger/testing';
import {CoreModule} from '../../core/core.module';
import {MaterialDesignModule} from '../../shared/material-design/material-design.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
      ],
      imports: [
        LoggerTestingModule,
        CoreModule,
        BrowserAnimationsModule,
        MaterialDesignModule,
        ReactiveFormsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
