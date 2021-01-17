import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/base/base.component';
import { NGXLogger } from 'ngx-logger';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent extends BaseComponent implements OnInit {

  constructor(
    protected logger: NGXLogger,
    private userService: UserService
  ) {
    super(logger);
    this.logger.debug(UsersListComponent.name, 'constructor()', 'start');
    this.logger.debug(UsersListComponent.name, 'constructor()', 'end');
  }

  ngOnInit(): void {
    this.logger.debug(UsersListComponent.name, 'ngOnInit()', 'start');
    this.userService.findAll().subscribe(
      res => {
        console.warn(res);
      }
    );
    this.logger.debug(UsersListComponent.name, 'ngOnInit()', 'end');
  }

}
