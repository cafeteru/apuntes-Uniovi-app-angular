import { Component, Inject } from '@angular/core';
import { BaseModalComponent } from '../../../core/base/base-modal.component';
import { Subject } from '../../../core/models/subject';
import { NGXLogger } from 'ngx-logger';
import { TranslateService } from '@ngx-translate/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SubjectService } from '../../../core/services/subject.service';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SubjectType } from '../../../core/models/enums/subject-type';

const TITLE_ADD = marker('modal.subject.title.add');
const TITLE_UPDATE = marker('modal.subject.title.update');

@Component({
  selector: 'app-modal-subject',
  templateUrl: './modal-subject.component.html',
  styleUrls: ['./modal-subject.component.scss']
})
export class ModalSubjectComponent extends BaseModalComponent<Subject, ModalSubjectComponent> {
  subjectTypes = Object.keys(SubjectType);

  constructor(
    protected logger: NGXLogger,
    protected translateService: TranslateService,
    protected matDialogRef: MatDialogRef<ModalSubjectComponent>,
    @Inject(MAT_DIALOG_DATA) private subject: Subject,
    private subjectService: SubjectService
  ) {
    super(logger, translateService, matDialogRef, subject);
    this.logger.debug(ModalSubjectComponent.name, 'constructor()', 'start');
    this.logger.debug(ModalSubjectComponent.name, 'constructor()', 'end');
  }

  get title(): string {
    return this.isSaveOrUpdate() ? TITLE_UPDATE : TITLE_ADD;
  }

  isSaveOrUpdate(): boolean {
    return Boolean(this.subject.id);
  }

  protected getDataForm(): Subject {
    this.logger.debug(ModalSubjectComponent.name, 'getFormGroup()', 'start');
    this.subject.name = this.formGroup.get('name').value;
    this.subject.subjectType = this.formGroup.get('subjectType').value;
    this.subject.active = this.formGroup.get('active').value;
    this.logger.debug(ModalSubjectComponent.name, 'getFormGroup()', 'start');
    return this.subject;
  }

  protected getFormGroup(): FormGroup {
    this.logger.debug(ModalSubjectComponent.name, 'getFormGroup()', 'start');
    const formGroup = new FormGroup({
      name: new FormControl(this.subject.name, Validators.required),
      subjectType: new FormControl(this.subject.subjectType, Validators.required),
      active: new FormControl(this.subject.active),
    });
    this.logger.debug(ModalSubjectComponent.name, 'getFormGroup()', 'end');
    return formGroup;
  }

  protected saveOrUpdateService(): Observable<Subject> {
    this.logger.debug(ModalSubjectComponent.name, 'saveOrUpdateService()', 'start');
    this.logger.debug(ModalSubjectComponent.name, 'saveOrUpdateService()', 'end');
    return this.isSaveOrUpdate() ? this.subjectService.create(this.subject) :
      this.subjectService.create(this.subject);
  }
}
