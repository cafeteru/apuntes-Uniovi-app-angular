import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../../core/core.module';
import { ComponentsRoutingModule } from '../components-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialDesignModule } from '../../shared/material-design/material-design.module';
import { SubjectRoutingModule } from './subject-routing.module';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { ModalSubjectComponent } from './modal-subject/modal-subject.component';

@NgModule({
  declarations: [
    SubjectListComponent,
    ModalSubjectComponent
  ],
  imports: [
    SubjectRoutingModule,
    ComponentsRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    MaterialDesignModule,
    SharedModule,
    CoreModule,
  ]
})
export class SubjectModule {
}
