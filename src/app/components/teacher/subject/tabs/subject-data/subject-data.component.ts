import { Component, OnInit } from '@angular/core';
import { Subject } from '../../../../../core/models/subject';
import { User } from '../../../../../core/models/user';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from '../../../../../core/services/snack-bar.service';
import { TeachSubjectService } from '../../../../../core/services/teach-subject.service';
import { BaseComponent } from '../../../../../core/base/base.component';

@Component({
  selector: 'app-subject-data',
  templateUrl: './subject-data.component.html',
  styleUrls: ['./subject-data.component.scss']
})
export class SubjectDataComponent extends BaseComponent implements OnInit {
  subject: Subject;
  teachers: User[] = [];

  constructor(
    protected translateService: TranslateService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBarService: SnackBarService,
    private teachSubjectService: TeachSubjectService
  ) {
    super(translateService);
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.route.snapshot.data.subject) {
      this.subject = this.route.snapshot.data.subject;
    }
    this.loadTeachers();
  }

  private loadTeachers(): void {
    if (this.subject) {
      this.subscriptions.push(
        this.teachSubjectService.findTeachersBySubjectId(this.subject.id)
          .subscribe(res => this.teachers = res)
      );
    }
  }

}
