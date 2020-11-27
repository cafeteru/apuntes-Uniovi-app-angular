import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {NGXLogger} from 'ngx-logger';

@Component({
  template: ''
})
export abstract class BaseComponent implements OnInit, OnDestroy {
  protected subscriptions: Subscription[];

  protected constructor(
    protected logger: NGXLogger
  ) {
    this.logger.debug(BaseComponent.name, 'constructor()', 'start');
    this.logger.debug(BaseComponent.name, 'constructor()', 'end');
  }

  ngOnInit(): void {
    this.logger.debug(BaseComponent.name, 'ngOnInit()', 'start');
    this.subscriptions = [];
    this.logger.debug(BaseComponent.name, 'ngOnInit()', 'end');
  }

  ngOnDestroy(): void {
    this.logger.debug(BaseComponent.name, 'ngOnDestroy()', 'start');
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.logger.debug(BaseComponent.name, 'ngOnDestroy()', 'end');
  }
}
