import { Component, Inject } from '@angular/core';
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

const TITLE_ADD = marker('modal.subject.title.add');
const TITLE_UPDATE = marker('modal.subject.title.update');

@Component({
  selector: 'app-modal-subject',
  templateUrl: './modal-subject.component.html',
  styleUrls: ['./modal-subject.component.scss']
})
export class ModalSubjectComponent extends BaseModalComponent<Subject, ModalSubjectComponent> {
  subjectTypes = Object.keys(SubjectType);
  teachers$: Observable<User[]>;

  constructor(
    protected translateService: TranslateService,
    protected matDialogRef: MatDialogRef<ModalSubjectComponent>,
    @Inject(MAT_DIALOG_DATA) private subject: Subject,
    private subjectService: SubjectService,
    private userService: UserService,
    private teachSubjectService: TeachSubjectService
  ) {
    super(translateService, matDialogRef, subject);
    this.teachers$ = this.userService.findAllByRole(RoleType.TEACHER);
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
      name: new FormControl(this.subject.name, Validators.required),
      subjectType: new FormControl(this.subject.subjectType, Validators.required),
      active: new FormControl(this.subject.active),
      teachers: new FormControl()
    });
  }

  protected saveOrUpdateService(): Observable<Subject> {
    const observable$ = this.isSaveOrUpdate() ? this.subjectService.update(this.subject)
      : this.subjectService.create(this.subject);
    return observable$.pipe(
      map((subject) => {
        const teachers: User[] = this.formGroup.get('teachers').value;
        return teachers.map(teacher => new TeachSubject(subject.id, teacher.id));
      }),
      switchMap((teachSubjects) =>
        this.isSaveOrUpdate() ? of(this.subject) : this.teachSubjectService.create(teachSubjects).pipe(
          map(() => this.subject)
        )
      ),
    );
  }
}
