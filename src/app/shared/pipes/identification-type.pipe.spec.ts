import { IdentificationTypePipe } from './identification-type.pipe';
import { inject, TestBed } from '@angular/core/testing';
import { TestUtils } from '../../core/utils/test-utils';
import { TranslateService } from '@ngx-translate/core';
import { IdentificationType } from '../../core/models/enums/identification-type';

describe('IdentificationTypePipe', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestUtils.getLanguages()
      ],
    });
  });

  it('create an instance',
    inject([TranslateService], (translateService: TranslateService) => {
      let pipe = new IdentificationTypePipe(translateService);
      expect(pipe).toBeTruthy();
    })
  );

  it('check transform with empty key',
    inject([TranslateService], (translateService: TranslateService) => {
      let pipe = new IdentificationTypePipe(translateService);
      const value = pipe.transform('');
      expect(value).toBe('');
    })
  );

  it('check transform with null key',
    inject([TranslateService], (translateService: TranslateService) => {
      let pipe = new IdentificationTypePipe(translateService);
      const value = pipe.transform(null);
      expect(value).toBe('');
    })
  );

  it('check transform with undefined key',
    inject([TranslateService], (translateService: TranslateService) => {
      let pipe = new IdentificationTypePipe(translateService);
      const value = pipe.transform(undefined);
      expect(value).toBe('');
    })
  );

  it('check transform with IdentificationType.DNI key',
    inject([TranslateService], (translateService: TranslateService) => {
      let pipe = new IdentificationTypePipe(translateService);
      translateService.get('identification-type.dni').subscribe(
        res => {
          const value = pipe.transform(IdentificationType.DNI);
          expect(value).toBe(res);
        }
      );
    })
  );

  it('check transform with IdentificationType.NIE key',
    inject([TranslateService], (translateService: TranslateService) => {
      let pipe = new IdentificationTypePipe(translateService);
      translateService.get('identification-type.nie').subscribe(
        res => {
          const value = pipe.transform(IdentificationType.NIE);
          expect(value).toBe(res);
        }
      );
    })
  );
});
