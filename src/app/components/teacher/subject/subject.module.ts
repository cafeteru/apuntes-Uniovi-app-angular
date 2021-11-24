import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { CoreModule } from '../../../core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SubjectRoutingModule } from './subject-routing.module';
import { TeacherSubjectDetailsComponent } from './teacher-subject-details/teacher-subject-details.component';
import { SubjectDataComponent } from './tabs/subject-data/subject-data.component';
import { SubjectStudentsComponent } from './tabs/subject-students/subject-students.component';
import { UnitsSubjectComponent } from './tabs/units-subject/units-subject.component';
import { ModalUnitSubjectComponent } from './modal-add-unit-subject/modal-unit-subject.component';

@NgModule({
  declarations: [
    TeacherSubjectDetailsComponent,
    SubjectDataComponent,
    SubjectStudentsComponent,
    UnitsSubjectComponent,
    ModalUnitSubjectComponent,
  ],
  imports: [
    SubjectRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    CoreModule,
  ],
})
export class SubjectModule {}
