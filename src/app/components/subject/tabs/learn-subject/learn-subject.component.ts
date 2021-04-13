import { Component, OnInit } from '@angular/core';
import { User } from '../../../../core/models/user';
import { BaseComponent } from '../../../../core/base/base.component';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from '../../../../core/services/snack-bar.service';
import { LearnSubjectService } from '../../../../core/services/learn-subject.service';
import { Subject } from '../../../../core/models/subject';

@Component({
  selector: 'app-learn-subject',
  templateUrl: './learn-subject.component.html',
  styleUrls: ['./learn-subject.component.scss']
})
export class LearnSubjectComponent extends BaseComponent implements OnInit {
  students: User[] = [];
  private subject: Subject;

  constructor(
    protected translateService: TranslateService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBarService: SnackBarService,
    private learnSubjectService: LearnSubjectService
  ) {
    super(translateService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    if (this.route.snapshot.data.subject) {
      this.subject = this.route.snapshot.data.subject;
      this.loadStudents();
    }
  }

  private loadStudents(): void {
    this.subscriptions.push(
      this.learnSubjectService.findTeachersBySubjectId(this.subject.id)
        .subscribe(
          res => this.students = res
        )
    );
  }
}
