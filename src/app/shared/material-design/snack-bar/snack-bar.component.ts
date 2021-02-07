import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

export interface SnackBarData {
  msg: string;
}

@Component({
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
/**
 * Component to display a message in a snackbar
 */
export class SnackBarComponent {
  
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: SnackBarData
  ) {
  }
}
