import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Class to handle the formGroups of the forms
 */
export class FormGroupUtil {
  static errorFormGroup = 'The formGroup does not exist';
  static errorFormControl = 'The formControl does not exist';

  /**
   * Verify that all data in a formGroup is valid.
   * If there are no errors, it returns true.
   * Otherwise, it marks all fields with errors and returns false.
   *
   * @param formGroup FormGroup to verify
   *
   * @returns boolean
   */
  static valid(formGroup: FormGroup): boolean {
    return this.getNumErrors(formGroup) === 0;
  }

  /**
   * Returns the number of errors that a formGroup contains
   *
   * @param formGroup FormGroup to verify
   *
   * @returns Number of errors
   */
  static getNumErrors(formGroup: FormGroup): number {
    let errors = 0;
    if (formGroup) {
      const list = Object.keys(formGroup.controls);
      list.forEach(key => {
        if (this.getError(formGroup, key)) {
          errors++;
          formGroup.get(key).markAllAsTouched();
        }
      });
      return errors;
    } else {
      throw new Error(this.errorFormGroup);
    }
  }

  /**
   * Comprueba si un dato de un formGroup es inválido y
   * ha sido modificado por el persona.
   *
   * @param formGroup FormGroup a comprobar
   * @param key Identificador del dato
   *
   * @returns Si hay errores o no
   */
  static checkError(formGroup: FormGroup, key: string): boolean {
    if (formGroup) {
      const abstractControl: AbstractControl = formGroup.get(key);
      if (abstractControl) {
        return (
          abstractControl.invalid &&
          (abstractControl.dirty || abstractControl.touched)
        );
      }
      throw new Error(this.getErrorKey(key));
    } else {
      throw new Error(this.errorFormGroup);
    }
  }

  /**
   * Returns the errors of a specific data of a formGroup
   *
   * @param formGroup FormGroup to verify
   * @param key Data identifier
   *
   * @returns the errors that the data contains
   */
  static getError(formGroup: FormGroup, key: string): ValidationErrors {
    if (formGroup) {
      const abstractControl = formGroup.get(key);
      if (abstractControl) {
        return abstractControl.errors;
      }
      throw new Error(this.getErrorKey(key));
    } else {
      throw new Error(this.errorFormGroup);
    }
  }

  /**
   * Devuelve el valor de un dato concreto de un formGroup.
   * Si no existe el dato devuelve null
   *
   * @param formGroup FormGroup a comprobar
   * @param key Identificador del dato
   *
   * @returns El dato concreto solicitado
   */
  static getValue(formGroup: FormGroup, key: string): any {
    if (formGroup) {
      const abstractControl: AbstractControl = formGroup.get(key);
      if (abstractControl) {
        return abstractControl.value;
      }
      throw new Error(this.getErrorKey(key));
    } else {
      throw new Error(this.errorFormGroup);
    }
  }

  /**
   * Cambia el valor de un dato concreto de un formGroup
   *
   * @param formGroup FormGroup a comprobar
   * @param key Identificador del dato
   * @param value Nuevo valor
   */
  static setValue(formGroup: FormGroup, key: string, value: any): void {
    if (formGroup) {
      const abstractControl: AbstractControl = formGroup.get(key);
      if (abstractControl) {
        abstractControl.setValue(value);
      } else {
        throw new Error(this.getErrorKey(key));
      }
    } else {
      throw new Error(this.errorFormGroup);
    }
  }

  /**
   * Cambia los validadores a un dato concreto de un formGroup
   *
   * @param formGroup FormGroup a comprobar
   * @param key Identificador del dato
   * @param validator Lista de validadores
   * @param initValue Valor inicial del dato
   */
  static changeValidator(formGroup: FormGroup, key: string, validator: ValidatorFn[], initValue?: any): void {
    if (formGroup) {
      const abstractControl: AbstractControl = formGroup.get(key);
      if (abstractControl) {
        formGroup.setControl(key, new FormControl(initValue, validator));
      } else {
        throw new Error(this.getErrorKey(key));
      }
    } else {
      throw new Error(this.errorFormGroup);
    }
  }

  /**
   * Añade un nuevo dato a un formGroup
   *
   * @param formGroup FormGroup a comprobar
   * @param key Identificador del dato
   * @param formControl Nuevo valor
   */
  static addFormControl(formGroup: FormGroup, key: string, formControl: FormControl): void {
    if (formGroup) {
      if (formControl) {
        formGroup.addControl(key, formControl);
      } else {
        throw new Error(this.errorFormControl);
      }
    } else {
      throw new Error(this.errorFormGroup);
    }
  }

  /**
   * Limpia todos los campos del formGroup
   *
   * @param formGroup Formgroup
   */
  static clean(formGroup: FormGroup): void {
    if (formGroup) {
      const list: string[] = Object.keys(formGroup.controls);
      list.forEach((key: string) => {
        this.setValue(formGroup, key, '');
      });
    } else {
      throw new Error(this.errorFormGroup);
    }
  }

  /**
   * Devuelve el mensaje de error cuando no se encuentra un formControl
   *
   * @param key identificador del formControl
   */
  private static getErrorKey(key: string): string {
    return `No existe el valor ${key} dentro del formGroup`;
  }
}
