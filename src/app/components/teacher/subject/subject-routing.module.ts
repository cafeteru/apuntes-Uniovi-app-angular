import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherSubjectDetailsComponent } from './teacher-subject-details/teacher-subject-details.component';

export const subjectRoutes: Routes = [
  {
    path: `:id`,
    component: TeacherSubjectDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(subjectRoutes)],
  exports: [RouterModule]
})
export class SubjectRoutingModule {
}
