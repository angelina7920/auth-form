import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements ControlValueAccessor {
  @Input() label = 'input';
  @Input() placeholder: string = 'placeholder'
  @Input() isInValid: boolean | undefined= false;
  @Input() errorMessage: string = '';
  val: string = '';
  isFocused: boolean = false;
  onChange: any = () => {};
  onTouch: any = () => {};
  set value(val: string) {
    if (val !== undefined && this.val !== val) {
      this.val = val;
      this.onChange(val);
      this.onTouch(val);
    }
  }
  onFocusOut(){
    this.onTouch();
    this.isFocused = false;
    console.log(this.isFocused)
  }
  onFocus(){
    this.isFocused = true;
    console.log(this.isFocused)
  }
  writeValue(value: string) {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}
