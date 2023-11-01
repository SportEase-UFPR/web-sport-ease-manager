import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { InputCheckboxComponent } from './components/inputs/input-checkbox/input-checkbox.component';
import { LabelComponent } from './components/inputs/label/label.component';
import { InputSenhaComponent } from './components/inputs/input-senha/input-senha.component';
import { BtnPurpleComponent } from './components/buttons/btn-purple/btn-purple.component';
import { InputTextComponent } from './components/inputs/input-text/input-text.component';
import { InputEmailComponent } from './components/inputs/input-email/input-email.component';
import { BtnBorderPurpleComponent } from './components/buttons/btn-border-purple/btn-border-purple.component';
import { InputSearchComponent } from './components/inputs/input-search/input-search.component';
import { BtnRedComponent } from './components/buttons/btn-red/btn-red.component';
import { InputTextareaComponent } from './components/inputs/input-textarea/input-textarea.component';
import { InputSelectOptionComponent } from './components/inputs/input-select-option/input-select-option.component';
import { InputNumberComponent } from './components/inputs/input-number/input-number.component';
import { InputTimeComponent } from './components/inputs/input-time/input-time.component';
import { BtnChipComponent } from './components/buttons/btn-chip/btn-chip.component';
import { InputDateComponent } from './components/inputs/input-date/input-date.component';

@NgModule({
  declarations: [
    InputCheckboxComponent,
    LabelComponent,
    InputSenhaComponent,
    BtnPurpleComponent,
    InputTextComponent,
    InputEmailComponent,
    BtnBorderPurpleComponent,
    InputSearchComponent,
    BtnRedComponent,
    InputTextareaComponent,
    InputSelectOptionComponent,
    InputNumberComponent,
    InputTimeComponent,
    BtnChipComponent,
    InputDateComponent
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
    InputSenhaComponent,
    BtnPurpleComponent,
    InputTextComponent,
    InputEmailComponent,
    BtnBorderPurpleComponent,
    InputSearchComponent,
    BtnRedComponent,
    InputTextareaComponent,
    InputSelectOptionComponent,
    InputNumberComponent,
    InputTimeComponent,
    BtnChipComponent,
    InputDateComponent
  ],
  providers: [provideNgxMask()],
})
export class SharedModule {}
