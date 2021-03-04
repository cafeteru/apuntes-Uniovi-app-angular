import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { NumberIdentificationValidator } from './number-identification-validator';
import { IdentificationType } from '../models/enums/identification-type';

describe('NumberIdentificationValidator', () => {
  let formGroup: FormGroup;
  let identificationType: AbstractControl;
  let numberIdentification: AbstractControl;

  beforeEach(() => {
    formGroup = new FormGroup({
        identificationType: new FormControl(''),
        numberIdentification: new FormControl(''),
      },
      {
        validators: [NumberIdentificationValidator.isValid()]
      }
    );
    identificationType = formGroup.controls.identificationType;
    numberIdentification = formGroup.controls.numberIdentification;
  });

  it('create an instance', () => {
    expect(formGroup).toBeTruthy();
    expect(identificationType).toBeTruthy();
    expect(numberIdentification).toBeTruthy();
  });

  it('valid numberIdentification without identificationType', () => {
    numberIdentification.setValue('89289101L');
    expect(formGroup.status).toBe('INVALID');
    expect(identificationType.errors).not.toBe(null);
    expect(identificationType.errors.required).not.toBe(null);
    expect(numberIdentification.errors).toBe(null);
  });

  it('valid identificationType without numberIdentification', () => {
    identificationType.setValue(IdentificationType.DNI.toString());
    expect(formGroup.status).toBe('VALID');
  });

  it('valid numberIdentification with IdentificationType.DNI', () => {
    identificationType.setValue(IdentificationType.DNI.toString());
    numberIdentification.setValue('89289101L');
    expect(formGroup.status).toBe('VALID');
  });

  it('valid numberIdentification with IdentificationType.NIE', () => {
    identificationType.setValue(IdentificationType.NIE.toString());
    numberIdentification.setValue('X2800723J');
    expect(formGroup.status).toBe('VALID');
  });

  it('numberIdentification with invalid letter and IdentificationType.DNI', () => {
    identificationType.setValue(IdentificationType.DNI.toString());
    numberIdentification.setValue('89289101S');
    expect(formGroup.status).toBe('INVALID');
    expect(numberIdentification.errors).not.toBe(null);
    expect(numberIdentification.errors.wrongLetter).not.toBe(null);
  });

  it('invalid numberIdentification with IdentificationType.DNI', () => {
    identificationType.setValue(IdentificationType.DNI.toString());
    numberIdentification.setValue('8289101L');
    expect(formGroup.status).toBe('INVALID');
    expect(numberIdentification.errors).not.toBe(null);
    expect(numberIdentification.errors.formatNoValid).not.toBe(null);
  });
});
