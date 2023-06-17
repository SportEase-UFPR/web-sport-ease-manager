import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { InputCheckboxComponent } from './components/inputs-with-label/input-checkbox/input-checkbox.component';
import { LabelComponent } from './components/inputs-with-label/label/label.component';
import { WithoutInputTextComponent } from './components/inputs-without-label/without-input-text/without-input-text.component';
import { WithoutInputNumberComponent } from './components/inputs-without-label/without-input-number/without-input-number.component';
import { WithoutInputEmailComponent } from './components/inputs-without-label/without-input-email/without-input-email.component';
import { InputSenhaComponent } from './components/inputs-with-label/input-senha/input-senha.component';
import { BtnPurpleComponent } from './components/buttons/btn-purple/btn-purple.component';

@NgModule({
  declarations: [
    InputCheckboxComponent,
    LabelComponent,
    WithoutInputTextComponent,
    WithoutInputNumberComponent,
    WithoutInputEmailComponent,
    InputSenhaComponent,
    BtnPurpleComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    FontAwesomeModule,
  ],
  exports: [
    InputCheckboxComponent,
    WithoutInputTextComponent,
    WithoutInputNumberComponent,
    WithoutInputEmailComponent,
    InputSenhaComponent,
    BtnPurpleComponent
  ],
  providers: [provideNgxMask()],
})
export class SharedModule {}
