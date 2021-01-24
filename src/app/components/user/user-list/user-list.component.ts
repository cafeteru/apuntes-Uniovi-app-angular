import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/base/base.component';
import { NGXLogger } from 'ngx-logger';
import { UserService } from '../../../core/services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../../core/models/user';
import { MatDialog } from '@angular/material/dialog';
import { ModalUserComponent } from '../modal-user/modal-user.component';
import { GLOBAL_CONSTANTS } from '../../../core/utils/global-constants';
import { TranslateService } from '@ngx-translate/core';

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
    protected translateService: TranslateService,
    private userService: UserService,
    public dialog: MatDialog
  ) {
    super(logger, translateService);
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

  openModal(): void {
    this.logger.debug(UserListComponent.name, `openModal()`, 'start');
    const data = new User();
    const config = {
      width: GLOBAL_CONSTANTS.maxWidthModal,
      maxHeight: GLOBAL_CONSTANTS.maxHeightModal,
      data
    };
    const dialogRef = this.dialog.open(ModalUserComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ngOnInit();
      }
    });
  };
}
