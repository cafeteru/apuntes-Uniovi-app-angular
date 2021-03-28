import { SubjectTypePipe } from './subject-type.pipe';
import { inject, TestBed } from '@angular/core/testing';
import { TestUtils } from '../../core/utils/test-utils';
import { TranslateService } from '@ngx-translate/core';
import { RoleTypePipe } from './role-type.pipe';

describe('SubjectTypePipe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestUtils.getLanguages()
      ],
    });
  });

  it('create an instance',
    inject([TranslateService], (translateService: TranslateService) => {
      const pipe = new SubjectTypePipe(translateService);
      expect(pipe).toBeTruthy();
    })
  );
});
