import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EspacoEsportivoResponse as eeResponse } from 'src/app/shared/models/espaco-esportivo/espaco-esportivo-response.model';

@Component({
  selector: 'app-modal-detalhes',
  templateUrl: './modal-detalhes.component.html',
  styleUrls: ['./modal-detalhes.component.scss'],
})
export class ModalDetalhesComponent implements OnInit {
  @Input() ee!: eeResponse;

  faClose = faXmark;

  daysOfweek: string[] = [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ];

  constructor(
    public activeModal: NgbActiveModal,
    private sanatizer: DomSanitizer
  ) {}

  ngOnInit(): void {}

  sanatizerImg(imgUrl: string) {
    return this.sanatizer.bypassSecurityTrustResourceUrl(
      `data:image/jpeg;base64,${imgUrl}`
    );
  }
}
