import { TestBed } from '@angular/core/testing';

import { SnackBarService } from './snack-bar.service';
import { SharedModule } from '../../shared/shared.module';
import { SnackBarComponent } from '../../shared/material-design/snack-bar/snack-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestUtils } from '../utils/test-utils';

describe('SnackBarService', () => {
  let service: SnackBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SnackBarComponent],
      providers: [SnackBarService],
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        TestUtils.getLanguages(),
      ],
    });
    service = TestBed.inject(SnackBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    service.showSuccess('message');
    const list = document.getElementsByTagName('snack-bar-container');
    list[0]?.remove();
  });
});
