import { OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { IdentificationType } from '../../core/models/enums/identification-type';

const IDENTIFICATION_TYPE_DNI = marker('identification-type.dni');
const IDENTIFICATION_TYPE_NIE = marker('identification-type.nie');

@Pipe({
  name: 'identificationType'
})
/**
 * Pipe to convert IdentificationTypes to string
 */
export class IdentificationTypePipe implements PipeTransform, OnDestroy {
  private subscription: Subscription;

  private map = {};

  constructor(
    private translateService: TranslateService
  ) {
    const elements = [
      IDENTIFICATION_TYPE_DNI,
      IDENTIFICATION_TYPE_NIE
    ];
    this.subscription = this.translateService?.get(elements).subscribe(
      res => this.map = res
    );
  }

  transform(value: IdentificationType | string): string {
    switch (value) {
      case IdentificationType.DNI:
        return this.map[IDENTIFICATION_TYPE_DNI];
      case IdentificationType.NIE:
        return this.map[IDENTIFICATION_TYPE_NIE];
    }
    return '';
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
