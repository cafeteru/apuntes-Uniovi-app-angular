import { Component, OnInit } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { BaseComponent } from '../../../core/base/base.component';
import { TranslateService } from '@ngx-translate/core';
import { SubjectService } from '../../../core/services/subject.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducer';

const SUBJECT_ACTIVE = marker('subject.active');
const SUBJECT_INACTIVE = marker('subject.inactive');

@Component({
  selector: 'app-subject-statistics',
  templateUrl: './subject-statistics.component.html',
  styleUrls: ['./subject-statistics.component.scss']
})
export class SubjectStatisticsComponent extends BaseComponent implements OnInit {
  labels: Label[] = [];
  data: MultiDataSet = [[0, 0]];
  statisticsType: ChartType = 'pie';

  constructor(
    protected translateService: TranslateService,
    private subjectService: SubjectService,
    private store: Store<AppState>
  ) {
    super(translateService);
    this.subscriptions.push(this.store.select('userState').subscribe(
      () => this.getLabels())
    );
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.subjectService.getStatistics().subscribe(
        userStatistics => {
          this.data = [
            [userStatistics.active, userStatistics.inactive],
          ];
        }
      )
    );
  }

  private getLabels() {
    const keys = [
      SUBJECT_ACTIVE,
      SUBJECT_INACTIVE
    ];
    this.subscriptions.push(
      this.translateService.get(keys).subscribe(
        res => {
          this.labels = [
            res[SUBJECT_ACTIVE],
            res[SUBJECT_INACTIVE],
          ];
        }
      )
    );
  }
}
