import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validator to verify dates
 */
export class DateValidator {
  /**
   * Check that the date entered is not higher than the date indicated
   *
   * @param maxDate Max date indicate
   */
  static maxDate(maxDate: Date): ValidatorFn {
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
