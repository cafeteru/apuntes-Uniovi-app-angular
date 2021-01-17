import { Component } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private logger: NGXLogger,
  ) {
    this.logger.debug(AppComponent.name, 'constructor()', 'start');
    this.logger.debug(AppComponent.name, 'constructor()', 'end');
  }
}
