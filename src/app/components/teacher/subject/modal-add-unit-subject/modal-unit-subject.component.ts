import { Component, Inject } from '@angular/core';
import { BaseModalComponent } from '../../../../core/base/base-modal.component';
import { UnitSubject } from '../../../../core/models/unit-subject';
import { TranslateService } from '@ngx-translate/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { UnitSubjectService } from '../../../../core/services/unit-subject.service';
import { UnitSubjectLimits } from '../../../../core/limits/unit-subject-limits';

const TITLE_ADD = marker('modal.unit-subject.title.add');
const TITLE_UPDATE = marker('modal.unit-subject.title.update');

@Component({
  selector: 'app-modal-unit-subject',
  templateUrl: './modal-unit-subject.component.html',
  styleUrls: ['./modal-unit-subject.component.scss']
})
export class ModalUnitSubjectComponent extends BaseModalComponent<UnitSubject, ModalUnitSubjectComponent> {

  constructor(
    protected matDialogRef: MatDialogRef<ModalUnitSubjectComponent>,
    protected translateService: TranslateService,
    @Inject(MAT_DIALOG_DATA) private unitSubject: UnitSubject,
    private unitSubjectService: UnitSubjectService
  ) {
    super(translateService, matDialogRef, unitSubject);
  }

  isSaveOrUpdate(): boolean {
    return Boolean(this.unitSubject.id);
  }

  protected getDataForm(): UnitSubject {
    this.unitSubject.name = this.formGroup.get('name').value;
    this.unitSubject.position = this.formGroup.get('position').value;
    return this.unitSubject;
  }

  protected getFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl(this.unitSubject.name, Validators.maxLength(UnitSubjectLimits.nameLength)),
      position: new FormControl(this.unitSubject.position, Validators.min(0))
    });
  }

  protected saveOrUpdateService(): Observable<UnitSubject> {
    return this.isSaveOrUpdate() ? this.unitSubjectService.update(this.unitSubject) :
      this.unitSubjectService.create(this.unitSubject);
  }

  get title(): string {
    return this.isSaveOrUpdate() ? TITLE_UPDATE : TITLE_ADD;
  }

}
