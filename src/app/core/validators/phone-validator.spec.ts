import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { PhoneValidator } from './phone-validator';

describe('PhoneValidator', () => {
  let formGroup: FormGroup;
  let phone: AbstractControl;

  beforeEach(() => {
    formGroup = new FormGroup({
      phone: new FormControl('', PhoneValidator.isValid()),
    });
    phone = formGroup.controls.phone;
  });

  it('create an instance', () => {
    expect(formGroup).toBeTruthy();
  });

  it('input a empty value', () => {
    phone.setValue('');
    expect(formGroup.status).toBe('VALID');
  });

  it('input a null value', () => {
    phone.setValue(null);
    expect(formGroup.status).toBe('VALID');
  });

  it('input a undefined value', () => {
    phone.setValue(undefined);
    expect(formGroup.status).toBe('VALID');
  });

  it('input a invalid value', () => {
    phone.setValue('test');
    expect(formGroup.status).toBe('INVALID');
    phone.setValue('185632147');
    expect(formGroup.status).toBe('INVALID');
    phone.setValue('98632147');
    expect(formGroup.status).toBe('INVALID');
  });

  it('input a valid value', () => {
    phone.setValue('985632147');
    expect(formGroup.status).toBe('VALID');
  });
});
