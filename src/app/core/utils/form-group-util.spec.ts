import {FormControl, FormGroup, Validators} from '@angular/forms';

import {FormGroupUtil} from './form-group-util';

describe('FormGroupUtil', () => {
  let formGroup: FormGroup;
  const emailKey = 'email';
  const passwordKey = 'password';
  const noValidKey = 'noExist';
  const email = 'email@gmail.com';
  const errorKey = `No existe el valor ${noValidKey} dentro del formGroup`;

  beforeEach(() => {
    formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  });

  it('Comprueba el método setValue con una clave que existe', () => {
    expect(formGroup.get(emailKey).value).toBe('');
    FormGroupUtil.setValue(formGroup, emailKey, email);
    expect(formGroup.get(emailKey).value).toBe(email);
  });

  it('Comprueba el método setValue con una clave que no existe', () => {
    expect(formGroup.get(noValidKey)).toBeNull();
    expect(() => FormGroupUtil.setValue(formGroup, noValidKey, email)).toThrowError(errorKey);
  });

  it('Comprueba el método setValue con un formGroup no válido', () => {
    expect(() => FormGroupUtil.setValue(null, noValidKey, email)).toThrowError(FormGroupUtil.errorFormGroup);
    expect(() => FormGroupUtil.setValue(undefined, noValidKey, email)).toThrowError(FormGroupUtil.errorFormGroup);
  });

  it('Comprueba el método getValue con una clave que existe', () => {
    expect(FormGroupUtil.getValue(formGroup, emailKey)).toBe('');
    FormGroupUtil.setValue(formGroup, emailKey, email);
    expect(FormGroupUtil.getValue(formGroup, emailKey)).toBe(email);
  });

  it('Comprueba el método getValue con una clave que no existe', () => {
    expect(() => FormGroupUtil.getValue(formGroup, noValidKey)).toThrowError(errorKey);
  });

  it('Comprueba el método getValue con un formGroup no válido', () => {
    expect(() => FormGroupUtil.getValue(null, emailKey)).toThrowError(FormGroupUtil.errorFormGroup);
    expect(() => FormGroupUtil.getValue(undefined, emailKey)).toThrowError(FormGroupUtil.errorFormGroup);
  });

  it('Comprueba el método getError con una clave que existe', () => {
    expect(FormGroupUtil.getError(formGroup, emailKey)).toEqual(
      Object({required: true})
    );
    FormGroupUtil.setValue(formGroup, emailKey, emailKey);
    expect(FormGroupUtil.getError(formGroup, emailKey)).not.toBeNull();
    expect(FormGroupUtil.getError(formGroup, emailKey)).toEqual(
      Object({email: true})
    );
    FormGroupUtil.setValue(formGroup, emailKey, email);
    expect(FormGroupUtil.getError(formGroup, emailKey)).toBeNull();
  });

  it('Comprueba el método getError con una clave que no existe', () => {
    expect(() => FormGroupUtil.getError(formGroup, noValidKey)).toThrowError(errorKey);
  });

  it('Comprueba el método getError con un formGroup no válido', () => {
    expect(() => FormGroupUtil.getError(null, passwordKey)).toThrowError(FormGroupUtil.errorFormGroup);
    expect(() => FormGroupUtil.getError(undefined, emailKey)).toThrowError(FormGroupUtil.errorFormGroup);
  });

  it('Comprueba el método checkError con una clave que existe', () => {
    const key = 'email';
    const abstractControl = formGroup.get(key);
    abstractControl.markAllAsTouched();
    expect(FormGroupUtil.checkError(formGroup, key)).toBeTrue();
    abstractControl.markAllAsTouched();
    FormGroupUtil.setValue(formGroup, emailKey, emailKey);
    expect(FormGroupUtil.checkError(formGroup, key)).toBeTrue();
    abstractControl.markAllAsTouched();
    FormGroupUtil.setValue(formGroup, emailKey, email);
    expect(FormGroupUtil.checkError(formGroup, key)).toBeFalse();
  });

  it('Comprueba el método checkError con una clave que no existe', () => {
    expect(() => FormGroupUtil.checkError(formGroup, noValidKey)).toThrowError(errorKey);
  });

  it('Comprueba el método checkError con un formGroup nulo', () => {
    expect(() => FormGroupUtil.checkError(null, passwordKey)).toThrowError(FormGroupUtil.errorFormGroup);
  });

  it('Comprueba el método validFormGroup', () => {
    expect(FormGroupUtil.valid(formGroup)).toBeFalse();
    FormGroupUtil.setValue(formGroup, emailKey, emailKey);
    expect(FormGroupUtil.valid(formGroup)).toBeFalse();
    FormGroupUtil.setValue(formGroup, passwordKey, emailKey);
    expect(FormGroupUtil.valid(formGroup)).toBeFalse();
    FormGroupUtil.setValue(formGroup, emailKey, email);
  });

  it('Comprueba el método validFormGroup con un formGroup inválido', () => {
    expect(() => FormGroupUtil.valid(null)).toThrowError(FormGroupUtil.errorFormGroup);
  });

  it('Comprueba el método changeValidator con una clave que existe', () => {
    expect(FormGroupUtil.getError(formGroup, passwordKey)).toEqual(
      Object({required: true})
    );
    FormGroupUtil.setValue(formGroup, passwordKey, '1');
    expect(FormGroupUtil.getError(formGroup, passwordKey)).toBeNull();
    FormGroupUtil.changeValidator(
      formGroup,
      passwordKey,
      [Validators.minLength(2)],
      '1'
    );
    expect(FormGroupUtil.getError(formGroup, passwordKey)).toEqual(
      Object({minlength: Object({requiredLength: 2, actualLength: 1})})
    );
    FormGroupUtil.setValue(formGroup, passwordKey, '');
    expect(FormGroupUtil.getError(formGroup, passwordKey)).toBeNull();
    FormGroupUtil.changeValidator(formGroup, passwordKey, [
      Validators.required,
      Validators.minLength(7),
    ]);
    expect(FormGroupUtil.getError(formGroup, passwordKey)).toEqual(
      Object({required: true})
    );
  });

  it('Comprueba el método changeValidator con una clave que no existe', () => {
    expect(() => FormGroupUtil.changeValidator(formGroup, noValidKey, [Validators.minLength(2)], '1')).toThrowError(errorKey);
  });

  it('Comprueba el método changeValidator con un formGroup nulo', () => {
    expect(() => FormGroupUtil.changeValidator(null, emailKey, [Validators.minLength(2)], '1'))
      .toThrowError(FormGroupUtil.errorFormGroup);
    expect(() => FormGroupUtil.changeValidator(undefined, passwordKey, [Validators.minLength(2)]))
      .toThrowError(FormGroupUtil.errorFormGroup);
  });

  it('Comprueba el método addFormControl con datos válidos', () => {
    expect(Object.keys(formGroup.controls).length).toBe(2);
    FormGroupUtil.addFormControl(formGroup, 'prueba', new FormControl('', []));
    expect(Object.keys(formGroup.controls).length).toBe(3);
  });

  it('Comprueba el método addFormControl con datos inválidos', () => {
    expect(() => FormGroupUtil.addFormControl(formGroup, 'prueba', null)).toThrowError(FormGroupUtil.errorFormControl);
    expect(() => FormGroupUtil.addFormControl(undefined, 'prueba', new FormControl('')))
      .toThrowError(FormGroupUtil.errorFormGroup);
  });
});
