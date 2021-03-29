import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckTokenGuard } from '../core/guards/check-token.guard.service';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
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
