import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbacksComponent } from './feedbacks.component';
import { NgxUiLoaderConfig, NgxUiLoaderModule, POSITION, SPINNER } from 'ngx-ui-loader';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../shared/shared.module';
import { CardComentarioComponent } from './card-comentario/card-comentario.component';
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
    FeedbacksComponent,
    CardComentarioComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxSkeletonLoaderModule
  ]
})
export class FeedbacksModule { }
