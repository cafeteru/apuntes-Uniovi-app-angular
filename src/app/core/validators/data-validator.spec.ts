import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { DateValidator } from './date-validator';

describe('DateValidator', () => {
  let formGroup: FormGroup;
  let birthDate: AbstractControl;

  beforeEach(() => {
    formGroup = new FormGroup({
      birthDate: new FormControl(undefined, DateValidator.maxDate(new Date())),
    });
    birthDate = formGroup.controls.birthDate;
  });

  it('create an instance', () => {
    expect(formGroup).toBeTruthy();
    expect(birthDate).toBeTruthy();
  });

  it('input a empty date', () => {
    birthDate.setValue('');
    expect(formGroup.status).toBe('VALID');
  });

  it('input a null date', () => {
    birthDate.setValue(null);
    expect(formGroup.status).toBe('VALID');
  });

  it('input a undefined date', () => {
    birthDate.setValue(undefined);
    expect(formGroup.status).toBe('VALID');
  });

  it('input a valid date, today', () => {
    birthDate.setValue(new Date());
    expect(formGroup.status).toBe('VALID');
  });

  it('input a valid date, tomorrow', () => {
    const dayMilliseconds = 1000 * 60 * 60 * 24;
    const date = new Date(new Date().getTime() + dayMilliseconds);
    birthDate.setValue(date);
    expect(formGroup.status).toBe('INVALID');
  });
});
