import { Component, Inject, OnInit } from '@angular/core';
import { BaseModalComponent } from '../../../core/base/base-modal.component';
import { Subject } from '../../../core/models/subject';
import { TranslateService } from '@ngx-translate/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SubjectService } from '../../../core/services/subject.service';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { SubjectType } from '../../../core/models/enums/subject-type';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user';
import { RoleType } from '../../../core/models/enums/role-type';
import { TeachSubject } from '../../../core/models/teach-subject';
import { map, switchMap } from 'rxjs/operators';
import { TeachSubjectService } from '../../../core/services/teach-subject.service';
import { SubjectLimits } from '../../../core/limits/subject-limits';
import { FormGroupUtil } from '../../../core/utils/form-group-util';

const TITLE_ADD = marker('modal.subject.title.add');
const TITLE_UPDATE = marker('modal.subject.title.update');

@Component({
  selector: 'app-modal-subject',
  templateUrl: './modal-subject.component.html',
  styleUrls: ['./modal-subject.component.scss']
})
export class ModalSubjectComponent extends BaseModalComponent<Subject, ModalSubjectComponent>
  implements OnInit {
  subjectTypes = Object.keys(SubjectType);
  teachers: User[] = [];

  constructor(
    protected translateService: TranslateService,
    protected matDialogRef: MatDialogRef<ModalSubjectComponent>,
    @Inject(MAT_DIALOG_DATA) private subject: Subject,
    private subjectService: SubjectService,
    private userService: UserService,
    private teachSubjectService: TeachSubjectService
  ) {
    super(translateService, matDialogRef, subject);
  }

  ngOnInit() {
    super.ngOnInit();
    this.userService.findAllByRole(RoleType.TEACHER).pipe(
      switchMap(teachers => {
        this.teachers = teachers;
        return this.isSaveOrUpdate() ?
          this.teachSubjectService.findTeachersBySubjectId(this.subject.id) : of([]);
      })
    ).subscribe(
      teachers => FormGroupUtil.setValue(this.formGroup, 'teachers', teachers)
    );
  }

  get title(): string {
    return this.isSaveOrUpdate() ? TITLE_UPDATE : TITLE_ADD;
  }

  isSaveOrUpdate(): boolean {
    return Boolean(this.subject.id);
  }

  protected getDataForm(): Subject {
    this.subject.name = this.formGroup.get('name').value;
    this.subject.subjectType = this.formGroup.get('subjectType').value;
    this.subject.active = this.formGroup.get('active').value;
    return this.subject;
  }

  protected getFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl(this.subject.name, [
        Validators.required,
        Validators.maxLength(SubjectLimits.NAME)
      ]),
      subjectType: new FormControl(this.subject.subjectType, Validators.required),
      active: new FormControl(this.subject.active),
      teachers: new FormControl()
    });
  }

  protected saveOrUpdateService(): Observable<Subject> {
    let id: number = undefined;
    const subject$ = this.isSaveOrUpdate() ? this.subjectService.update(this.subject)
      : this.subjectService.create(this.subject);
    return subject$.pipe(
      map((subject) => {
        id = subject.id;
        const teachers: User[] = this.formGroup.get('teachers').value;
        return teachers ? teachers.map(teacher => new TeachSubject(subject.id, teacher.id)) : [];
      }),
      switchMap((teachSubjects) =>
        this.teachSubjectService.create(id, teachSubjects).pipe(
          switchMap(() => of(this.subject)))
      ),
    );
  }
}
