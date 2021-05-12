import { Component, OnInit } from '@angular/core';
import { TeachSubjectService } from '../../../core/services/teach-subject.service';
import { BaseComponent } from '../../../core/base/base.component';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from '../../../core/models/subject';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducer';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ErrorResponse } from '../../../core/models/server/error-response';

@Component({
  selector: 'app-teacher-menu',
  templateUrl: './teacher-menu.component.html',
  styleUrls: ['./teacher-menu.component.scss']
})
export class TeacherMenuComponent extends BaseComponent implements OnInit {
  subjects: Subject[] = [];

  constructor(
    protected translateService: TranslateService,
    private store: Store<AppState>,
    private teachSubjectService: TeachSubjectService
  ) {
    super(translateService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.subscriptions.push(
      this.store.select('userState').pipe(
        switchMap(state => state.user ?
          this.teachSubjectService.findSubjectsByTeacherId(state.user.id) : of([])
        ),
      ).subscribe(
        subjects => this.subjects = subjects,
        (errorResponse: ErrorResponse) => {
          this.showAlert('error', '' + errorResponse.error.error);
        }
      )
    );
  }

}
