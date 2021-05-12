import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../../core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialDesignModule } from '../../shared/material-design/material-design.module';
import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherMenuComponent } from './menu/teacher-menu.component';

@NgModule({
  declarations: [
    TeacherMenuComponent
  ],
  imports: [
    TeacherRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    MaterialDesignModule,
    SharedModule,
    CoreModule
  ]
})
export class TeacherModule {
}
