import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CheckTokenGuard } from './core/guards/check-token.guard';
import { RoleTypeGuard } from './core/guards/role-type-guard.service';
import { RoleType } from './core/models/enums/role-type';

export const rootRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./components/admin/admin.module').then(
        (a) => a.AdminModule
      ),
    canLoad: [CheckTokenGuard],
    canActivate: [RoleTypeGuard],
    data: {role: [RoleType.ROLE_ADMIN]}
  },
  {
    path: 'teacher',
    loadChildren: () =>
      import('./components/teacher/teacher.module').then(
        (t) => t.TeacherModule
      ),
    canLoad: [CheckTokenGuard],
    canActivate: [RoleTypeGuard],
    data: {role: [RoleType.ROLE_TEACHER]}
  },
  {
    path: 'student',
    loadChildren: () =>
      import('./components/student/student.module').then(
        (s) => s.StudentModule
      ),
    canLoad: [CheckTokenGuard],
    canActivate: [RoleTypeGuard],
    data: {role: [RoleType.ROLE_STUDENT]}
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(rootRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
