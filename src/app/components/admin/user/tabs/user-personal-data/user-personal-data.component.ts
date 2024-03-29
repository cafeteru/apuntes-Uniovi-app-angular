import { Component } from '@angular/core';
import { User } from '../../../../../core/models/user';
import { ActivatedRoute } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../../../../../core/base/base.component';
import { GLOBAL_CONSTANTS } from '../../../../../core/utils/global-constants';
import { ModalUserComponent } from '../../modal-user/modal-user.component';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from '../../../../../core/services/snack-bar.service';

const SUCCESS_UPDATE_USER = marker('user.update.successfully');

@Component({
  selector: 'app-user-personal-data',
  templateUrl: './user-personal-data.component.html',
  styleUrls: ['./user-personal-data.component.scss'],
})
/**
 * Component to display personal information of a user
 */
export class UserPersonalDataComponent extends BaseComponent {
  user: User;

  constructor(
    protected translateService: TranslateService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBarService: SnackBarService
  ) {
    super(translateService);
    if (this.route.snapshot.data.user) {
      this.user = this.route.snapshot.data.user;
    }
  }

  /**
   * Update user´s information
   */
  updateUser(): void {
    const config = {
      width: GLOBAL_CONSTANTS.maxWidthModal,
      maxHeight: GLOBAL_CONSTANTS.maxHeightModal,
      data: this.user,
    };
    const dialogRef = this.dialog.open(ModalUserComponent, config);
    dialogRef.afterClosed().subscribe((user: User) => {
      if (user) {
        this.subscriptions.push(
          this.translateService.get(SUCCESS_UPDATE_USER).subscribe((res) => {
            this.snackBarService.showSuccess(res);
          })
        );
      }
    });
  }
}
