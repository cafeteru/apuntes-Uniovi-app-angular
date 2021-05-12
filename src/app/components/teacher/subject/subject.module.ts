import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { CoreModule } from '../../../core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialDesignModule } from '../../../shared/material-design/material-design.module';
import { SubjectRoutingModule } from './subject-routing.module';
import { TeacherSubjectDetailsComponent } from './teacher-subject-details/teacher-subject-details.component';
import { SubjectDataComponent } from './subject-data/subject-data.component';
import { SubjectStudentsComponent } from './subject-students/subject-students.component';
import { UnitsSubjectComponent } from './units-subject/units-subject.component';

@NgModule({
  declarations: [
    TeacherSubjectDetailsComponent,
    SubjectDataComponent,
    SubjectStudentsComponent,
    UnitsSubjectComponent
  ],
  imports: [
    SubjectRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    MaterialDesignModule,
    SharedModule,
    CoreModule,
  ]
})
export class SubjectModule {
}
