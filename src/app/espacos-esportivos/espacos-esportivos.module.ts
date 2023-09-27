import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EspacosEsportivosComponent } from './espacos-esportivos.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EspacosEsportivosRoutingModule } from './espacos-esportivos-routing.module';
import { FormComponent } from './form/form.component';
import { ModalConfirmacaoComponent } from './modal-confirmacao/modal-confirmacao.component';

@NgModule({
  declarations: [
    EspacosEsportivosComponent,
    FormComponent,
    ModalConfirmacaoComponent
  ],
  imports: [
    CommonModule,
    EspacosEsportivosRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FontAwesomeModule
  ]
})
export class EspacosEsportivosModule { }
