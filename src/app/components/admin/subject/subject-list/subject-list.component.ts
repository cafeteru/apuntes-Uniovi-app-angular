import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from '../../../../core/services/snack-bar.service';
import { SubjectService } from '../../../../core/services/subject.service';
import { OptionsPage } from '../../../../core/models/server/options-page';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from '../../../../core/models/subject';
import { SubjectType } from '../../../../core/models/enums/subject-type';
import { GLOBAL_CONSTANTS } from '../../../../core/utils/global-constants';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { ModalSubjectComponent } from '../modals/modal-subject/modal-subject.component';
import Swal from 'sweetalert2';
import { BaseTableComponent } from '../../../../core/base/base-table.component';
import { Page } from '../../../../core/models/server/page';

const ANSWER_DELETE_SUBJECT = marker('subject.delete.answer');
const BUTTON_CANCEL = marker('button.cancel');
const BUTTON_DELETE = marker('button.delete');
const ERROR_DELETE_SUBJECT = marker('subject.delete.error');
const ERROR_DISABLE_SUBJECT = marker('subject.disabled.error');
const ERROR_ENABLE_SUBJECT = marker('subject.enabled.error');
const SUCCESS_ADD_SUBJECT = marker('subject.add.successfully');
const SUCCESS_DELETE_SUBJECT = marker('subject.delete.successfully');
const SUCCESS_DISABLE_SUBJECT = marker('subject.disabled.successfully');
const SUCCESS_ENABLE_SUBJECT = marker('subject.enabled.successfully');

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss'],
})
export class SubjectListComponent extends BaseTableComponent<Subject> {
  subjectTypes = Object.keys(SubjectType);

  constructor(
    protected translateService: TranslateService,
    private subjectService: SubjectService,
    private dialog: MatDialog,
    private snackBarService: SnackBarService
  ) {
    super(translateService);
  }

  /**
   * Open a modal window to create a Subject
   */
  openModal(): void {
    const data = new Subject();
    const config = {
      width: GLOBAL_CONSTANTS.maxWidthModal,
      maxHeight: GLOBAL_CONSTANTS.maxHeightModal,
      data,
    };
    const dialogRef = this.dialog.open(ModalSubjectComponent, config);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cleanFilters();
        this.subscriptions.push(
          this.translateService.get(SUCCESS_ADD_SUBJECT).subscribe((res) => {
            this.snackBarService.showSuccess(res);
          })
        );
      }
    });
  }

  disable(id: number, value: boolean): void {
    this.subscriptions.push(
      this.subjectService.disable(id, value).subscribe(
        () => {
          this.cleanFilters();
          const message = value
            ? SUCCESS_ENABLE_SUBJECT
            : SUCCESS_DISABLE_SUBJECT;
          this.subscriptions.push(
            this.translateService.get(message).subscribe((res) => {
              this.snackBarService.showSuccess(res);
            })
          );
        },
        () => {
          const title = value ? ERROR_ENABLE_SUBJECT : ERROR_DISABLE_SUBJECT;
          this.showAlert('error', title);
        }
      )
    );
  }

  askDelete(id: number): void {
    const subscription = this.translateService
      .get([ANSWER_DELETE_SUBJECT, BUTTON_DELETE, BUTTON_CANCEL])
      .subscribe((res) => {
        Swal.fire({
          title: res[ANSWER_DELETE_SUBJECT],
          showDenyButton: true,
          confirmButtonText: res[BUTTON_DELETE],
          denyButtonText: res[BUTTON_CANCEL],
        }).then((result) => {
          if (result.isConfirmed) {
            this.delete(id);
          }
        });
      });
    this.subscriptions.push(subscription);
  }

  protected initColumns(): string[] {
    return ['name', 'subjectType', 'actions'];
  }

  protected getData(options?: OptionsPage): Observable<Page<Subject>> {
    return this.subjectService.findAll(options, this.entityFilter);
  }

  protected initFilter(): Subject {
    return new Subject();
  }

  protected configFilter(): Subject {
    const namesFormGroups = Object.keys(this.formGroup.controls);
    namesFormGroups.forEach((name) => {
      this.entityFilter[name] = this.formGroup.get(name).value;
    });
    return this.entityFilter;
  }

  protected initFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl(this.entityFilter.name),
      subjectType: new FormControl(this.entityFilter.subjectType),
      active: new FormControl(this.entityFilter.active),
    });
  }

  private delete(id: number): void {
    const subscription = this.subjectService.delete(id).subscribe(
      () => {
        this.cleanFilters();
        this.subscriptions.push(
          this.translateService.get(SUCCESS_DELETE_SUBJECT).subscribe((res) => {
            this.snackBarService.showSuccess(res);
          })
        );
      },
      () => {
        this.showAlert('error', ERROR_DELETE_SUBJECT);
      }
    );
    this.subscriptions.push(subscription);
  }
}
