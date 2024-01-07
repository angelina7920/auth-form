import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatchValidator } from '../../../../shared/validators/match.validator';
import { LanguageService } from '../../../../shared/services/language.service';
import { Options } from '../../../../shared/interfaces/select.interface';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-reg-form',
  templateUrl: './reg-form.component.html',
  styleUrl: './reg-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private languageService: LanguageService
  ) {}

  public regForm!: FormGroup;
  public languages: Options[] = [];

  public isPasswordInVisible = true;

  togglePasswordVisible(){
    this.isPasswordInVisible = !this.isPasswordInVisible;
  }

  ngOnInit(): void {
    this.regForm = this.formInit();
    this.languageService
      .getLanguages()
      .pipe(untilDestroyed(this))
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

  public addPhone(): void {
    this.phones.push(this.createPhoneControl());
  }

  public deletePhone(index: number): void {
    this.phones.removeAt(index);
  }

  public onSubmit(): void {
    if (!this.regForm.valid) {
      this.regForm.markAllAsTouched();
    } else console.log('sub');
  }

}
