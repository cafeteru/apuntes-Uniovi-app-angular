import { Component, OnInit } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../../core/services/user.service';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { BaseComponent } from '../../../core/base/base.component';

const ROLE_TYPE_ADMIN = marker('role-type.admin');
const ROLE_TYPE_STUDENT = marker('role-type.student');
const ROLE_TYPE_TEACHER = marker('role-type.teacher');

@Component({
  selector: 'app-user-type-statistics',
  templateUrl: './user-type-statistics.component.html',
  styleUrls: ['./user-type-statistics.component.scss']
})
export class UserTypeStatisticsComponent extends BaseComponent implements OnInit {
  statisticsType: ChartType = 'pie';
  userRoleLabel: Label[] = [];
  userRoleData: MultiDataSet = [[0, 0, 0]];

  constructor(
    protected translateService: TranslateService,
    private userService: UserService,
  ) {
    super(translateService);
    const keys = [
      ROLE_TYPE_ADMIN,
      ROLE_TYPE_TEACHER,
      ROLE_TYPE_STUDENT
    ];
    this.subscriptions.push(
      this.translateService.get(keys).subscribe(
        res => {
          this.userRoleLabel = [
            res[ROLE_TYPE_ADMIN],
            res[ROLE_TYPE_STUDENT],
            res[ROLE_TYPE_TEACHER]
          ];
        }
      )
    );
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.userService.getStatistics().subscribe(
        userStatistics => {
          this.userRoleData = [
            [userStatistics.numAdmin, userStatistics.numStudents, userStatistics.numTeachers],
          ];
        }
      )
    );
  }
}
