import {TestBed} from '@angular/core/testing';

import {TranslationService} from './translation.service';
import {LoggerTestingModule} from 'ngx-logger/testing';
import {CoreModule} from '../core.module';


describe('TranslationService', () => {
  let service: TranslationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        LoggerTestingModule,
        CoreModule
      ]
    });
    service = TestBed.inject(TranslationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
