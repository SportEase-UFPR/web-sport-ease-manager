import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import {
  NgxUiLoaderConfig,
  POSITION,
  SPINNER,
  NgxUiLoaderModule,
} from 'ngx-ui-loader';
import { SharedModule } from '../shared/shared.module';
import { ClientesComponent } from './clientes.component';
import { CardClienteComponent } from './card-cliente/card-cliente.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgxMaskPipe } from 'ngx-mask';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: '#5d5fef',
  bgsPosition: POSITION.centerCenter,
  bgsSize: 40,
  bgsType: SPINNER.ballSpinClockwise,
  fgsType: SPINNER.ballSpin,
  fgsColor: '#5d5fef',
  blur: 10,
  overlayColor: 'rgba(255,255,255,0.5)',
  hasProgressBar: false,
};

@NgModule({
  declarations: [ClientesComponent, CardClienteComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    ToastrModule.forRoot(),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxSkeletonLoaderModule,
    NgxMaskPipe,
  ],
})
export class ClientesModule {}
