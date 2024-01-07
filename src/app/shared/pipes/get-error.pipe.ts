import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  standalone: true,
  name: 'getError'
})
export class GetErrorPipe implements PipeTransform {

  transform(value: ValidationErrors, field: string): string {
    const keys = Object.keys(value || {});
    const key = keys.length && keys[0];

    return key ? `ERROR_MESSAGES.${field.toUpperCase()}.${key.toUpperCase()}` : ''

  }

}
