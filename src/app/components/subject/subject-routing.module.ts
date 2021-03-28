import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectListComponent } from './subject-list/subject-list.component';

export const routes: Routes = [
  {
    path: '',
    component: SubjectListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectRoutingModule {
}
