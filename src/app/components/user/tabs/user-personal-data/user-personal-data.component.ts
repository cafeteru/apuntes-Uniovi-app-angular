import { Component, OnInit } from '@angular/core';
import { User } from '../../../../core/models/user';
import { ActivatedRoute } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../../../../core/base/base.component';
import { GLOBAL_CONSTANTS } from '../../../../core/utils/global-constants';
import { ModalUserComponent } from '../../modal-user/modal-user.component';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from '../../../../core/services/snack-bar.service';

const SUCCESS_UPDATE_USER = marker('user.update.successfully');

@Component({
  selector: 'app-user-personal-data',
  templateUrl: './user-personal-data.component.html',
  styleUrls: ['./user-personal-data.component.scss']
})
/**
 * Component to display personal information of a user
 */
export class UserPersonalDataComponent extends BaseComponent implements OnInit {
  user = new User();

  constructor(
    protected logger: NGXLogger,
    protected translateService: TranslateService,
    route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBarService: SnackBarService,
  ) {
    super(logger, translateService);
    this.logger.debug(UserPersonalDataComponent.name, 'constructor()', 'start');
    if (route.snapshot.data.user) {
      this.user = route.snapshot.data.user;
    }
    this.logger.debug(UserPersonalDataComponent.name, 'constructor()', 'end');
  }

  ngOnInit(): void {
  }


  updateUser(): void {
    this.logger.debug(UserPersonalDataComponent.name, `updateUser()`, 'start');
    const config = {
      width: GLOBAL_CONSTANTS.maxWidthModal,
      maxHeight: GLOBAL_CONSTANTS.maxHeightModal,
      data: this.user
    };
    const dialogRef = this.dialog.open(ModalUserComponent, config);
    dialogRef.afterClosed().subscribe(
      (user: User) => {
        if (user) {
          this.subscriptions.push(
            this.translateService.get(SUCCESS_UPDATE_USER).subscribe(
              res => {
                this.snackBarService.showSuccess(res);
              }
            )
          );
        }
        this.logger.debug(UserPersonalDataComponent.name, `updateUser()`, 'end');
      }
    );
  }
}
