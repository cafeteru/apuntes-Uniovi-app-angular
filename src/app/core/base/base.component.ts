import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NGXLogger } from 'ngx-logger';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  template: ''
})
/**
 * Basic component that has the common properties
 */
export abstract class BaseComponent implements OnInit, OnDestroy {
  protected subscriptions: Subscription[] = [];

  protected constructor(
    protected logger: NGXLogger,
    protected translateService: TranslateService,
  ) {
    this.logger.debug(BaseComponent.name, 'constructor()', 'start');
    this.logger.debug(BaseComponent.name, 'constructor()', 'end');
  }

  ngOnInit(): void {
    this.logger.debug(this.constructor.name, 'ngOnInit()', 'start');
    this.subscriptions = [];
    this.logger.debug(this.constructor.name, 'ngOnInit()', 'end');
  }

  ngOnDestroy(): void {
    this.logger.debug(this.constructor.name, 'ngOnDestroy()', 'start');
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.logger.debug(this.constructor.name, 'ngOnDestroy()', 'end');
  }

  /**
   * Show a message using SweetAlert
   *
   * @param title Title of message
   * @param text Content of message
   * @param icon Icon to show
   * @param action Action to be taken after closing the message
   */
  showAlert(title: string, text: string, icon: SweetAlertIcon, action?: () => void): void {
    this.showAlertBack(title, text, icon, undefined, action);
  }

  /**
   * Show a error message from the server using SweetAlert
   *
   * @param title Title of message
   * @param text Content of message
   * @param icon Icon to show
   * @param errorBack Error returned by the server
   * @param action Action to be taken after closing the message
   */
  showAlertBack(
    title: string,
    text: string,
    icon: SweetAlertIcon,
    errorBack?: string,
    action?: () => void
  ): void {
    this.subscriptions.push(
      this.translateService.get([title, text]).subscribe(
        res => {
          Swal.fire({
            icon,
            title: (res[title]),
            html: errorBack ? `<div>${res[text]}<br/>${errorBack}</div>` : `<div>${res[text]}</div>`
          }).then(
            () => {
              if (action) {
                action();
              }
            }
          );
        }
      )
    );
  }
}
