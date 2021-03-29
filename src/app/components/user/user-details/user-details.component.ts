import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/base/base.component';

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
    protected translateService: TranslateService
  ) {
    super(translateService);
  }

  ngOnInit(): void {
  }

}
