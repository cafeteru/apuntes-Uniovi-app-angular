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
import { FormControl, FormGroup } from '@angular/forms';
import { RoleType } from '../../../core/models/enums/role-type';
import { IdentificationType } from '../../../core/models/enums/identification-type';
import { Address } from '../../../core/models/address';
import Swal from 'sweetalert2';

const SUCCESS_ADD_USER = marker('user.add.successfully');
const SUCCESS_DISABLE_USER = marker('user.disabled.successfully');
const ERROR_DISABLE_USER = marker('user.disabled.error');
const SUCCESS_ENABLE_USER = marker('user.enabled.successfully');
const ERROR_ENABLE_USER = marker('user.enabled.error');
const SUCCESS_DELETE_USER = marker('user.delete.successfully');
const ERROR_DELETE_USER = marker('user.delete.error');
const ANSWER_DELETE_USER = marker('user.delete.answer');
const BUTTON_DELETE = marker('button.delete');
const BUTTON_CANCEL = marker('button.cancel');

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
/**
 * Component to display the list of users
 */
export class UserListComponent extends BaseComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  elementsPage = [5, 10, 25, 100];
  displayedColumns = ['username', 'name', 'surname', 'role', 'actions'];
  users$: Observable<User[]> = of([]);
  totalElements = 0;
  formGroup: FormGroup;
  roleType = Object.keys(RoleType);
  identificationType = Object.keys(IdentificationType);
  private userFilter = new User();

  constructor(
    protected logger: NGXLogger,
    protected translateService: TranslateService,
    private userService: UserService,
    private dialog: MatDialog,
    private snackBarService: SnackBarService,
  ) {
    super(logger, translateService);
    this.logger.debug(UserListComponent.name, 'constructor()', 'start');
    this.logger.debug(UserListComponent.name, 'constructor()', 'end');
  }

  ngOnInit(): void {
    this.logger.debug(UserListComponent.name, 'ngOnInit()', 'start');
    this.cleanFilters();
    this.logger.debug(UserListComponent.name, 'ngOnInit()', 'end');
  }

  /**
   * Filter the list of users
   */
  filter(): void {
    this.logger.debug(UserListComponent.name, 'filter()', 'start');
    const namesFormGroups = Object.keys(this.formGroup.controls);
    namesFormGroups.forEach(name => {
      this.userFilter[name] = this.formGroup.get(name).value;
    });
    const address = new Address();
    address.street = this.formGroup.get('street').value;
    address.city = this.formGroup.get('city').value;
    address.postalCode = this.formGroup.get('postalCode').value;
    this.userFilter.address = address;
    this.getUsers();
    this.logger.debug(UserListComponent.name, 'filter()', 'end');
  }

  /**
   * Clean al filters and reload list
   */
  cleanFilters(): void {
    this.logger.debug(UserListComponent.name, 'cleanFilters()', 'start');
    this.userFilter = new User();
    this.formGroup = new FormGroup({
      surname: new FormControl(this.userFilter.surname),
      name: new FormControl(this.userFilter.name),
      email: new FormControl(this.userFilter.email),
      phone: new FormControl(this.userFilter.phone),
      birthDate: new FormControl(this.userFilter.birthDate),
      role: new FormControl(this.userFilter.role),
      username: new FormControl(this.userFilter.username),
      identificationType: new FormControl(this.userFilter.identificationType),
      numberIdentification: new FormControl(this.userFilter.numberIdentification),
      street: new FormControl(this.userFilter.address.street),
      city: new FormControl(this.userFilter.address.city),
      postalCode: new FormControl(this.userFilter.address.postalCode),
      active: new FormControl(this.userFilter.active),
    });
    this.getUsers();
    this.logger.debug(UserListComponent.name, 'cleanFilters()', 'end');
  }

  ngAfterViewInit(): void {
    this.logger.debug(UserListComponent.name, 'ngAfterViewInit()', 'start');
    this.subscriptions.push(
      merge(
        this.paginator.page,
        this.sort.sortChange
      ).subscribe(
        () => this.getUsers()
      )
    );
    this.logger.debug(UserListComponent.name, 'ngAfterViewInit()', 'end');
  }

  /**
   * Open a modal window to create a user
   */
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
        this.getUsers();
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

  /**
   * Change user´s active
   *
   * @param id User´s id
   * @param value Next value to user´s active
   */
  disable(id: number, value: boolean): void {
    this.subscriptions.push(
      this.userService.disable(id, value).subscribe(
        () => {
          this.getUsers();
          const message = value ? SUCCESS_ENABLE_USER : SUCCESS_DISABLE_USER;
          this.subscriptions.push(
            this.translateService.get(message).subscribe(
              res => {
                this.snackBarService.showSuccess(res);
              }
            )
          );
        },
        () => {
          const title = value ? ERROR_ENABLE_USER : ERROR_DISABLE_USER;
          this.showAlert('error', title);
        }
      )
    );
  }

  /**
   * Delete a user
   *
   * @param id User´s id
   */
  askDelete(id: number): void {
    const subscription = this.translateService.get([
      ANSWER_DELETE_USER,
      BUTTON_DELETE,
      BUTTON_CANCEL
    ]).subscribe(
      res => {
        Swal.fire({
          title: res[ANSWER_DELETE_USER],
          showDenyButton: true,
          confirmButtonText: res[BUTTON_DELETE],
          denyButtonText: res[BUTTON_CANCEL],
        }).then((result) => {
          if (result.isConfirmed) {
            this.delete(id);
          }
        });
      }
    );
    this.subscriptions.push(subscription);
  }

  private delete(id: number): void {
    const subscription = this.userService.delete(id).subscribe(
      () => {
        this.getUsers();
        this.subscriptions.push(
          this.translateService.get(SUCCESS_DELETE_USER).subscribe(
            res => {
              this.snackBarService.showSuccess(res);
            }
          )
        );
      },
      () => {
        this.showAlert('error', ERROR_DELETE_USER);
      }
    );
    this.subscriptions.push(subscription);
  }

  private getUsers(): void {
    this.logger.debug(UserListComponent.name, 'getUsers()', 'start');
    const options = new OptionsPage();
    options.createOptionsSearch(this.paginator, this.sort);
    this.users$ = this.userService.findAll(options, this.userFilter).pipe(
      map((res) => {
        this.totalElements = res?.totalElements;
        return res?.content;
      }),
      tap(() => this.logger.debug(UserListComponent.name, 'getUsers()', 'end'))
    );
  }
}
