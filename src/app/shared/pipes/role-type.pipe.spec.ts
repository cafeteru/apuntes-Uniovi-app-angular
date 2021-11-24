import { RoleTypePipe } from './role-type.pipe';
import { inject, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { TestUtils } from '../../core/utils/test-utils';
import { RoleType } from '../../core/models/enums/role-type';

describe('RoleTypePipe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestUtils.getLanguages()],
    });
  });

  it('create an instance', inject(
    [TranslateService],
    (translateService: TranslateService) => {
      const pipe = new RoleTypePipe(translateService);
      expect(pipe).toBeTruthy();
    }
  ));

  it('check transform with empty key', inject(
    [TranslateService],
    (translateService: TranslateService) => {
      const pipe = new RoleTypePipe(translateService);
      const value = pipe.transform('');
      expect(value).toBe('');
    }
  ));

  it('check transform with null key', inject(
    [TranslateService],
    (translateService: TranslateService) => {
      const pipe = new RoleTypePipe(translateService);
      const value = pipe.transform(null);
      expect(value).toBe('');
    }
  ));

  it('check transform with undefined key', inject(
    [TranslateService],
    (translateService: TranslateService) => {
      const pipe = new RoleTypePipe(translateService);
      const value = pipe.transform(undefined);
      expect(value).toBe('');
    }
  ));

  it('check transform with RoleType.ADMIN key', inject(
    [TranslateService],
    (translateService: TranslateService) => {
      const pipe = new RoleTypePipe(translateService);
      translateService.get('role-type.admin').subscribe((res) => {
        const value = pipe.transform(RoleType.ROLE_ADMIN);
        expect(value).toBe(res);
      });
    }
  ));

  it('check transform with RoleType.STUDENT key', inject(
    [TranslateService],
    (translateService: TranslateService) => {
      const pipe = new RoleTypePipe(translateService);
      translateService.get('role-type.student').subscribe((res) => {
        const value = pipe.transform(RoleType.ROLE_STUDENT);
        expect(value).toBe(res);
      });
    }
  ));

  it('check transform with RoleType.TEACHER key', inject(
    [TranslateService],
    (translateService: TranslateService) => {
      const pipe = new RoleTypePipe(translateService);
      translateService.get('role-type.teacher').subscribe((res) => {
        const value = pipe.transform(RoleType.ROLE_TEACHER);
        expect(value).toBe(res);
      });
    }
  ));
});
