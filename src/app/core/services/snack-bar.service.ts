import { Injectable } from '@angular/core';
import { SnackBarComponent, SnackBarData } from '../../shared/material-design/snack-bar/snack-bar.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  private readonly snackBarConfig: MatSnackBarConfig;

  constructor(
    private snackBar: MatSnackBar,
  ) {
    this.snackBarConfig = new MatSnackBarConfig();
    this.snackBarConfig.duration = 2500;
    this.snackBarConfig.verticalPosition = 'top';
    this.snackBarConfig.horizontalPosition = 'center';
  }

  showSuccess(msg: string): void {
    const data: SnackBarData = {msg};
    this.snackBar.openFromComponent(SnackBarComponent, {
      ...this.snackBarConfig,
      data,
      panelClass: 'success-snack-bar'
    });
  }
}
