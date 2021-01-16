import {TestBed, waitForAsync} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {LoggerTestingModule} from 'ngx-logger/testing';
import {CoreModule} from './core/core.module';
import {FooterComponent} from './shared/footer/footer.component';
import {SharedModule} from './shared/shared.module';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        LoggerTestingModule,
        CoreModule,
        SharedModule
      ],
      declarations: [
        AppComponent,
        FooterComponent
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
