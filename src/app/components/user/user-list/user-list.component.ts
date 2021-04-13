import { AfterViewInit, Component } from '@angular/core';

import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user';
import { MatDialog } from '@angular/material/dialog';
import { ModalUserComponent } from '../modal-user/modal-user.component';
import { GLOBAL_CONSTANTS } from '../../../core/utils/global-constants';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { SnackBarService } from '../../../core/services/snack-bar.service';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { map } from 'rxjs/operators';
import { OptionsPage } from '../../../core/models/server/options-page';
import { FormControl, FormGroup } from '@angular/forms';
import { RoleType } from '../../../core/models/enums/role-type';
import { IdentificationType } from '../../../core/models/enums/identification-type';
import { Address } from '../../../core/models/address';
import Swal from 'sweetalert2';
import { BaseTableComponent } from '../../../core/base/base-table.component';

const ANSWER_DELETE_USER = marker('user.delete.answer');
const BUTTON_CANCEL = marker('button.cancel');
const BUTTON_DELETE = marker('button.delete');
const ERROR_DELETE_USER = marker('user.delete.error');
const ERROR_DISABLE_USER = marker('user.disabled.error');
const ERROR_ENABLE_USER = marker('user.enabled.error');
const SUCCESS_ADD_USER = marker('user.add.successfully');
const SUCCESS_DELETE_USER = marker('user.delete.successfully');
const SUCCESS_DISABLE_USER = marker('user.disabled.successfully');
const SUCCESS_ENABLE_USER = marker('user.enabled.successfully');

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
/**
 * Component to display the list of users
 */
export class UserListComponent extends BaseTableComponent<User> implements AfterViewInit {
  roleType = Object.keys(RoleType);
  identificationType = Object.keys(IdentificationType);

  constructor(
    protected translateService: TranslateService,
    private userService: UserService,
    private dialog: MatDialog,
    private snackBarService: SnackBarService,
  ) {
    super(translateService);
  }

  /**
   * Filter the list of users
   */
  filter(): void {
    const namesFormGroups = Object.keys(this.formGroup.controls);
    namesFormGroups.forEach(name => {
      this.entityFilter[name] = this.formGroup.get(name).value;
    });
    const address = new Address();
    address.street = this.formGroup.get('street').value;
    address.city = this.formGroup.get('city').value;
    address.postalCode = this.formGroup.get('postalCode').value;
    this.entityFilter.address = address;
    this.loadData();
  }

  /**
   * Open a modal window to create a user
   */
  openModal(): void {
    const data = new User();
    const config = {
      width: GLOBAL_CONSTANTS.maxWidthModal,
      maxHeight: GLOBAL_CONSTANTS.maxHeightModal,
      data
    };
    const dialogRef = this.dialog.open(ModalUserComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData();
        this.subscriptions.push(
          this.translateService.get(SUCCESS_ADD_USER).subscribe(
            res => {
              this.snackBarService.showSuccess(res);
            }
          )
        );
      }
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
          this.loadData();
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
        this.loadData();
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

  protected initColumns(): String[] {
    return ['username', 'name', 'surname', 'role', 'actions'];
  }

  protected initFilter(): User {
    return new User();
  }

  protected loadData(options?: OptionsPage): Observable<User[]> {
    return this.userService.findAll(options, this.entityFilter).pipe(
      map((res) => {
        this.totalElements = res?.totalElements;
        return res?.content;
      })
    );
  }

  protected initFormGroup(): FormGroup {
    this.entityFilter = new User();
    return new FormGroup({
      surname: new FormControl(this.entityFilter.surname),
      name: new FormControl(this.entityFilter.name),
      email: new FormControl(this.entityFilter.email),
      phone: new FormControl(this.entityFilter.phone),
      birthDate: new FormControl(this.entityFilter.birthDate),
      role: new FormControl(this.entityFilter.role),
      username: new FormControl(this.entityFilter.username),
      identificationType: new FormControl(this.entityFilter.identificationType),
      numberIdentification: new FormControl(this.entityFilter.numberIdentification),
      street: new FormControl(this.entityFilter.address.street),
      city: new FormControl(this.entityFilter.address.city),
      postalCode: new FormControl(this.entityFilter.address.postalCode),
      active: new FormControl(this.entityFilter.active),
    });
  }
}
