import { NgModule } from '@angular/core';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    LoggerModule.forRoot({
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR,
      disableConsoleLogging: false
    }),
  ],
  exports: [
    LoggerModule
  ]
})
export class CoreModule {
}
