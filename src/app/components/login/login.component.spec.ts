import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from '../navbar/navbar.component';
import { TestUtils } from '../../core/utils/test-utils';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
        NavbarComponent
      ],
      imports: [
        LoggerTestingModule,
        RouterTestingModule,
        CoreModule,
        SharedModule,
        TestUtils.getLanguages(),
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.formGroup).not.toBeUndefined();
    const numControls = Object.keys(component.formGroup.controls).length;
    expect(numControls).toEqual(2);
    expect(component.disable).toBeFalse();
  });
});
