import { CommonModule } from '@angular/common';
import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, Injector, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, NgControl, ReactiveFormsModule, UntypedFormControl, ValidationErrors } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Options } from '../../interfaces/select.interface';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { startWith } from 'rxjs';
import { GetErrorPipe } from "../../pipes/get-error.pipe";
import { TranslateModule } from '@ngx-translate/core';

@UntilDestroy()
@Component({
    selector: 'app-select',
    standalone: true,
    templateUrl: './select.component.html',
    styleUrl: './select.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectComponent),
            multi: true,
        },
    ],
    imports: [NgSelectModule, ReactiveFormsModule, CommonModule, GetErrorPipe, TranslateModule, FormsModule]
})
export class SelectComponent implements OnInit, AfterContentInit, ControlValueAccessor, DoCheck{
  @Input() label: string;
  @Input() placeholder: string;
  @Input() multiple: boolean;
  @Input() options: Options[];
  @Input() disabled: boolean = false;
  @Input() errorField: string = 'name';

  constructor(private cdr: ChangeDetectorRef, private injector: Injector) {}

  public currentErrors: null | ValidationErrors | undefined = null;

  public ngControl: NgControl;
  public control: UntypedFormControl;
  public touched = false;
  public onChange = (value: any) => {};
  public onTouched = () => {};


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

  public ngDoCheck(): void {
    this.checkTouchedStatus();
  }

  private checkTouchedStatus(): void {
    this.touched = Boolean(this.ngControl?.control?.touched);
    this.cdr.markForCheck();
  }

  public onBlur(): void {
    this.onTouched();
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
