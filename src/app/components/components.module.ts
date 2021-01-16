import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    LoginComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
  ]
})
export class ComponentsModule {
}
