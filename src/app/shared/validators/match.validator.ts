import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function MatchValidator(
  controlName: string,
  matchingControlName: string
) {
  const validator: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    const control = group.get(controlName);
    const matchingControl = group.get(matchingControlName);
    if (control && matchingControl) {
      if (matchingControl.errors && !matchingControl.errors['match']) {
        return null;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ match: true });
        return { matchValidation: true };
      } else {
        matchingControl.setErrors(null);
        return null;
      }
    }
    return null;
  };
  return validator;
}
