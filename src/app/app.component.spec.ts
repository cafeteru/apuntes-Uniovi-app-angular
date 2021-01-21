import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { NavbarComponent } from './components/navbar/navbar.component';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        LoggerTestingModule,
        CoreModule,
        SharedModule,
        TranslateModule.forRoot(),
      ],
      declarations: [
        AppComponent,
        NavbarComponent
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
