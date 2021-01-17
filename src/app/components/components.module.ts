import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { ComponentsRoutingModule } from './components-routing.module';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialDesignModule } from '../shared/material-design/material-design.module';
import { SharedModule } from '../shared/shared.module';
import { NavbarComponent } from './navbar/navbar.component';

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
    TranslateModule,
    ReactiveFormsModule,
    MaterialDesignModule,
    SharedModule
  ]
})
export class ComponentsModule {
}
