import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../../core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialDesignModule } from '../../shared/material-design/material-design.module';
import { StudentRoutingModule } from './student-routing.module';
import { StudentMenuComponent } from './menu/student-menu.component';

@NgModule({
  declarations: [
    StudentMenuComponent
  ],
  imports: [
    StudentRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    MaterialDesignModule,
    SharedModule,
    CoreModule
  ]
})
export class StudentModule {
}
