import { Component, Input, OnInit } from '@angular/core';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirmacao',
  templateUrl: './modal-confirmacao.component.html',
  styleUrls: ['./modal-confirmacao.component.scss'],
})
export class ModalConfirmacaoComponent implements OnInit {
  @Input() nomeGerente!: string;

  faClose = faXmark;
  faConfirm = faCheck;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}

  deletarAdministrador(): void {}
}
