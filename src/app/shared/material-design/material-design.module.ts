import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SnackBarComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    TranslateModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatSnackBarModule,
    SnackBarComponent
  ]
})
export class MaterialDesignModule {
}
