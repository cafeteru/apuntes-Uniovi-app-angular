import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/base/base.component';
import { NGXLogger } from 'ngx-logger';
import { UserService } from '../../../core/services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../../core/models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent extends BaseComponent implements OnInit {
  displayedColumns = ['username', 'name', 'surname', 'role', 'actions'];
  dataSource = new MatTableDataSource<User>();

  constructor(
    protected logger: NGXLogger,
    private userService: UserService
  ) {
    super(logger);
    this.logger.debug(UserListComponent.name, 'constructor()', 'start');
    this.logger.debug(UserListComponent.name, 'constructor()', 'end');
  }

  ngOnInit(): void {
    this.logger.debug(UserListComponent.name, 'ngOnInit()', 'start');
    this.subscriptions.push(
      this.userService.findAll().subscribe(
        res => {
          this.dataSource.data = res;
        }
      )
    );
    this.logger.debug(UserListComponent.name, 'ngOnInit()', 'end');
  }

}
