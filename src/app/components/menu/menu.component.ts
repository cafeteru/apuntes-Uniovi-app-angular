import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../core/base/base.component';
import { NGXLogger } from 'ngx-logger';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent extends BaseComponent implements OnInit {

  constructor(
    protected logger: NGXLogger,
    protected translateService: TranslateService,
  ) {
    super(logger, translateService);
    this.logger.debug(MenuComponent.name, 'constructor()', 'start');
    this.logger.debug(MenuComponent.name, 'constructor()', 'end');
  }

  ngOnInit(): void {
    this.logger.debug(MenuComponent.name, 'ngOnInit()', 'start');
    this.logger.debug(MenuComponent.name, 'ngOnInit()', 'end');
  }

}
