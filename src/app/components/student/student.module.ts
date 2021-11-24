import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../../core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentRoutingModule } from './student-routing.module';
import { StudentMenuComponent } from './menu/student-menu.component';

@NgModule({
  declarations: [StudentMenuComponent],
  imports: [
    StudentRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    CoreModule,
  ],
})
export class StudentModule {}
