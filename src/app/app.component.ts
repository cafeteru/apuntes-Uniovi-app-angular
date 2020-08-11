import {Component} from '@angular/core';
import {NGXLogger} from 'ngx-logger';
import {TranslationService} from './core/services/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Apuntes Uniovi App';

  constructor(
    private logger: NGXLogger,
    private translationService: TranslationService
  ) {
    this.logger.debug(this.title);
  }
}
