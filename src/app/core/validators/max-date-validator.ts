import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class MaxDateValidator {
  static isValid(maxDate: Date): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const date = new Date(control.value);
      if (date > maxDate) {
        return {maxDate: true};
      }
      return null;
    };
  }
}
