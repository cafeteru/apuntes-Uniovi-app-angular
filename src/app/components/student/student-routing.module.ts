import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentMenuComponent } from './menu/student-menu.component';
import { CheckTokenGuard } from '../../core/guards/check-token.guard';

export const studentRoutes: Routes = [
  {
    path: '',
    component: StudentMenuComponent,
    canLoad: [CheckTokenGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(studentRoutes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {
}
