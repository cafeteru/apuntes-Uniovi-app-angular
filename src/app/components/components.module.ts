import { NgModule } from '@angular/core';
import { AdminMenuComponent } from './menu/admin-menu/admin-menu.component';
import { ComponentsRoutingModule } from './components-routing.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialDesignModule } from '../shared/material-design/material-design.module';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { LoginComponent } from './login/login.component';
import { ChartsModule } from 'ng2-charts';
import { TeacherMenuComponent } from './menu/teacher-menu/teacher-menu.component';
import { StudentMenuComponent } from './menu/student-menu/student-menu.component';

@NgModule({
  declarations: [
    AdminMenuComponent,
    LoginComponent,
    TeacherMenuComponent,
    StudentMenuComponent,
  ],
  imports: [
    ComponentsRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    MaterialDesignModule,
    SharedModule,
    CoreModule,
    ChartsModule
  ]
})
export class ComponentsModule {
}
