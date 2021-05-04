import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleTypeGuard } from '../../core/guards/role-type-guard.service';
import { ListUnitSubjectComponent } from './list-unit-subject/list-unit-subject.component';

export const unitSubjectRoutes: Routes = [
  {
    path: '',
    component: ListUnitSubjectComponent,
    canActivate: [RoleTypeGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(unitSubjectRoutes)],
  exports: [RouterModule]
})
export class UnitSubjectRoutingModule {
}
