import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { SubjectDetailsComponent } from './subject-details/subject-details.component';
import { SubjectResolver } from '../../core/resolvers/subject.resolver';
import { RoleTypeGuard } from '../../core/guards/role-type-guard.service';
import { RoleType } from '../../core/models/enums/role-type';
import { ListUnitSubjectComponent } from '../unitSubject/list-unit-subject/list-unit-subject.component';

export const subjectRoutes: Routes = [
  {
    path: '',
    component: SubjectListComponent,
    canActivate: [RoleTypeGuard],
    data: {role: [RoleType.ROLE_ADMIN]},
  },
  {
    path: `:id`,
    component: SubjectDetailsComponent,
    canActivate: [RoleTypeGuard],
    data: {role: [RoleType.ROLE_ADMIN]},
    resolve: {
      subject: SubjectResolver
    }
  },
  {
    // todo Separar por rol
    path: 'teacher/:id',
    component: ListUnitSubjectComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(subjectRoutes)],
  exports: [RouterModule]
})
export class SubjectRoutingModule {
}
