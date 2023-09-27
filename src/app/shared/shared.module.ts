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
  ],
  providers: [provideNgxMask()],
})
export class SharedModule {}
