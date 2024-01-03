import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent implements OnInit, ControlValueAccessor{
  @Input() options: string[] = [];
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() isInValid: boolean | undefined = false;
  @Input() errorMessage: string = '';

  public IsOpen: boolean = false;
  public isChecked: boolean[] = [];
  public selectedOptions: string[] = [];
  onChange: any = () => {};
  onTouch: any = () => {};

  ngOnInit() {
    this.isChecked = new Array(this.options.length).fill(false);
  }

  public toggleCheckbox(index: number): void {
    this.isChecked[index] = !this.isChecked[index];
    this.updateSelectedOptions();
    this.onChange(this.selectedOptions);
    this.onTouch();
  }

  public toggleSelect(): void {
    this.IsOpen = !this.IsOpen;
    if (!this.IsOpen) {
      this.onTouch();
    }
  }

  private updateSelectedOptions(): void {
    this.selectedOptions = this.options.filter(
      (option, index) => this.isChecked[index]
    );
  }

  public hasCheckedItems(): boolean {
    return this.selectedOptions.length > 0;
  }

  public getDisplayText(): string {
    const displayOptions = this.selectedOptions.join(', ');
    return displayOptions.length <= 25
      ? displayOptions
      : displayOptions.slice(0, 25) + '...';
  }

  writeValue(value: any): void {
    if (value && Array.isArray(value)) {
      this.selectedOptions = value;
      this.isChecked = this.options.map((option) =>
        this.selectedOptions.includes(option)
      );
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}
