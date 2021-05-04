import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckTokenGuard } from '../core/guards/check-token.guard';
import { AdminMenuComponent } from './menu/admin-menu/admin-menu.component';
import { TeacherMenuComponent } from './menu/teacher-menu/teacher-menu.component';
import { StudentMenuComponent } from './menu/student-menu/student-menu.component';
import { RoleTypeGuard } from '../core/guards/role-type-guard.service';
import { RoleType } from '../core/models/enums/role-type';

const routes: Routes = [
  {
    path: '',
    component: AdminMenuComponent,
    canLoad: [CheckTokenGuard],
    canActivate: [RoleTypeGuard],
    data: {role: [RoleType.ROLE_ADMIN]}
  },
  {
    path: 'teacher',
    component: TeacherMenuComponent,
    canLoad: [CheckTokenGuard],
    canActivate: [RoleTypeGuard],
    data: {role: [RoleType.ROLE_TEACHER]}
  },
  {
    path: 'student',
    component: StudentMenuComponent,
    canLoad: [CheckTokenGuard],
    canActivate: [RoleTypeGuard],
    data: {role: [RoleType.ROLE_STUDENT]}
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./user/user.module').then(
        (u) => u.UserModule
      ),
    canLoad: [CheckTokenGuard]
  },
  {
    path: 'subjects',
    loadChildren: () =>
      import('./subject/subject.module').then(
        (s) => s.SubjectModule
      ),
    canLoad: [CheckTokenGuard]
  },
  {
    path: 'unitSubjects',
    loadChildren: () =>
      import('./unitSubject/unit-subject.module').then(
        (u) => u.UnitSubjectModule
      ),
    canLoad: [CheckTokenGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule {
}
