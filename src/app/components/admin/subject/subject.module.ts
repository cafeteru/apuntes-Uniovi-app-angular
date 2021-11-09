import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import {CoreModule} from '../../../core/core.module';
import {ReactiveFormsModule} from '@angular/forms';
import {SubjectRoutingModule} from './subject-routing.module';
import {SubjectListComponent} from './subject-list/subject-list.component';
import {ModalSubjectComponent} from './modals/modal-subject/modal-subject.component';
import {SubjectDetailsComponent} from './subject-details/subject-details.component';
import {SubjectDataComponent} from './tabs/subject-data/subject-data.component';
import {LearnSubjectComponent} from './tabs/learn-subject/learn-subject.component';
import {ModalLearnSubjectComponent} from './modals/modal-learn-subject/modal-learn-subject.component';

@NgModule({
    declarations: [
        SubjectListComponent,
        ModalSubjectComponent,
        SubjectDetailsComponent,
        SubjectDataComponent,
        LearnSubjectComponent,
        ModalLearnSubjectComponent
    ],
    exports: [
        SubjectDataComponent,
        LearnSubjectComponent
    ],
    imports: [
        SubjectRoutingModule,
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        CoreModule
    ]
})
export class SubjectModule {
}
