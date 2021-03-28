import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../core/base/base.component';
import { NGXLogger } from 'ngx-logger';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../core/services/user.service';
import { ChartType } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { AppState } from '../../store/app.reducer';
import { Store } from '@ngrx/store';

const ROLE_TYPE_ADMIN = marker('role-type.admin');
const ROLE_TYPE_STUDENT = marker('role-type.student');
const ROLE_TYPE_TEACHER = marker('role-type.teacher');
const USER_ACTIVE = marker('user.active');
const USER_INACTIVE = marker('user.inactive');

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent extends BaseComponent implements OnInit {
  public userActiveLabel: Label[] = [];
  public userActiveData: MultiDataSet = [[0, 0]];
  statisticsType: ChartType = 'pie';

  public userRoleLabel: Label[] = [];
  public userRoleData: MultiDataSet = [[0, 0, 0]];

  constructor(
    protected logger: NGXLogger,
    protected translateService: TranslateService,
    private userService: UserService,
    private store: Store<AppState>
  ) {
    super(logger, translateService);
    this.logger.debug(MenuComponent.name, 'constructor()', 'start');
    this.loadI18nLabels();
    this.logger.debug(MenuComponent.name, 'constructor()', 'end');
  }

  ngOnInit(): void {
    this.logger.debug(MenuComponent.name, 'ngOnInit()', 'start');
    this.getStatistics();
    this.subscriptions.push(
      this.store.select('userState').subscribe(
        () => this.loadI18nLabels()
      )
    );
    this.logger.debug(MenuComponent.name, 'ngOnInit()', 'end');
  }

  private getStatistics(): void {
    this.logger.debug(MenuComponent.name, 'getStatistics()', 'start');
    this.subscriptions.push(
      this.userService.getStatistics().subscribe(
        userStatistics => {
          this.userActiveData = [
            [userStatistics.active, userStatistics.inactive],
          ];
          this.userRoleData = [
            [userStatistics.numAdmin, userStatistics.numStudents, userStatistics.numTeachers],
          ];
        }
      )
    );
    this.logger.debug(MenuComponent.name, 'getStatistics()', 'end');
  }

  private loadI18nLabels(): void {
    this.logger.debug(MenuComponent.name, 'loadI18nLabels()', 'start');
    const keys = [
      ROLE_TYPE_ADMIN,
      ROLE_TYPE_TEACHER,
      ROLE_TYPE_STUDENT,
      USER_ACTIVE,
      USER_INACTIVE
    ];
    this.subscriptions.push(
      this.translateService.get(keys).subscribe(
        res => {
          this.userActiveLabel = [
            res[USER_ACTIVE],
            res[USER_INACTIVE],
          ];
          this.userRoleLabel = [
            res[ROLE_TYPE_ADMIN],
            res[ROLE_TYPE_STUDENT],
            res[ROLE_TYPE_TEACHER]
          ];
        }
      )
    );
    this.logger.debug(MenuComponent.name, 'loadI18nLabels()', 'end');
  }
}
