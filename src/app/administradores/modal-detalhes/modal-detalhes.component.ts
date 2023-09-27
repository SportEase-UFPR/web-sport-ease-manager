import { Component, Input, OnInit } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-detalhes',
  templateUrl: './modal-detalhes.component.html',
  styleUrls: ['./modal-detalhes.component.scss']
})
export class ModalDetalhesComponent implements OnInit {
  @Input() nomeGerente!: string;

  faClose = faXmark;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}

  deletarAdministrador(): void {}
}
