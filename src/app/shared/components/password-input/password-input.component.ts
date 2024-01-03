import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-password-input',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordInputComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class PasswordInputComponent implements ControlValueAccessor{
  public isHide: boolean = true;
  public isFocused: boolean = false;
  public imgUrl: string = 'assets/svg/eye.svg';
  public imgUrlClicked: string = 'assets/svg/eye-closed.svg';
  private val: string = '';

  @Input() label = '';
  @Input() placeholder: string = '';
  @Input() isInValid: boolean | undefined = false;
  @Input() errorMessage: string = '';

  onChange: any = () => {};
  onTouch: any = () => {};
  set value(val: string) {
    if (val !== undefined && this.val !== val) {
      this.val = val;
      this.onChange(val);
      this.onTouch(val);
    }
  }

  public onFocusOut(): void{
    this.onTouch();
    this.isFocused = false;
    console.log(this.isFocused)
  }
  public onFocus(): void{
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
