import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherSubjectDetailsComponent } from './teacher-subject-details/teacher-subject-details.component';
import { RoleTypeGuard } from '../../../core/guards/role-type.guard';
import { SubjectResolver } from '../../../core/resolvers/subject.resolver';

export const subjectRoutes: Routes = [
  {
    path: `:id`,
    component: TeacherSubjectDetailsComponent,
    canActivate: [RoleTypeGuard],
    resolve: {
      subject: SubjectResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(subjectRoutes)],
  exports: [RouterModule]
})
export class SubjectRoutingModule {
}
