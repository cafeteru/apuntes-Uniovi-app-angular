import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { CoreModule } from '../../../core/core.module';
import { ComponentsRoutingModule } from '../../components-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialDesignModule } from '../../../shared/material-design/material-design.module';
import { ListUnitSubjectComponent } from './list-unit-subject/list-unit-subject.component';
import { UnitSubjectRoutingModule } from './unit-subject-routing.module';

@NgModule({
  declarations: [
    ListUnitSubjectComponent,
  ],
  imports: [
    UnitSubjectRoutingModule,
    ComponentsRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    MaterialDesignModule,
    SharedModule,
    CoreModule
  ]
})
export class UnitSubjectModule {
}
