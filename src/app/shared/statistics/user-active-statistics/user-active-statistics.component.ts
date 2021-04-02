import { Component, OnInit } from '@angular/core';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../../core/services/user.service';
import { BaseComponent } from '../../../core/base/base.component';

const USER_ACTIVE = marker('user.active');
const USER_INACTIVE = marker('user.inactive');

@Component({
  selector: 'app-user-active-statistics',
  templateUrl: './user-active-statistics.component.html',
  styleUrls: ['./user-active-statistics.component.scss']
})
export class UserActiveStatisticsComponent extends BaseComponent implements OnInit {
  labels: Label[] = [];
  data: MultiDataSet = [[0, 0]];
  statisticsType: ChartType = 'pie';

  constructor(
    protected translateService: TranslateService,
    private userService: UserService,
  ) {
    super(translateService);
    const keys = [
      USER_ACTIVE,
      USER_INACTIVE
    ];
    this.subscriptions.push(
      this.translateService.get(keys).subscribe(
        res => {
          this.labels = [
            res[USER_ACTIVE],
            res[USER_INACTIVE],
          ];
        }
      )
    );
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.userService.getStatistics().subscribe(
        userStatistics => {
          this.data = [
            [userStatistics.active, userStatistics.inactive],
          ];
        }
      )
    );
  }
}
