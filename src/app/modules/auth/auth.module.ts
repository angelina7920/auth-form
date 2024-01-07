import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegPageComponent } from './pages/reg-page/reg-page.component';
import { RegFormComponent } from './components/reg-form/reg-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteButtonComponent } from '../../shared/components/delete-button/delete-button.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { SelectComponent } from '../../shared/components/select/select.component';

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
    DeleteButtonComponent,
    InputComponent,
    SelectComponent
  ]
})
export class AuthModule { }
