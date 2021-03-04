// @ts-nocheck
import { TranslateTestingModule } from 'ngx-translate-testing';

import es from 'src/assets/i18n/es.json';
import us from 'src/assets/i18n/us.json';

export class TestUtils {
  /**
   * Returns test module to load i18n
   */
  static getLanguages(): TranslateTestingModule {
    return TranslateTestingModule.withTranslations({es, us})
      .withDefaultLanguage('es');
  }

  static cleanSweetAlert(): void {
    const list = document.getElementsByClassName('swal2-container swal2-center swal2-backdrop-show');
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < list.length; i++) {
      list[i].remove();
    }
  }
}
