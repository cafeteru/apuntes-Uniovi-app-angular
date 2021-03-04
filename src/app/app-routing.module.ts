import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CheckValidTokenGuard } from './core/guards/check-valid-token.guard';

export const rootRoutes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'menu',
    loadChildren: () =>
      import('./components/components.module').then(
        (c) => c.ComponentsModule
      ),
    canActivate: [CheckValidTokenGuard]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(rootRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
