import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../core/base/base.component';
import { NGXLogger } from 'ngx-logger';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user';
import { MatDialog } from '@angular/material/dialog';
import { ModalUserComponent } from '../modal-user/modal-user.component';
import { GLOBAL_CONSTANTS } from '../../../core/utils/global-constants';
import { TranslateService } from '@ngx-translate/core';
import { merge, Observable, of } from 'rxjs';
import { SnackBarService } from '../../../core/services/snack-bar.service';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { map, tap } from 'rxjs/operators';
import { OptionsPage } from '../../../core/models/server/options-page';

const SUCCESS_ADD_USER = marker('user.add.successfully');

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent extends BaseComponent implements OnInit, AfterViewInit {
  elementsPage = [5, 10, 25, 100];
  displayedColumns = ['username', 'name', 'surname', 'role', 'actions'];
  users$: Observable<User[]> = of([]);
  totalElements = 0;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    protected logger: NGXLogger,
    protected translateService: TranslateService,
    private userService: UserService,
    public dialog: MatDialog,
    private snackBarService: SnackBarService,
  ) {
    super(logger, translateService);
    this.logger.debug(UserListComponent.name, 'constructor()', 'start');
    this.logger.debug(UserListComponent.name, 'constructor()', 'end');
  }

  ngOnInit(): void {
    this.logger.debug(UserListComponent.name, 'ngOnInit()', 'start');
    this.getUsers();
    this.logger.debug(UserListComponent.name, 'ngOnInit()', 'end');
  }

  ngAfterViewInit(): void {
    this.logger.debug(UserListComponent.name, 'ngAfterViewInit()', 'start');
    merge(
      this.paginator?.page,
      this.sort?.sortChange
    ).subscribe(
      () => this.getUsers()
    );
    this.logger.debug(UserListComponent.name, 'ngAfterViewInit()', 'end');
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
        this.subscriptions.push(
          this.translateService.get(SUCCESS_ADD_USER).subscribe(
            res => {
              this.snackBarService.showSuccess(res);
            }
          )
        );
      }
      this.logger.debug(UserListComponent.name, `openModal()`, 'end');
    });
  }

  private getUsers(): void {
    this.logger.debug(UserListComponent.name, 'getUsers()', 'start');
    const options = this.createOptionsSearch();
    this.users$ = this.userService.findAll(options).pipe(
      map((res) => {
        this.totalElements = res.totalElements;
        return res.content;
      }),
      tap(() => this.logger.debug(UserListComponent.name, 'getUsers()', 'end'))
    );
  }

  private createOptionsSearch(): OptionsPage {
    this.logger.debug(UserListComponent.name, 'createOptionsSearch()', 'start');
    const options = new OptionsPage();
    options.size = this.paginator?.pageSize ? this.paginator.pageSize : 5;
    options.page = this.paginator?.pageIndex ? this.paginator.pageIndex : 0;
    options.sort = this.sort?.active ? `${this.sort?.active},${this.sort?.direction}` : '';
    this.logger.debug(UserListComponent.name, 'createOptionsSearch()', 'end');
    return options;
  }
}
