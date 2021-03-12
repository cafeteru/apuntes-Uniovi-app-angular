import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CheckTokenGuard } from './core/guards/check-token-guard.service';

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
    canLoad: [CheckTokenGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(rootRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
