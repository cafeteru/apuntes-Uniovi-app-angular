import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../core/core.module';
import {FooterComponent} from './footer/footer.component';
import {MaterialDesignModule} from './material-design/material-design.module';


@NgModule({
  declarations: [
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    MaterialDesignModule,
  ],
  exports: [
    FooterComponent,
    MaterialDesignModule,
  ]
})
export class SharedModule {
}
