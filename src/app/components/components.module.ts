import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {CoreModule} from '../core/core.module';
import {LoginComponent} from './login/login.component';
import {ChartsModule} from 'ng2-charts';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        CoreModule,
        ChartsModule
    ]
})
export class ComponentsModule {
}
