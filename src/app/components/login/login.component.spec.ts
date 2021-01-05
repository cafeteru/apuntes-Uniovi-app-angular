import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {LoggerTestingModule} from 'ngx-logger/testing';
import {CoreModule} from '../../core/core.module';
import {SharedModule} from '../../shared/shared.module';
import {RouterTestingModule} from '@angular/router/testing';

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
        RouterTestingModule,
        CoreModule,
        SharedModule
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
