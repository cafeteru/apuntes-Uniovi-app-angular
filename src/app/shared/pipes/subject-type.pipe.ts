import { OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { SubjectType } from '../../core/models/enums/subject-type';

const BASIC = marker('subject-type.basic');
const REQUIRED = marker('subject-type.required');
const OPTIONAL = marker('subject-type.optional');
const EXTERN_PRACTICES = marker('subject-type.extern-practices');
const TFG = marker('subject-type.tfg');

@Pipe({
  name: 'subjectType',
})
export class SubjectTypePipe implements PipeTransform, OnDestroy {
  private subscription: Subscription;

  private map = {};

  constructor(private translateService: TranslateService) {
    const elements = [BASIC, REQUIRED, OPTIONAL, EXTERN_PRACTICES, TFG];
    this.subscription = this.translateService
      .get(elements)
      .subscribe((res) => (this.map = res));
  }

  transform(value: SubjectType | string): string {
    switch (value) {
      case SubjectType.BASIC:
        return this.map['subject-type.basic'];
      case SubjectType.EXTERN_PRACTICES:
        return this.map['subject-type.extern-practices'];
      case SubjectType.OPTIONAL:
        return this.map['subject-type.optional'];
      case SubjectType.REQUIRED:
        return this.map['subject-type.required'];
      case SubjectType.TFG:
        return this.map['subject-type.basic'];
    }
    return '';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
