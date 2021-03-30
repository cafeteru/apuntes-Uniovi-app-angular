import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { SubjectDetailsComponent } from './subject-details/subject-details.component';
import { SubjectResolver } from '../../core/resolvers/subject.resolver';

export const subjectRoutes: Routes = [
  {
    path: '',
    component: SubjectListComponent,
  },
  {
    path: `:id`,
    component: SubjectDetailsComponent,
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
