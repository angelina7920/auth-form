import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegPageComponent } from './pages/reg-page/reg-page.component';
import { RegFormComponent } from './components/reg-form/reg-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from '../../shared/components/select/select.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { PasswordInputComponent } from '../../shared/components/password-input/password-input.component';
import { DeleteButtonComponent } from '../../shared/components/delete-button/delete-button.component';
import { PrimaryButtonComponent } from '../../shared/components/primary-button/primary-button.component';
import { SecondButtonComponent } from '../../shared/components/second-button/second-button.component';


@NgModule({
  declarations: [
    RegPageComponent,
    RegFormComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    TranslateModule.forChild(),
    ReactiveFormsModule,
    SelectComponent,
    InputComponent,
    PasswordInputComponent,
    DeleteButtonComponent,
    PrimaryButtonComponent,
    SecondButtonComponent
  ]
})
export class AuthModule { }
