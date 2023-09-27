import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPaginationModule } from 'ngx-pagination';

import { AdministradoresComponent } from './administradores.component';
import { AdministradoresRoutingModule } from './administradores-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormComponent } from './form/form.component';
import { ModalConfirmacaoComponent } from './modal-confirmacao/modal-confirmacao.component';
import { ModalDetalhesComponent } from './modal-detalhes/modal-detalhes.component';



@NgModule({
  declarations: [
    AdministradoresComponent,
    FormComponent,
    ModalConfirmacaoComponent,
    ModalDetalhesComponent
  ],
  imports: [
    CommonModule,
    AdministradoresRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FontAwesomeModule
  ]
})
export class AdministradoresModule { }
