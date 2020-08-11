import {Injectable} from '@angular/core';
import {NGXLogger} from 'ngx-logger';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(
    private logger: NGXLogger,
    public translateService: TranslateService
  ) {
    this.logger.debug(TranslationService.name, 'constructor', 'start');
    this.translateService.setDefaultLang('es');
    this.logger.debug(TranslationService.name, 'constructor', 'end');
  }

  /**
   * Change the language of the application.
   * For it to work, there must be a "language.json" file
   *
   * @param lang Selected language
   */
  changeLang(lang: string): void {
    this.logger.debug(TranslationService.name, `cambiarLenguaje(${lang})`, 'start');
    this.translateService.use(lang);
    this.logger.debug(TranslationService.name, `cambiarLenguaje(${lang})`, 'end');
  }

  /**
   * Returns a string translated to the language selected in the application.
   * This method is used in TS classes only.
   *
   * @param identifier Content identifier
   */
  getText(identifier: string): string {
    this.logger.debug(TranslationService.name, `getTexto(${identifier})`, 'start');
    const palabra = this.translateService.instant(identifier);
    this.logger.debug(TranslationService.name, `getTexto(${identifier})`, 'end');
    return palabra;
  }

}
