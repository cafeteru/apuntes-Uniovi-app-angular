import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/base/base.component';
import { NGXLogger } from 'ngx-logger';
import { UserService } from '../../../core/services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../../core/models/user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent extends BaseComponent implements OnInit {
  displayedColumns = ['username', 'name', 'surname', 'role', 'actions'];
  dataSource = new MatTableDataSource<User>();

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
    this.subscriptions.push(
      this.userService.findAll().subscribe(
        res => {
          this.dataSource.data = res;
        }
      )
    );
    this.logger.debug(UsersListComponent.name, 'ngOnInit()', 'end');
  }

}
