import { Component, OnInit } from '@angular/core';
import { User } from '../../../../core/models/user';
import { ActivatedRoute } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../../../../core/base/base.component';

@Component({
  selector: 'app-user-personal-data',
  templateUrl: './user-personal-data.component.html',
  styleUrls: ['./user-personal-data.component.scss']
})
/**
 * Component to display personal information of a user
 */
export class UserPersonalDataComponent extends BaseComponent implements OnInit {
  user = new User();

  constructor(
    protected logger: NGXLogger,
    protected translateService: TranslateService,
    route: ActivatedRoute,
  ) {
    super(logger, translateService);
    this.logger.debug(UserPersonalDataComponent.name, 'constructor()', 'start');
    if (route.snapshot.data.user) {
      this.user = route.snapshot.data.user;
    }
    this.logger.debug(UserPersonalDataComponent.name, 'constructor()', 'end');
  }

  ngOnInit(): void {
  }

}
