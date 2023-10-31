import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComunicacaoClientesComponent } from './comunicacao-clientes.component';
import { NgxEditorModule } from 'ngx-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import {
  NgxUiLoaderConfig,
  NgxUiLoaderModule,
  POSITION,
  SPINNER,
} from 'ngx-ui-loader';

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
  declarations: [ComunicacaoClientesComponent],
  imports: [
    CommonModule,
    NgxEditorModule.forRoot({
      locals: {
        // menu
        bold: 'Negrito',
        italic: 'Itálico',
        underline: 'Sublinhado',
        strike: 'Riscado',
        blockquote: 'Citação',
        bullet_list: 'Lista',
        ordered_list: 'Lista Ordenada',
        heading: 'Títulos',
        h1: 'Título 1',
        h2: 'Título 2',
        h3: 'Título 3',
        h4: 'Título 4',
        h5: 'Título 5',
        h6: 'Título 6',
        align_left: 'Alinhar à esquerda',
        align_center: 'Centralizado',
        align_right: 'Alinhar à direita',
        align_justify: 'Justificado',
        text_color: 'Cor do texto',
        background_color: 'Cor de fundo',
        insertLink: 'Inserir link',
        removeLink: 'Remover Link',

        // pupups, forms, others...
        url: 'URL',
        text: 'Texto',
        openInNewTab: 'Abrir em uma nova guia',
        insert: 'Inserir',
        altText: 'Alt Text',
        title: 'Título',
        remove: 'Remover',
      },
    }),
    ReactiveFormsModule,
    SharedModule,
    ToastrModule.forRoot(),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
  ],
})
export class ComunicacaoClientesModule {}
