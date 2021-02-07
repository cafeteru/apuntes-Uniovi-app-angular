import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/base/base.component';
import { NGXLogger } from 'ngx-logger';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
/**
 * Component to display details of a user
 */
export class UserDetailsComponent extends BaseComponent implements OnInit {

  constructor(
    protected logger: NGXLogger,
    protected translateService: TranslateService
  ) {
    super(logger, translateService);
    this.logger.debug(UserDetailsComponent.name, 'constructor()', 'start');
    this.logger.debug(UserDetailsComponent.name, 'constructor()', 'end');
  }

  ngOnInit(): void {
  }

}
