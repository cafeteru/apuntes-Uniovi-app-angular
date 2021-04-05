import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
import { UserLimits } from '../../../core/limits/user-limits';
import { AddressLimits } from '../../../core/limits/address-limits';

const TITLE_ADD = marker('modal.user.title.add');
const TITLE_UPDATE = marker('modal.user.title.update');
const ERROR_TITLE_IMG = marker('error.user.invalid.img');
const ERROR_TEXT_IMG = marker('error.user.invalid.img.text');

@Component({
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.scss']
})
export class ModalUserComponent extends BaseModalComponent<User, ModalUserComponent> {
  roleType = Object.keys(RoleType);
  identificationType = Object.keys(IdentificationType);

  constructor(
    protected translateService: TranslateService,
    protected matDialogRef: MatDialogRef<ModalUserComponent>,
    @Inject(MAT_DIALOG_DATA) private user: User,
    private userService: UserService
  ) {
    super(translateService, matDialogRef, user);
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
        this.showAlert('error', ERROR_TITLE_IMG, ERROR_TEXT_IMG);
      }
    };
    reader.readAsDataURL(file);
  }

  protected getDataForm(): User {
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
    return this.user;
  }

  protected getFormGroup(): FormGroup {
    return new FormGroup({
        surname: new FormControl(this.user.surname,
          Validators.maxLength(UserLimits.SURNAME)),
        name: new FormControl(this.user.name,
          Validators.maxLength(UserLimits.NAME)),
        email: new FormControl(this.user.email,
          Validators.maxLength(UserLimits.EMAIL)),
        phone: new FormControl(this.user.phone,
          PhoneValidator.isValid()),
        birthDate: new FormControl(this.user.birthDate,
          DateValidator.maxDate(new Date())),
        role: new FormControl(this.user.role, Validators.required),
        username: new FormControl(this.user.username, [
          Validators.required,
          Validators.maxLength(UserLimits.USERNAME)
        ]),
        password: new FormControl(this.user.password,
          Validators.maxLength(UserLimits.PASSWORD)),
        identificationType: new FormControl(this.user.identificationType),
        numberIdentification: new FormControl(this.user.numberIdentification),
        street: new FormControl(this.user.address.street,
          Validators.maxLength(AddressLimits.STREET)),
        city: new FormControl(this.user.address.city,
          Validators.maxLength(AddressLimits.CITY)),
        postalCode: new FormControl(this.user.address.postalCode,
          Validators.maxLength(AddressLimits.POSTAL_CODE)),
        img: new FormControl(this.user.img,
          Validators.maxLength(UserLimits.IMG)),
        active: new FormControl(this.user.active),
      },
      {
        validators: NumberIdentificationValidator.isValid()
      });
  }

  protected saveOrUpdateService(): Observable<User> {
    return this.isSaveOrUpdate() ? this.userService.update(this.user) :
      this.userService.create(this.user);
  }
}
