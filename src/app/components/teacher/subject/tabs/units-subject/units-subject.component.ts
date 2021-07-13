import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../../core/base/base.component';
import { Subject } from '../../../../../core/models/subject';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { UnitSubjectService } from '../../../../../core/services/unit-subject.service';
import { UnitSubject } from '../../../../../core/models/unit-subject';
import { GLOBAL_CONSTANTS } from '../../../../../core/utils/global-constants';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { SnackBarService } from '../../../../../core/services/snack-bar.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalUnitSubjectComponent } from '../../modal-add-unit-subject/modal-unit-subject.component';

const SUCCESS_ADD_UNIT_SUBJECT = marker('unit-subject.add.successfully');

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
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private snackBarService: SnackBarService,
    private unitSubjectService: UnitSubjectService,
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

  openModal(): void {
    const data = new UnitSubject();
    data.subjectId = this.subject.id;
    const config = {
      width: GLOBAL_CONSTANTS.maxWidthModal,
      maxHeight: GLOBAL_CONSTANTS.maxHeightModal,
      data
    };
    const dialogRef = this.dialog.open(ModalUnitSubjectComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUnits();
        this.subscriptions.push(
          this.translateService.get(SUCCESS_ADD_UNIT_SUBJECT).subscribe(
            res => {
              this.snackBarService.showSuccess(res);
            }
          )
        );
      }
    });
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
