// password-match.validator.ts
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';

export function passwordMatchValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> => {
    return new Promise((resolve) => {
      // Simulate an asynchronous check (e.g., API call)
      if (!control.parent) {
        return resolve(null); // Return null if there's no parent (not in a FormGroup)
      }

      const passwordControl = control.parent.get('password');
      const confirmPasswordControl = control.parent.get('confirmPassword');

      if (!passwordControl || !confirmPasswordControl) {
        return resolve(null); // Return null if either control is not found
      }

      if (passwordControl.value === confirmPasswordControl.value) {
        return resolve(null); // Passwords match, return null (no error)
      } else {
        return resolve({ passwordMismatch: true }); // Passwords don't match, return error object
      }
    });
  };
}
