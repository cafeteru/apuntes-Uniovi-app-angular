import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  template: '',
})
/**
 * Basic component that has the common properties
 */
export abstract class BaseComponent implements OnInit, OnDestroy {
  protected subscriptions: Subscription[] = [];

  protected constructor(protected translateService: TranslateService) {}

  ngOnInit(): void {
    this.subscriptions = [];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  /**
   * Show a message using SweetAlert
   *
   * @param icon Icon to show
   * @param title Title of message
   * @param text Content of message
   * @param action Action to be taken after closing the message
   */
  showAlert(
    icon: SweetAlertIcon,
    title: string,
    text?: string,
    action?: () => void
  ): void {
    this.showAlertBack(icon, title, text, undefined, action);
  }

  /**
   * Show a error message from the server using SweetAlert
   *
   * @param icon Icon to show
   * @param title Title of message
   * @param text Content of message
   * @param errorBack Error returned by the server
   * @param action Action to be taken after closing the message
   */
  showAlertBack(
    icon: SweetAlertIcon,
    title: string,
    text?: string,
    errorBack?: string,
    action?: () => void
  ): void {
    this.subscriptions.push(
      this.translateService.get([title, text]).subscribe((res) => {
        const valTranslated = text ? res[text] : '';
        Swal.fire({
          icon,
          title: res[title],
          html: errorBack
            ? `<div>${valTranslated}<br/>${errorBack}</div>`
            : `<div>${valTranslated}</div>`,
        }).then(() => {
          if (action) {
            action();
          }
        });
      })
    );
  }
}
