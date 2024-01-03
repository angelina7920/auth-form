import { AbstractControl, FormArray } from '@angular/forms';
export class Form {
  public static getErrorMessage(
    control: AbstractControl | null,
    validationField: string
  ) {
    if (control && control.errors) {
      const errorKey = Object.keys(control.errors)[0];
      return `ERROR_MESSAGES.${validationField.toUpperCase()}.${errorKey.toUpperCase()}`;
    }
    return '';
  }

  public static isControlInvalid(
    control: AbstractControl | null
  ): boolean | undefined {
    return control
      ? control.invalid && (control.dirty || control.touched)
      : undefined;
  }

  public static getFormArrayControl(
    formArray: FormArray,
    index: number
  ): AbstractControl | null {
    return formArray.at(index);
  }
}
