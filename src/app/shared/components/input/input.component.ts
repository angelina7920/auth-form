import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  Injector,
  Input,
  OnInit,
  TemplateRef,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
  ReactiveFormsModule,
  UntypedFormControl,
  ValidationErrors,
} from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { startWith } from 'rxjs';
import { GetErrorPipe } from '../../pipes/get-error.pipe';
import { TranslateModule } from '@ngx-translate/core';

@UntilDestroy()
@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GetErrorPipe,
    TranslateModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent
  implements OnInit, AfterContentInit, ControlValueAccessor, DoCheck
{
  @Input() suffix: TemplateRef<any> = null;
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() type: string = 'text';
  @Input() errorField: string = 'name';
  @Input() isInVisible = false;
  @Input() label: string = '';

  public ngControl: NgControl;
  public control: UntypedFormControl;
  public onChange = (value: any) => {};
  public onTouched = () => {};

  public touched = false;
  public currentErrors: null | ValidationErrors | undefined = null;

  constructor(private cdr: ChangeDetectorRef, private injector: Injector) {}

  public ngAfterContentInit(): void {
    this.ngControl = this.injector.get(NgControl);
    this.ngControl.control?.statusChanges
      .pipe(startWith(this.ngControl?.control?.status), untilDestroyed(this))
      .subscribe(() => {
        this.currentErrors = this.ngControl?.control?.errors;
        this.cdr.markForCheck();
      });
  }

  public ngOnInit(): void {
    this.control = new UntypedFormControl({
      value: '',
      disabled: this.disabled,
    });
    this.control.markAsTouched = function (): void {};
    this.control.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
      this.onChange(value);
    });
  }

  public onBlur(): void {
    this.onTouched();
  }

  public ngDoCheck(): void {
    this.checkTouchedStatus();
  }

  private checkTouchedStatus(): void {
    this.touched = Boolean(this.ngControl?.control?.touched);
    this.cdr.markForCheck();
  }

  public isInValid(): boolean{
    return  Boolean(this.ngControl?.control?.errors) && this.touched;
  }

  public setDisabledState(isDisabled: boolean) {
    if (isDisabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }

  public writeValue(obj: any): void {
    this.control?.setValue(obj);
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
