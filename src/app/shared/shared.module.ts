import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { FooterComponent } from './footer/footer.component';
import { MaterialDesignModule } from './material-design/material-design.module';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { NoImagePipe } from './pipes/no-image.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    FooterComponent,
    NoImagePipe,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    MaterialDesignModule,
    BrowserAnimationsModule,
    ShowHidePasswordModule,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    MaterialDesignModule,
    NoImagePipe,
    FormsModule,
    ReactiveFormsModule,
    ShowHidePasswordModule,
    NavbarComponent,
  ]
})
export class SharedModule {
}
