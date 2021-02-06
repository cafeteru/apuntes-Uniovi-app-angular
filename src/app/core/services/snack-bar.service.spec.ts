import { TestBed } from '@angular/core/testing';

import { SnackBarService } from './snack-bar.service';
import { SharedModule } from '../../shared/shared.module';

describe('SnackBarService', () => {
  let service: SnackBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ]
    });
    service = TestBed.inject(SnackBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
