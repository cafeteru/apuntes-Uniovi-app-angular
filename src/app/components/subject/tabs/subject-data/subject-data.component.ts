import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/base/base.component';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from '../../../../core/services/snack-bar.service';
import { Subject } from '../../../../core/models/subject';
import { GLOBAL_CONSTANTS } from '../../../../core/utils/global-constants';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { ModalSubjectComponent } from '../../modal-subject/modal-subject.component';

const SUCCESS_UPDATE_SUBJECT = marker('subject.update.successfully');

@Component({
  selector: 'app-subject-data',
  templateUrl: './subject-data.component.html',
  styleUrls: ['./subject-data.component.scss']
})
export class SubjectDataComponent extends BaseComponent implements OnInit {
  subject: Subject;

  constructor(
    protected translateService: TranslateService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBarService: SnackBarService,
  ) {
    super(translateService);
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.route.snapshot.data.subject) {
      this.subject = this.route.snapshot.data.subject;
    }
  }

  updateSubject(): void {
    const config = {
      width: GLOBAL_CONSTANTS.maxWidthModal,
      maxHeight: GLOBAL_CONSTANTS.maxHeightModal,
      data: this.subject
    };
    const dialogRef = this.dialog.open(ModalSubjectComponent, config);
    dialogRef.afterClosed().subscribe(
      (subject: Subject) => {
        if (subject) {
          this.subscriptions.push(
            this.translateService.get(SUCCESS_UPDATE_SUBJECT).subscribe(
              res => {
                this.snackBarService.showSuccess(res);
              }
            )
          );
        }
      }
    );
  }
}
