import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { LabelComponent } from './components/inputs/label/label.component';
import { InputSenhaComponent } from './components/inputs/input-senha/input-senha.component';
import { BtnPurpleComponent } from './components/buttons/btn-purple/btn-purple.component';
import { BtnBorderPurpleComponent } from './components/buttons/btn-border-purple/btn-border-purple.component';
import { InputSearchComponent } from './components/inputs/input-search/input-search.component';
import { BtnRedComponent } from './components/buttons/btn-red/btn-red.component';
import { InputTextareaComponent } from './components/inputs/input-textarea/input-textarea.component';
import { InputSelectOptionComponent } from './components/inputs/input-select-option/input-select-option.component';
import { BtnChipComponent } from './components/buttons/btn-chip/btn-chip.component';
import { InputFieldComponent } from './components/inputs/input-field/input-field.component';
import { InputToogleComponent } from './components/inputs/input-toogle/input-toogle.component';
import { PasswordChecklistComponent } from './components/password-checklist/password-checklist.component';
import { InputDateComponent } from './components/inputs/input-date/input-date.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    LabelComponent,
    InputSenhaComponent,
    BtnPurpleComponent,
    BtnBorderPurpleComponent,
    InputSearchComponent,
    BtnRedComponent,
    InputTextareaComponent,
    InputSelectOptionComponent,
    BtnChipComponent,
    InputFieldComponent,
    InputToogleComponent,
    PasswordChecklistComponent,
    InputDateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    FontAwesomeModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [
    InputSenhaComponent,
    BtnPurpleComponent,
    BtnBorderPurpleComponent,
    InputSearchComponent,
    BtnRedComponent,
    InputTextareaComponent,
    InputSelectOptionComponent,
    BtnChipComponent,
    InputFieldComponent,
    InputToogleComponent,
    PasswordChecklistComponent,
    InputDateComponent
  ],
  providers: [provideNgxMask()],
})
export class SharedModule {}
