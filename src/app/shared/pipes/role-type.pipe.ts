import { OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { RoleType } from '../../core/models/enums/role-type';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

const ROLE_TYPE_ADMIN = marker('role-type.admin');
const ROLE_TYPE_TEACHER = marker('role-type.teacher');
const ROLE_TYPE_STUDENT = marker('role-type.student');

@Pipe({
  name: 'roleType',
})
/**
 * Pipe to convert Roles to string
 */
export class RoleTypePipe implements PipeTransform, OnDestroy {
  private subscription: Subscription;

  private map = {
    'role-type.admin': '',
    'role-type.teacher': '',
    'role-type.student': '',
  };

  constructor(private translateService: TranslateService) {
    const elements = [ROLE_TYPE_ADMIN, ROLE_TYPE_TEACHER, ROLE_TYPE_STUDENT];
    this.subscription = this.translateService
      .get(elements)
      .subscribe((res) => (this.map = res));
  }

  transform(value: RoleType | string): string {
    switch (value) {
      case RoleType.ROLE_ADMIN:
        return this.map['role-type.admin'];
      case RoleType.ROLE_STUDENT:
        return this.map['role-type.student'];
      case RoleType.ROLE_TEACHER:
        return this.map['role-type.teacher'];
    }
    return '';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
