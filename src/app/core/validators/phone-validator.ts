import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class PhoneValidator {
  static isValid(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const str = control.value.toString().replace(/\s/g, '');
      if (str.length === 9 && /^[679][0-9]{8}$/.test(str)) {
        return null;
      } else {
        return {phone: true};
      }
    };
  }
}
