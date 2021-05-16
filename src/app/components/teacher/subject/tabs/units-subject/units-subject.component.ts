import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../../core/base/base.component';
import { Subject } from '../../../../../core/models/subject';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { UnitSubjectService } from '../../../../../core/services/unit-subject.service';
import { UnitSubject } from '../../../../../core/models/unit-subject';

@Component({
  selector: 'app-units-subject',
  templateUrl: './units-subject.component.html',
  styleUrls: ['./units-subject.component.scss']
})
export class UnitsSubjectComponent extends BaseComponent implements OnInit {
  subject: Subject;
  unitSubjects: UnitSubject[];

  constructor(
    protected translateService: TranslateService,
    private route: ActivatedRoute,
    private unitSubjectService: UnitSubjectService
  ) {
    super(translateService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    if (this.route.snapshot.data.subject) {
      this.subject = this.route.snapshot.data.subject;
    }
    this.loadUnits();
  }

  private loadUnits(): void {
    if (this.subject) {
      this.subscriptions.push(
        this.unitSubjectService.findBySubjectId(this.subject.id)
          .subscribe(res => this.unitSubjects = res.content)
      );
    }
  }
}
