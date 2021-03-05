import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NGXLogger } from 'ngx-logger';
import { User } from '../../../core/models/user';
import { BaseModalComponent } from '../../../core/base/base-modal.component';
import { TranslateService } from '@ngx-translate/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { RoleType } from '../../../core/models/enums/role-type';
import { Observable } from 'rxjs';
import { UserService } from '../../../core/services/user.service';
import { IdentificationType } from '../../../core/models/enums/identification-type';
import { PhoneValidator } from '../../../core/validators/phone-validator';
import { DateValidator } from '../../../core/validators/date-validator';
import { NumberIdentificationValidator } from '../../../core/validators/number-identification-validator';

const TITLE_ADD = marker('modal.user.title.add');
const TITLE_UPDATE = marker('modal.user.title.update');
const ERROR_TITLE_IMG = marker('error.user.invalid.img');
const ERROR_TEXT_IMG = marker('error.user.invalid.img.text');

@Component({
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.scss']
})
export class ModalUserComponent extends BaseModalComponent<User, ModalUserComponent> implements OnInit {
  roleType = Object.keys(RoleType);
  identificationType = Object.keys(IdentificationType);

  constructor(
    protected logger: NGXLogger,
    protected translateService: TranslateService,
    protected matDialogRef: MatDialogRef<ModalUserComponent>,
    @Inject(MAT_DIALOG_DATA) private user: User,
    private userService: UserService
  ) {
    super(logger, translateService, matDialogRef, user);
    this.logger.debug(BaseModalComponent.name, 'constructor()', 'start');
    this.logger.debug(BaseModalComponent.name, 'constructor()', 'end');
  }

  get title(): string {
    return this.isSaveOrUpdate() ? TITLE_UPDATE : TITLE_ADD;
  }

  isSaveOrUpdate(): boolean {
    return Boolean(this.user.id);
  }

  /**
   * Indicate if identificationType is required
   */
  isRequiredIdentificationType(): boolean {
    return Boolean(this.formGroup.get('numberIdentification').value);
  }

  /**
   * Read and check a photo
   *
   * @param $event File with the photo
   */
  readPhoto($event: Event): void {
    const target = $event.target as HTMLInputElement;
    const files = target.files as FileList;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (file.type.includes('image')) {
        this.formGroup.get('img').setValue(reader.result);
      } else {
        this.showAlert(ERROR_TITLE_IMG, ERROR_TEXT_IMG, 'error');
      }
    };
    reader.readAsDataURL(file);
  }

  protected getDataForm(): User {
    this.logger.debug(BaseModalComponent.name, 'getFormGroup()', 'start');
    this.user.name = this.formGroup.get('name').value;
    this.user.surname = this.formGroup.get('surname').value;
    this.user.email = this.formGroup.get('email').value;
    this.user.phone = this.formGroup.get('phone').value;
    this.user.active = this.formGroup.get('active').value;
    const img = this.formGroup.get('img').value;
    this.user.img = img ? img : this.user.img;
    this.user.birthDate = this.formGroup.get('birthDate').value;
    this.user.username = this.formGroup.get('username').value;
    this.user.password = this.formGroup.get('password').value;
    this.user.role = this.formGroup.get('role').value;
    this.user.identificationType = this.formGroup.get('identificationType').value;
    this.user.numberIdentification = this.formGroup.get('numberIdentification').value;
    this.user.address.street = this.formGroup.get('street').value;
    this.user.address.city = this.formGroup.get('city').value;
    this.user.address.postalCode = this.formGroup.get('postalCode').value;
    this.logger.debug(BaseModalComponent.name, 'getFormGroup()', 'start');
    return this.user;
  }

  protected getFormGroup(): FormGroup {
    this.logger.debug(BaseModalComponent.name, 'getFormGroup()', 'start');
    const formGroup = new FormGroup({
        surname: new FormControl(this.user.surname),
        name: new FormControl(this.user.name),
        email: new FormControl(this.user.email),
        phone: new FormControl(this.user.phone, PhoneValidator.isValid()),
        birthDate: new FormControl(this.user.birthDate, DateValidator.maxDate(new Date())),
        role: new FormControl(this.user.role, Validators.required),
        username: new FormControl(this.user.username, Validators.required),
        password: new FormControl(this.user.password),
        identificationType: new FormControl(this.user.identificationType),
        numberIdentification: new FormControl(this.user.numberIdentification),
        street: new FormControl(this.user.address.street),
        city: new FormControl(this.user.address.city),
        postalCode: new FormControl(this.user.address.postalCode),
        img: new FormControl(this.user.name),
        active: new FormControl(this.user.active),
      },
      {
        validators: NumberIdentificationValidator.isValid()
      });
    this.logger.debug(BaseModalComponent.name, 'getFormGroup()', 'end');
    return formGroup;
  }

  protected saveOrUpdateService(data: User): Observable<User> {
    if (this.isSaveOrUpdate()) {
      return this.userService.update(this.user);
    }
    return this.userService.create(this.user);
  }
}
