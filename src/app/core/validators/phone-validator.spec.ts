import { FormControl, FormGroup } from '@angular/forms';
import { PhoneValidator } from './phone-validator';

describe('PhoneValidator', () => {
  let formGroup: FormGroup;

  beforeEach(() => {
    formGroup = new FormGroup({
      phone: new FormControl('', PhoneValidator.isValid()),
    });
  });

  it('create an instance', () => {
    expect(formGroup).toBeTruthy();
  });

  it('input a empty value', () => {
    formGroup.controls.phone.setValue('');
    expect(formGroup.status).toBe('VALID');
  });

  it('input a null value', () => {
    formGroup.controls.phone.setValue(null);
    expect(formGroup.status).toBe('VALID');
  });

  it('input a undefined value', () => {
    formGroup.controls.phone.setValue(undefined);
    expect(formGroup.status).toBe('VALID');
  });

  it('input a invalid value', () => {
    formGroup.controls.phone.setValue('test');
    expect(formGroup.status).toBe('INVALID');
    formGroup.controls.phone.setValue('185632147');
    expect(formGroup.status).toBe('INVALID');
    formGroup.controls.phone.setValue('98632147');
    expect(formGroup.status).toBe('INVALID');
  });

  it('input a valid value', () => {
    formGroup.controls.phone.setValue('985632147');
    expect(formGroup.status).toBe('VALID');
  });
});
