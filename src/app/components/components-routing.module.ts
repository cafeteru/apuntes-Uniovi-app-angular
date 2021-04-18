import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckTokenGuard } from '../core/guards/check-token.guard';
import { AdminMenuComponent } from './menu/admin-menu/admin-menu.component';
import { TeacherMenuComponent } from './menu/teacher-menu/teacher-menu.component';
import { StudentMenuComponent } from './menu/student-menu/student-menu.component';

const routes: Routes = [
  {
    path: '',
    component: AdminMenuComponent,
    canLoad: [CheckTokenGuard]
  },
  {
    path: 'teacher',
    component: TeacherMenuComponent,
    canLoad: [CheckTokenGuard]
  },
  {
    path: 'student',
    component: StudentMenuComponent,
    canLoad: [CheckTokenGuard]
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule {
}
