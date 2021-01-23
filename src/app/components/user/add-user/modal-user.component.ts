import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NGXLogger } from 'ngx-logger';
import { User } from '../../../core/models/user';
import { BaseModalComponent } from '../../../core/base/base-modal.component';
import { TranslateService } from '@ngx-translate/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { RoleType } from '../../../core/models/types/role-type';
import { Observable, of } from 'rxjs';
import { UserService } from '../../../core/services/user.service';

const TITLE_ADD = marker('modal.user.title.add');
const TITLE_UPDATE = marker('modal.user.title.update');

@Component({
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.scss']
})
export class ModalUserComponent extends BaseModalComponent<User, ModalUserComponent> implements OnInit {
  RoleType = Object.keys(RoleType);

  constructor(
    protected logger: NGXLogger,
    protected translateService: TranslateService,
    public matDialogRef: MatDialogRef<ModalUserComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User,
    private userService: UserService
  ) {
    super(logger, translateService, matDialogRef, user);
    this.logger.debug(BaseModalComponent.name, 'constructor()', 'start');
    this.logger.debug(BaseModalComponent.name, 'constructor()', 'end');
  }

  protected getDataForm(): User {
    this.logger.debug(BaseModalComponent.name, 'getFormGroup()', 'start');
    this.user.name = this.formGroup.get('name').value;
    this.user.surname = this.formGroup.get('surname').value;
    this.user.email = this.formGroup.get('email').value;
    this.user.phone = this.formGroup.get('phone').value;
    this.user.active = this.formGroup.get('active').value;
    this.user.img = this.formGroup.get('img').value;
    this.user.birthDate = this.formGroup.get('birthDate').value;
    this.user.username = this.formGroup.get('username').value;
    this.user.password = this.formGroup.get('password').value;
    this.user.role = this.formGroup.get('role').value;
    this.user.identificationType = this.formGroup.get('identificationType').value;
    this.user.numberIdentification = this.formGroup.get('numberIdentification').value;
    this.logger.debug(BaseModalComponent.name, 'getFormGroup()', 'start');
    return this.user;
  }

  protected getFormGroup(): FormGroup {
    this.logger.debug(BaseModalComponent.name, 'getFormGroup()', 'start');
    const formGroup = new FormGroup({
      name: new FormControl(this.user.name),
      surname: new FormControl(this.user.surname),
      email: new FormControl(this.user.email),
      phone: new FormControl(this.user.phone),
      active: new FormControl(this.user.active),
      img: new FormControl(this.user.name),
      birthDate: new FormControl(this.user.birthDate),
      username: new FormControl(this.user.username, [Validators.required]),
      password: new FormControl(this.user.password, [Validators.required]),
      role: new FormControl(this.user.role),
      identificationType: new FormControl(this.user.identificationType),
      numberIdentification: new FormControl(this.user.numberIdentification),
    });
    this.logger.debug(BaseModalComponent.name, 'getFormGroup()', 'end');
    return formGroup;
  }

  isSaveOrUpdate(): boolean {
    return Boolean(this.user.id);
  }

  get title(): string {
    return this.isSaveOrUpdate() ? TITLE_UPDATE : TITLE_ADD;
  }

  validNumberIdentification(): void {

  }

  protected saveOrUpdateService(data: User): Observable<User> {
    if (this.isSaveOrUpdate()) {
      return of();
    }
    return this.userService.save(this.user);
  }
}
