import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { NGXLogger } from 'ngx-logger';
import { Observable, Subscription } from 'rxjs';
import { FormGroupUtil } from '../utils/form-group-util';
import { BaseComponent } from './base.component';
import { TranslateService } from '@ngx-translate/core';
import { ErrorResponse } from '../models/server/error-response';

const ERROR_FORM_GROUP_TITLE = marker('error.form-group.title');
const ERROR_FORM_GROUP_TEXT = marker('error.form-group.text');
const ERROR_SERVICE_TITLE = marker('error.modal.service.title');
const ERROR_SERVICE_TEXT = marker('error.modal.service.text');
const BTN_ADD = marker('buttons.add');
const BTN_UPDATE = marker('buttons.update');

@Component({
  template: ''
})
/**
 * Basic component that has the common properties of modal components
 */
export abstract class BaseModalComponent<T, U> extends BaseComponent implements OnInit {
  formGroup: FormGroup;
  textSaveOrUpdate: string;
  protected subscriptions: Subscription[] = [];

  protected constructor(
    protected logger: NGXLogger,
    protected translateService: TranslateService,
    protected matDialogRef: MatDialogRef<U>,
    @Inject(MAT_DIALOG_DATA) public entity: T
  ) {
    super(logger, translateService);
    this.logger.debug(BaseModalComponent.name, 'constructor()', 'start');
    this.logger.debug(BaseModalComponent.name, 'constructor()', 'end');
  }

  /**
   * Get the title of the modal
   */
  abstract get title(): string;

  ngOnInit(): void {
    this.logger.debug(BaseModalComponent.name, 'ngOnInit()', 'start');
    this.formGroup = this.getFormGroup();
    this.textSaveOrUpdate = this.isSaveOrUpdate() ? BTN_UPDATE : BTN_ADD;
    this.logger.debug(BaseModalComponent.name, 'ngOnInit()', 'end');
  }

  /**
   * Close the modal and return the entity data
   *
   * @param entity Entity
   */
  closeModal(entity?: T): void {
    this.logger.debug(BaseModalComponent.name, `closeModal(entity : ${entity})`, 'start');
    this.matDialogRef.close(entity);
    this.logger.debug(BaseModalComponent.name, `closeModal(entity : ${entity})`, 'end');
  }

  /**
   * Checks the formGroup, returns the entered data and closes the modal
   */
  saveOrUpdate(): void {
    this.logger.debug(BaseModalComponent.name, `saveOrUpdate()`, 'start');
    if (FormGroupUtil.valid(this.formGroup)) {
      const data = this.getDataForm();
      this.subscriptions.push(
        this.saveOrUpdateService(data).subscribe(
          (res) => {
            this.closeModal(res);
          },
          (res: ErrorResponse) => {
            this.showAlertBack(ERROR_SERVICE_TITLE, ERROR_SERVICE_TEXT, 'error',
              res.error.error);
            this.logger.debug(BaseModalComponent.name, `saveOrUpdate()`, res);
          }
        )
      );
    } else {
      this.showAlert(ERROR_FORM_GROUP_TITLE, ERROR_FORM_GROUP_TEXT, 'error');
    }
    this.logger.debug(BaseModalComponent.name, `saveOrUpdate()`, 'end');
  }

  /**
   * The condition to know if it is save or update
   */
  abstract isSaveOrUpdate(): boolean;

  /**
   * Update the entity with the data from the formGroup
   */
  protected abstract getDataForm(): T;

  /**
   * Initialize the formGroup that the modal will use
   */
  protected abstract getFormGroup(): FormGroup;

  /**
   * Call the service to update or save the data
   *
   * @param data Data of the modal
   */
  protected abstract saveOrUpdateService(data: T): Observable<T>;
}
