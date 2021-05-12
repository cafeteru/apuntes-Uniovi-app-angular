import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { ChartsModule } from 'ng2-charts';
import { SubjectStatisticsComponent } from './subject-statistics/subject-statistics.component';
import { UserActiveStatisticsComponent } from './user-active-statistics/user-active-statistics.component';
import { UserTypeStatisticsComponent } from './user-type-statistics/user-type-statistics.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SubjectStatisticsComponent,
    UserActiveStatisticsComponent,
    UserTypeStatisticsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialDesignModule,
    CoreModule,
    ChartsModule,
    TranslateModule
  ],
  exports: [
    UserTypeStatisticsComponent,
    UserActiveStatisticsComponent,
    SubjectStatisticsComponent
  ]
})
export class StatisticsModule {
}
