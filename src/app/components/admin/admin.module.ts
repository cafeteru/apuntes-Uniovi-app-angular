import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {CoreModule} from '../../core/core.module';
import {ReactiveFormsModule} from '@angular/forms';
import {AdminRoutingModule} from './admin-routing.module';
import {AdminMenuComponent} from './menu/admin-menu.component';

@NgModule({
    declarations: [
        AdminMenuComponent
    ],
    imports: [
        AdminRoutingModule,
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        CoreModule
    ]
})
export class AdminModule {
}
