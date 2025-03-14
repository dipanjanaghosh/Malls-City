// password-match.validator.ts (Synchronous Validator)
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.parent) {
      console.error(
        'passwordMatchValidator: control parent is not a FormGroup'
      );
      return null;
    }

    const passwordControl = control.parent.get('password');
    const confirmPasswordControl = control.parent.get('confirmPassword');

    if (!passwordControl || !confirmPasswordControl) {
      console.error(
        'passwordMatchValidator: password or confirmPassword control not found'
      );
      return null;
    }

    if (passwordControl.value === confirmPasswordControl.value) {
      console.info('password matched:');
      return null;
    } else {
      console.error('passwordMatchValidator: Passwords do not match');
      return { passwordMismatch: true };
    }
  };
}
