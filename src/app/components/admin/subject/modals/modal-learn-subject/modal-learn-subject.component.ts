import { Component, Inject, OnInit } from '@angular/core';
import { BaseModalComponent } from '../../../../../core/base/base-modal.component';
import { TranslateService } from '@ngx-translate/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../../../core/services/user.service';
import { Subject } from '../../../../../core/models/subject';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { RoleType } from '../../../../../core/models/enums/role-type';
import { map, switchMap } from 'rxjs/operators';
import { FormGroupUtil } from '../../../../../core/utils/form-group-util';
import { User } from '../../../../../core/models/user';
import { LearnSubjectService } from '../../../../../core/services/learn-subject.service';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { LearnSubject } from '../../../../../core/models/learn-subject';

const TITLE_ADD = marker('modal.learn-subject.title.add');
const TITLE_UPDATE = marker('modal.learn-subject.title.update');

export interface ModalLearnSubjectData {
  subject: Subject;
  isEmpty: boolean;
}

@Component({
  selector: 'app-modal-learn-subject',
  templateUrl: './modal-learn-subject.component.html',
  styleUrls: ['./modal-learn-subject.component.scss']
})
export class ModalLearnSubjectComponent extends BaseModalComponent<Subject, ModalLearnSubjectComponent>
  implements OnInit {
  students: User[];

  constructor(
    protected translateService: TranslateService,
    protected matDialogRef: MatDialogRef<ModalLearnSubjectComponent>,
    @Inject(MAT_DIALOG_DATA) private data: ModalLearnSubjectData,
    private userService: UserService,
    private learnSubjectService: LearnSubjectService
  ) {
    super(translateService, matDialogRef, data.subject);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.userService.findAllByRole(RoleType.ROLE_STUDENT).pipe(
      switchMap(students => {
        this.students = students;
        return this.isSaveOrUpdate() ? of([]) :
          this.learnSubjectService.findStudentsBySubjectId(this.data.subject.id).pipe(
            map(page => page.content)
          );
      })
    ).subscribe(
      students => FormGroupUtil.setValue(this.formGroup, 'students', students)
    );
  }

  isSaveOrUpdate(): boolean {
    return this.data.isEmpty;
  }

  protected getDataForm(): Subject {
    return undefined;
  }

  protected getFormGroup(): FormGroup {
    return new FormGroup({
      students: new FormControl()
    });
  }

  protected saveOrUpdateService(): Observable<Subject> {
    const selectedStudents: User[] = this.formGroup.get('students').value;
    const learnSubjects = selectedStudents ? selectedStudents.map(
      student => new LearnSubject(this.data.subject.id, student.id)) : [];
    return this.learnSubjectService.create(this.data.subject.id, learnSubjects).pipe(
      switchMap(() => of(this.data.subject))
    );
  }

  get title(): string {
    return this.isSaveOrUpdate() ? TITLE_ADD : TITLE_UPDATE;
  }

}
