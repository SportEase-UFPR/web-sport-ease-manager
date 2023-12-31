import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPaginationModule } from 'ngx-pagination';

import { AdministradoresComponent } from './administradores.component';
import { SharedModule } from '../shared/shared.module';
import { FormComponent } from './form/form.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { NgxUiLoaderConfig, NgxUiLoaderModule, POSITION, SPINNER } from 'ngx-ui-loader';
import { AtivacaoContaComponent } from './ativacao-conta/ativacao-conta.component';
import { RouterModule } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: "#5d5fef",
  bgsPosition: POSITION.centerCenter,
  bgsSize: 40,
  bgsType: SPINNER.ballSpinClockwise,
  fgsType: SPINNER.ballSpin,
  fgsColor: '#5d5fef',
  blur: 10,
  overlayColor: "rgba(255,255,255,0.5)",
  hasProgressBar: false
};

@NgModule({
  declarations: [
    AdministradoresComponent,
    FormComponent,
    AtivacaoContaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FontAwesomeModule,
    NgxMaskDirective,
    NgxMaskPipe,
    ToastrModule.forRoot(),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxSkeletonLoaderModule
  ],
  providers: [provideNgxMask()],
})
export class AdministradoresModule {}
