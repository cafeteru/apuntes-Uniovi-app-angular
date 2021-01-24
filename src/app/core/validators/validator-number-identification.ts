import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { FormGroupUtil } from '../utils/form-group-util';

export class ValidatorNumberIdentification {
  static isValid(): ValidatorFn {
    return (formGroup: FormGroup): ValidationErrors | null => {
      const identificationType = formGroup.controls.identificationType;
      const numberIdentification = formGroup.controls.numberIdentification;
      FormGroupUtil.deleteError(identificationType, 'required');
      FormGroupUtil.deleteError(numberIdentification, 'wrongLetter');
      FormGroupUtil.deleteError(numberIdentification, 'formatNoValid');
      if (!identificationType.value) {
        if (numberIdentification.value) {
          identificationType.setErrors({required: true});
          identificationType.markAsTouched({onlySelf: true});
          return;
        }
        return null;
      }
      let str = numberIdentification.value;
      let expression = /^\d{8}[A-Z]$/;
      if (identificationType.value === 'NIE') {
        expression = /^[XYZ]\d{7,8}[A-Z]$/;
      }
      if (expression.test(str) === true) {
        str = str.replace(/^[X]/, '0').replace(/^[Y]/, '1').replace(/^[Z]/, '2');
        const myNumber = str.substr(0, str.length - 1);
        const letterDni = str.substr(str.length - 1, 1);
        const myNumberConver = Number(myNumber) % 23;
        let letter = 'TRWAGMYFPDXBNJZSQVHLCKET';
        letter = letter.substring(myNumberConver, myNumberConver + 1);
        if (letter !== letterDni.toUpperCase()) {
          numberIdentification.setErrors({wrongLetter: true});
          numberIdentification.markAsTouched({onlySelf: true});
        } else {
          return null;
        }
      } else {
        numberIdentification.setErrors({formatNoValid: true});
        numberIdentification.markAsTouched({onlySelf: true});
      }
    };
  }
}
