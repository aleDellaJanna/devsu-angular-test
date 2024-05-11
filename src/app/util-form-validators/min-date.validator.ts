import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const dateValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  return  new Date(control.value) >= new Date() ? null : { dateValidator: true };
};  