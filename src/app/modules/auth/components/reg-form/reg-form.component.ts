import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatchValidator } from '../../../../shared/validators/match.validator';
import { Form } from '../../../../shared/classes/form.class';
import { LanguageService } from '../../../../shared/services/language.service';

@Component({
  selector: 'app-reg-form',
  templateUrl: './reg-form.component.html',
  styleUrl: './reg-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private languageService: LanguageService
  ) {}

  public regForm!: FormGroup;
  public languages: string[] = [];

  ngOnInit(): void {
    this.regForm = this.formInit();
    this.languageService
      .getLanguages()
      .subscribe((data) => (this.languages = data));
  }

  private formInit(): FormGroup {
    return this.fb.group(
      {
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(15),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(16),
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/),
          ],
        ],
        confirmPassword: ['', Validators.required],
        phones: new FormArray([this.createPhoneControl()]),
        languages: [[], [Validators.required]],
      },
      {
        validators: MatchValidator('password', 'confirmPassword'),
      }
    );
  }

  public isInValid(controlName: string): boolean | undefined {
    const control = this.regForm.get(controlName);
    return Form.isControlInvalid(control);
  }

  public isInValidPhone(index: number): boolean | undefined {
    const control = Form.getFormArrayControl(this.phones, index);
    return Form.isControlInvalid(control);
  }

  public getNameError(): string {
    return Form.getErrorMessage(this.regForm.get('name'), 'name');
  }

  public getEmailError(): string {
    return Form.getErrorMessage(this.regForm.get('email'), 'email');
  }

  public getPasswordError(): string {
    return Form.getErrorMessage(this.regForm.get('password'), 'password');
  }

  public getConfirmPasswordError(): string {
    return Form.getErrorMessage(
      this.regForm.get('confirmPassword'),
      'confirmPassword'
    );
  }

  public getLanguagesError(): string {
    return Form.getErrorMessage(this.regForm.get('languages'), 'languages');
  }

  public getPhonesError(index: number): string {
    const control = Form.getFormArrayControl(this.phones, index);
    return Form.getErrorMessage(control, 'phones');
  }

  private createPhoneControl(): FormControl {
    return new FormControl('', [
      Validators.required,
      Validators.pattern(/^\+\d+$/),
      Validators.minLength(10),
      Validators.maxLength(15),
    ]);
  }

  public get phones(): FormArray {
    return this.regForm.get('phones') as FormArray;
  }

  public addPhone(): void{
    this.phones.push(this.createPhoneControl())
  }

  public deletePhone(index: number): void{
    this.phones.removeAt(index);
  }

  onSubmit() {
    // if(!this.regForm.valid){
    //   this.regForm.markAllAsTouched()
    // }
  }
}
