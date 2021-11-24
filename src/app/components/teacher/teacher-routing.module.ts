import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherMenuComponent } from './menu/teacher-menu.component';
import { CheckTokenGuard } from '../../core/guards/check-token.guard';

export const teacherRoutes: Routes = [
  {
    path: '',
    component: TeacherMenuComponent,
    canLoad: [CheckTokenGuard],
  },
  {
    path: 'subjects',
    loadChildren: () =>
      import('./subject/subject.module').then((s) => s.SubjectModule),
    canLoad: [CheckTokenGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(teacherRoutes)],
  exports: [RouterModule],
})
export class TeacherRoutingModule {}
