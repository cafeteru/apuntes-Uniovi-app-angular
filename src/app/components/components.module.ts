import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { ComponentsRoutingModule } from './components-routing.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialDesignModule } from '../shared/material-design/material-design.module';
import { SharedModule } from '../shared/shared.module';
import { NavbarComponent } from './navbar/navbar.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    LoginComponent,
    MenuComponent,
    NavbarComponent
  ],
  exports: [
    NavbarComponent
  ],
  imports: [
    ComponentsRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    MaterialDesignModule,
    SharedModule,
    CoreModule
  ]
})
export class ComponentsModule {
}
